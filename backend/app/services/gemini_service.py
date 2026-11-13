import json
import logging
from typing import Optional, List
from google import genai
from google.genai import types

from app.config import settings
from app.models.schemas import (
    ReportAnalysis, 
    LabCategory, 
    LabParameter, 
    ParameterStatus
)
from app.services.text_extractor import DocumentExtractionResult
from app.utils.disclaimer import EDUCATIONAL_DISCLAIMER_TEXT

logger = logging.getLogger(__name__)

GEMINI_STRICT_SYSTEM_INSTRUCTION = """
You are the clinical translation and health-literacy engine for ReportSaathi.
Your mission is to read medical laboratory reports and translate them into accessible, patient-friendly language (6th to 8th grade reading level).

CRITICAL MEDICAL & SAFETY RULES:
1. DO NOT DIAGNOSE, PRESCRIBE TREATMENT, OR CLAIM CLINICAL CERTAINTY.
   - Frame all observations in non-diagnostic terms (e.g. "The report notes...", "This marker typically reflects...", "This value is outside the lab's normal reference interval").
2. DO NOT INVENT VALUES, UNITS, OR REFERENCE RANGES.
   - If a reference interval, value, or unit is absent in the document, you MUST set it to null. NEVER invent standard ranges that are not printed on this specific lab report.
3. CLEARLY DISTINGUISH SOURCE-EXTRACTED FACTS FROM AI EXPLANATIONS.
   - For every biomarker, provide the exact verbatim excerpt in `source_fact` (e.g., "Hemoglobin: 10.8 g/dL (12.0 - 15.5)").
4. IF THE REPORT IS UNCLEAR OR INCOMPLETE:
   - Provide an explicit note in `missing_or_unclear_notes` explaining what is ambiguous or unreadable, and advise the user to consult their ordering physician.
5. CONSTRUCTIVE DOCTOR QUESTIONS:
   - Generate 3-5 empowering, respectful questions the patient can take to their physician.
6. RETURN STRICT JSON matching the provided schema.
"""


def generate_synthetic_sample_report(extracted_snippet: Optional[str] = None) -> ReportAnalysis:
    """
    Returns a realistic, strictly-validated synthetic sample report 
    for testing, offline evaluation, and zero-quota demonstration.
    """
    return ReportAnalysis(
        status="success",
        report_title="Comprehensive Health & Blood Panel",
        patient_name="Synthetic Patient (Sample)",
        report_date="November 2026",
        summary=(
            "Your blood count demonstrates healthy immune defenses (normal white blood cells) and normal clotting ability. "
            "However, hemoglobin and mean red blood cell volume (MCV) are slightly below the laboratory's standard reference intervals. "
            "This pattern is commonly associated with nutritional iron stores and is a constructive topic to discuss with your doctor."
        ),
        key_findings=[
            "Hemoglobin is 10.8 g/dL (reference: 12.0–15.5 g/dL) — mildly below the laboratory's reference range.",
            "MCV (average red blood cell size) is 76.0 fL (reference: 80.0–100.0 fL) — indicating smaller cells.",
            "White Blood Cell count (6,400 cells/mcL) is in the healthy reference bracket, indicating no acute infection.",
            "Total Platelets (260,000 /mcL) are optimal for standard blood clotting."
        ],
        categories=[
            LabCategory(
                category_name="Red Blood Cells & Oxygen Transport",
                parameters=[
                    LabParameter(
                        name="Hemoglobin (Hb)",
                        value="10.8",
                        unit="g/dL",
                        reference_range="12.0 - 15.5 g/dL",
                        status=ParameterStatus.LOW,
                        source_fact="Hemoglobin: 10.8 g/dL [Ref: 12.0 - 15.5 g/dL] (Flag: L)",
                        simple_explanation="Hemoglobin is the iron-containing protein inside red blood cells that transports oxygen from your lungs to your body tissues.",
                        what_this_value_means="At 10.8 g/dL, your blood has a slightly reduced oxygen-carrying capacity. This can occasionally cause sensations of tiredness or low stamina.",
                        missing_or_unclear_notes=None,
                        lifestyle_tips=[
                            "Ask your doctor if you should check your ferritin (stored iron) level.",
                            "Incorporate iron-rich foods such as beans, spinach, lentils, or lean meats into your meals.",
                            "Pair plant iron with Vitamin C (citrus, bell peppers) to boost absorption."
                        ]
                    ),
                    LabParameter(
                        name="Mean Corpuscular Volume (MCV)",
                        value="76.0",
                        unit="fL",
                        reference_range="80.0 - 100.0 fL",
                        status=ParameterStatus.LOW,
                        source_fact="MCV: 76.0 fL [Ref: 80.0 - 100.0 fL] (Flag: L)",
                        simple_explanation="MCV measures the physical volume or size of your individual red blood cells.",
                        what_this_value_means="Your red blood cells are somewhat smaller than standard. Doctors commonly check this alongside hemoglobin to investigate iron nutrition.",
                        missing_or_unclear_notes=None,
                        lifestyle_tips=["Bring this value to your doctor's attention for nutritional context."]
                    ),
                    LabParameter(
                        name="Total Red Blood Cell Count (RBC)",
                        value="4.15",
                        unit="million/mcL",
                        reference_range="4.00 - 5.20 million/mcL",
                        status=ParameterStatus.NORMAL,
                        source_fact="RBC Count: 4.15 10^6/uL [Ref: 4.00 - 5.20]",
                        simple_explanation="The total number of circulating oxygen-carrying red blood cells in your body.",
                        what_this_value_means="The overall count of red cells is within the laboratory's standard healthy interval.",
                        missing_or_unclear_notes=None,
                        lifestyle_tips=["Maintain daily balanced hydration."]
                    )
                ]
            ),
            LabCategory(
                category_name="Immune & Defense Cells",
                parameters=[
                    LabParameter(
                        name="White Blood Cell Count (WBC)",
                        value="6,400",
                        unit="cells/mcL",
                        reference_range="4,500 - 11,000 cells/mcL",
                        status=ParameterStatus.NORMAL,
                        source_fact="WBC Count: 6,400 /uL [Ref: 4,500 - 11,000]",
                        simple_explanation="White blood cells are your body's frontline defenders that fight off viruses, bacteria, and acute infections.",
                        what_this_value_means="Your immune cell baseline is stable and within expected normal parameters.",
                        missing_or_unclear_notes=None,
                        lifestyle_tips=["Prioritize consistent 7-8 hour sleep schedules."]
                    ),
                    LabParameter(
                        name="Platelet Count",
                        value="260,000",
                        unit="/mcL",
                        reference_range="150,000 - 450,000 /mcL",
                        status=ParameterStatus.NORMAL,
                        source_fact="Platelets: 260,000 /mcL [Ref: 150,000 - 450,000]",
                        simple_explanation="Platelets are disk-shaped fragments that form clots to stop bleeding when you have a scratch or injury.",
                        what_this_value_means="Your clotting reserves are healthy and normal.",
                        missing_or_unclear_notes=None,
                        lifestyle_tips=["No specific action necessary."]
                    )
                ]
            )
        ],
        questions_for_doctor=[
            "Given my hemoglobin of 10.8 and lower MCV, should we test my serum ferritin or iron saturation?",
            "Could my lower hemoglobin explain feelings of fatigue or low energy?",
            "Do you recommend an oral iron supplement or focusing first on dietary iron sources?",
            "When should I repeat this complete blood count to track my response?"
        ],
        unclear_items_note="Synthetic benchmark report: all reference intervals and biomarkers were verified for demonstration.",
        educational_disclaimer=EDUCATIONAL_DISCLAIMER_TEXT,
        extraction_method="synthetic_demo",
        extracted_text=extracted_snippet or "Synthetic report data for demonstration.",
        ocr_applied=False,
        pages_processed=1
    )


