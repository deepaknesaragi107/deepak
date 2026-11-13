from enum import Enum
from typing import List, Optional
from pydantic import BaseModel, Field


class ParameterStatus(str, Enum):
    NORMAL = "normal"
    HIGH = "high"
    LOW = "low"
    BORDERLINE = "borderline"
    UNCLEAR = "unclear"


class LabParameter(BaseModel):
    name: str = Field(description="Name of the test or biomarker as reported (e.g. Hemoglobin, Total Cholesterol)")
    value: str = Field(description="The exact observed result value extracted from the report")
    unit: Optional[str] = Field(
        default=None, 
        description="Measurement unit extracted from report (e.g. g/dL, mg/dL). None if not specified in report."
    )
    reference_range: Optional[str] = Field(
        default=None, 
        description="Reference interval ONLY if explicitly present in the report. NEVER invent reference ranges."
    )
    status: ParameterStatus = Field(
        default=ParameterStatus.UNCLEAR,
        description="Classification based strictly on provided reference interval"
    )
    source_fact: str = Field(
        description="Exact verbatim excerpt from the document establishing this measurement to distinguish source facts from AI interpretation"
    )
    simple_explanation: str = Field(
        description="What this biomarker does in the body, translated into compassionate 6th-grade language"
    )
    what_this_value_means: str = Field(
        description="Non-diagnostic plain language context on this result without claiming clinical certainty"
    )
    missing_or_unclear_notes: Optional[str] = Field(
        default=None,
        description="Explicit note if value, unit, or range is blurry, ambiguous, or omitted in the source document"
    )
    lifestyle_tips: Optional[List[str]] = Field(
        default=None, 
        description="General, harmless non-prescription wellness habits to discuss with a doctor"
    )


class LabCategory(BaseModel):
    category_name: str = Field(description="Panel/system grouping, e.g. Complete Blood Count, Lipid Profile, Liver Panel")
    parameters: List[LabParameter] = Field(default_factory=list, description="Biomarkers belonging to this panel")


class ReportAnalysis(BaseModel):
    status: str = Field(default="success", description="Processing status: success, partial, or warning")
    report_title: str = Field(description="Identified title of the lab report")
    patient_name: Optional[str] = Field(default=None, description="Patient name or identifier if present")
    report_date: Optional[str] = Field(default=None, description="Date of the report if visible")
    summary: str = Field(description="A reassuring 2-3 sentence overview of the test results in simple language")
    key_findings: List[str] = Field(description="Key bullet points summarizing the most notable values")
    categories: List[LabCategory] = Field(description="Categorized lab panels with detailed breakdown")
    questions_for_doctor: List[str] = Field(
        description="Empowering, constructive questions the patient can ask their physician during follow-up"
    )
    unclear_items_note: Optional[str] = Field(
        default=None,
        description="Summary note if any parts of the document were smudged, unreadable, or missing vital reference intervals"
    )
    educational_disclaimer: str = Field(description="Mandatory educational and non-diagnostic disclaimer")
    extraction_method: str = Field(
        default="pdf_text_extraction", 
        description="Method used: native_pdf, tesseract_ocr, gemini_multimodal, or synthetic_demo"
    )
    extracted_text: Optional[str] = Field(default=None, description="Raw text extracted from the document")
    ocr_applied: bool = Field(default=False, description="Whether optical character recognition was applied")
    file_type: Optional[str] = Field(default=None, description="MIME type or file format processed")
    file_size_bytes: Optional[int] = Field(default=None, description="Size of uploaded file in bytes")
    pages_processed: int = Field(default=1, description="Number of document pages processed")


class HealthResponse(BaseModel):
    status: str
    gemini_configured: bool
    model: str
    tesseract_available: bool
    allowed_formats: List[str]
    max_file_size_mb: int
