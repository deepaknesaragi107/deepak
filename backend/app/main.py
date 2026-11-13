import logging
from fastapi import FastAPI, UploadFile, File, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import settings
from app.models.schemas import ReportAnalysis, HealthResponse
from app.services.text_extractor import (
    extract_document_content, 
    check_tesseract_availability,
    ExtractionError,
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE_BYTES
)
from app.services.gemini_service import (
    analyze_with_gemini, 
    generate_synthetic_sample_report
)
from app.utils.disclaimer import EDUCATIONAL_DISCLAIMER_TEXT

logger = logging.getLogger("reportsaathi")
logging.basicConfig(level=logging.INFO)

app = FastAPI(
    title="ReportSaathi API",
    description="Educational Medical Laboratory Report Explainer API powered by FastAPI, Tesseract OCR, and Gemini",
    version="1.1.0"
)

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "name": "ReportSaathi API",
        "version": "1.1.0",
        "status": "online",
        "disclaimer": EDUCATIONAL_DISCLAIMER_TEXT,
        "docs_url": "/docs"
    }


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health-check endpoint detailing backend services and OCR/AI configuration."""
    tesseract_path = check_tesseract_availability()
    return HealthResponse(
        status="healthy",
        gemini_configured=bool(settings.gemini_api_key.strip()),
        model=settings.gemini_model,
        tesseract_available=bool(tesseract_path),
        allowed_formats=list(ALLOWED_EXTENSIONS),
        max_file_size_mb=int(MAX_FILE_SIZE_BYTES / (1024 * 1024))
    )


@app.post(
    "/api/reports/analyze", 
    response_model=ReportAnalysis,
    summary="Analyze Medical Lab Report",
    description="Accepts a PDF, JPG, or PNG upload, extracts text (via PDF parser or Tesseract OCR), and returns a structured AI explanation."
)
async def analyze_medical_report(
    file: UploadFile = File(..., description="Laboratory report file (PDF, JPG, or PNG under 10MB)"),
    demo: bool = Query(default=False, description="Force synthetic sample analysis without consuming Gemini API quota")
):
    # Validate filename presence
    filename = file.filename or "uploaded_report.pdf"

    # Read uploaded file bytes
    try:
        file_bytes = await file.read()
    except Exception as e:
        logger.error(f"Failed to read uploaded file: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read uploaded file stream. Please try again."
        )

    # 1. Document Extraction & Safe File Handling
    try:
        extracted_doc = extract_document_content(
            file_bytes=file_bytes,
            filename=filename,
            content_type=file.content_type
        )
    except ExtractionError as ext_err:
        logger.warning(f"File extraction rejected: {ext_err.message}")
        raise HTTPException(status_code=ext_err.status_code, detail=ext_err.message)
    except Exception as unexpected:
        logger.error(f"Unexpected extraction failure: {unexpected}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An internal error occurred while parsing the document: {str(unexpected)}"
        )

    # 2. Check for empty OCR output or unreadable document
    has_text = bool(extracted_doc.text and len(extracted_doc.text.strip()) > 10)
    has_gemini = bool(settings.gemini_api_key.strip())

    if not has_text and not has_gemini and not demo:
        # If neither OCR yielded text nor is Gemini Vision available
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=(
                "No readable text could be extracted from the document. The image may be too blurry, "
                "or OCR is unavailable. Please ensure the document is clear and legible."
            )
        )

    # 3. Analyze with Gemini (or validated synthetic engine)
    try:
        analysis_result = analyze_with_gemini(extracted_doc, force_demo=demo)
        return analysis_result
    except Exception as gemini_err:
        logger.error(f"Analysis engine failure: {gemini_err}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze report: {str(gemini_err)}"
        )


# Compatibility aliases for v1 routes
@app.post("/api/v1/analyze", response_model=ReportAnalysis, include_in_schema=False)
async def analyze_document_v1_alias(file: UploadFile = File(...), demo: bool = Query(default=False)):
    return await analyze_medical_report(file=file, demo=demo)


@app.get("/api/v1/sample-report", response_model=ReportAnalysis, include_in_schema=False)
async def get_sample_report_alias():
    return generate_synthetic_sample_report()