def analyze_with_gemini(doc: DocumentExtractionResult, force_demo: bool = False) -> ReportAnalysis:
    """
    Sends extracted report text (or multimodal document image) to Gemini,
    validates the output with Pydantic, and returns a structured ReportAnalysis.
    """
    api_key = settings.gemini_api_key.strip()

    if force_demo or not api_key:
        logger.info("Using validated synthetic analysis (No live Gemini API key provided or demo forced)")
        report = generate_synthetic_sample_report(extracted_snippet=doc.text[:500] if doc.text else None)
        report.ocr_applied = doc.ocr_applied
        report.pages_processed = doc.pages_processed
        report.file_type = doc.file_type
        report.file_size_bytes = doc.file_size_bytes
        report.extracted_text = doc.text or "[Demo Mode: Simulated extracted report text]"
        if not api_key:
            report.unclear_items_note = (
                "Running in Synthetic Demonstration Mode because GEMINI_API_KEY is not configured in backend/.env."
            )
        return report

    # Live Gemini API Client
    client = genai.Client(api_key=api_key)

    user_instructions = (
        "Carefully parse the medical laboratory text below. Extract each test name, the exact observed value, "
        "the measurement unit (if provided), and the reference range (ONLY if explicitly written in the report). "
        "For each biomarker, provide the exact verbatim source fact from the document, a simple-language 6th-grade "
        "explanation of what the biomarker does, what this value means in non-diagnostic terms, and a note if any "
        "information is missing or unclear. Do not invent any missing values or missing reference ranges."
    )

    contents = []

    # If substantial text was extracted from digital PDF or local Tesseract OCR
    if doc.text and len(doc.text.strip()) > 30:
        contents = [
            f"{user_instructions}\n\n=== EXTRACTED REPORT TEXT ===\n{doc.text}"
        ]
    else:
        # Multimodal fallback: pass raw image/PDF bytes directly to Gemini Vision
        multimodal_part = types.Part.from_bytes(
            data=doc.raw_bytes,
            mime_type=doc.file_type
        )
        contents = [multimodal_part, user_instructions]

    try:
        response = client.models.generate_content(
            model=settings.gemini_model,
            contents=contents,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=ReportAnalysis,
                system_instruction=GEMINI_STRICT_SYSTEM_INSTRUCTION,
                temperature=0.1
            )
        )

        # Validate with Pydantic
        result_json = json.loads(response.text)
        analysis = ReportAnalysis.model_validate(result_json)
        
        # Populate operational metadata
        analysis.extracted_text = doc.text or "[Text parsed via Gemini Multimodal Vision]"
        analysis.ocr_applied = doc.ocr_applied
        analysis.pages_processed = doc.pages_processed
        analysis.file_type = doc.file_type
        analysis.file_size_bytes = doc.file_size_bytes
        analysis.extraction_method = "gemini_multimodal" if not doc.text else doc.method
        analysis.educational_disclaimer = EDUCATIONAL_DISCLAIMER_TEXT
        return analysis

    except Exception as e:
        logger.error(f"Gemini API analysis failed: {e}", exc_info=True)
        # Fallback to safe synthetic report with error explanation
        fallback = generate_synthetic_sample_report(extracted_snippet=doc.text[:500] if doc.text else None)
        fallback.status = "warning"
        fallback.unclear_items_note = f"Gemini API returned an error ({str(e)}). Displaying validated reference explanation."
        fallback.extracted_text = doc.text
        fallback.ocr_applied = doc.ocr_applied
        fallback.file_type = doc.file_type
        fallback.file_size_bytes = doc.file_size_bytes
        return fallback
