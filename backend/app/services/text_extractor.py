import os
import shutil
import tempfile
import logging
from typing import Optional, Tuple
from dataclasses import dataclass

import pypdf
import pdfplumber
import pypdfium2 as pdfium
from PIL import Image
import pytesseract

from app.config import settings

logger = logging.getLogger(__name__)

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS = {".pdf", ".jpg", ".jpeg", ".png"}
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
    "application/octet-stream"  # sometimes browsers send this for binary files
}


class ExtractionError(Exception):
    """Custom exception with user-facing message and appropriate status code."""
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.message = message
        self.status_code = status_code


@dataclass
class DocumentExtractionResult:
    text: str
    ocr_applied: bool
    is_scanned: bool
    pages_processed: int
    file_type: str
    file_size_bytes: int
    raw_bytes: bytes
    method: str


def check_tesseract_availability() -> Optional[str]:
    """Check if Tesseract OCR executable is available in PATH or custom config."""
    if settings.tesseract_cmd and os.path.exists(settings.tesseract_cmd):
        pytesseract.pytesseract.tesseract_cmd = settings.tesseract_cmd
        return settings.tesseract_cmd
    found = shutil.which("tesseract")
    if found:
        pytesseract.pytesseract.tesseract_cmd = found
        return found
    return None


def validate_file_metadata(filename: str, content_type: Optional[str], size_bytes: int) -> str:
    """Validates filename extension, MIME type, and size. Returns normalized extension."""
    if size_bytes == 0:
        raise ExtractionError("Uploaded file is empty (0 bytes). Please upload a valid document.", status_code=400)

    if size_bytes > MAX_FILE_SIZE_BYTES:
        mb = round(size_bytes / (1024 * 1024), 2)
        raise ExtractionError(
            f"File size ({mb}MB) exceeds the maximum allowed limit of 10MB.", 
            status_code=413
        )

    ext = os.path.splitext(filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise ExtractionError(
            f"Unsupported file format '{ext}'. Only PDF documents and image files (.jpg, .jpeg, .png) are supported.",
            status_code=415
        )

    return ext


def extract_text_from_pdf_stream(pdf_path: str) -> Tuple[str, int]:
    """Extract text from digital PDF using pdfplumber with pypdf fallback."""
    pages_text = []
    total_pages = 0

    try:
        with pdfplumber.open(pdf_path) as pdf:
            total_pages = len(pdf.pages)
            for idx, page in enumerate(pdf.pages):
                txt = page.extract_text() or ""
                tables = page.extract_tables()
                table_lines = []
                if tables:
                    for tbl in tables:
                        for row in tbl:
                            cleaned_cells = [str(c).strip() if c is not None else "" for c in row]
                            table_lines.append(" | ".join(cleaned_cells))

                page_block = f"--- Page {idx + 1} ---\n{txt}"
                if table_lines:
                    page_block += "\n[Tables Extracted]\n" + "\n".join(table_lines)
                pages_text.append(page_block)

    except Exception as e:
        logger.warning(f"pdfplumber extraction failed on {pdf_path}, attempting pypdf: {e}")
        try:
            reader = pypdf.PdfReader(pdf_path)
            total_pages = len(reader.pages)
            for idx, page in enumerate(reader.pages):
                txt = page.extract_text() or ""
                pages_text.append(f"--- Page {idx + 1} ---\n{txt}")
        except Exception as pypdf_e:
            raise ExtractionError(
                f"The PDF file appears to be corrupted or password-protected and could not be read: {str(pypdf_e)}",
                status_code=422
            )

    combined_text = "\n\n".join(pages_text).strip()
    return combined_text, total_pages


def run_ocr_on_images(image_paths: list[str]) -> str:
    """Runs Tesseract OCR on a list of image file paths."""
    tesseract_bin = check_tesseract_availability()
    if not tesseract_bin:
        logger.warning("Tesseract binary is not installed or not in PATH.")
        return ""

    ocr_outputs = []
    for idx, img_path in enumerate(image_paths):
        try:
            with Image.open(img_path) as img:
                text = pytesseract.image_to_string(img)
                if text.strip():
                    ocr_outputs.append(f"--- OCR Page {idx + 1} ---\n{text.strip()}")
        except Exception as ocr_err:
            logger.error(f"Error performing OCR on image {img_path}: {ocr_err}")

    return "\n\n".join(ocr_outputs).strip()


def extract_document_content(file_bytes: bytes, filename: str, content_type: Optional[str] = None) -> DocumentExtractionResult:
    """
    Main extraction orchestrator:
    - Validates file type and size
    - Uses safe temporary file handling with guaranteed cleanup
    - Extracts digital PDF text
    - Applies Tesseract OCR to images or scanned PDFs when necessary
    """
    size_bytes = len(file_bytes)
    ext = validate_file_metadata(filename, content_type, size_bytes)

    # Safe temporary file creation
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as temp_file:
        temp_file.write(file_bytes)
        temp_path = temp_file.name

    temp_image_paths = []

    try:
        if ext == ".pdf":
            extracted_text, total_pages = extract_text_from_pdf_stream(temp_path)
            
            # Check if PDF text is very low (< 40 characters for entire doc = scanned PDF)
            is_scanned = len(extracted_text.strip()) < 40
            ocr_applied = False

            if is_scanned:
                logger.info(f"PDF {filename} contains negligible digital text ({len(extracted_text)} chars). Rendering pages for OCR...")
                # Render pages to temporary images with pypdfium2
                try:
                    pdf = pdfium.PdfDocument(temp_path)
                    for page_idx in range(len(pdf)):
                        page = pdf[page_idx]
                        image = page.render(scale=2.0).to_pil()
                        img_temp = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
                        image.save(img_temp.name)
                        img_temp.close()
                        temp_image_paths.append(img_temp.name)

                    ocr_text = run_ocr_on_images(temp_image_paths)
                    if ocr_text:
                        extracted_text = ocr_text
                        ocr_applied = True
                except Exception as render_err:
                    logger.warning(f"Failed to render scanned PDF for OCR: {render_err}")

            return DocumentExtractionResult(
                text=extracted_text,
                ocr_applied=ocr_applied,
                is_scanned=is_scanned,
                pages_processed=total_pages or 1,
                file_type="application/pdf",
                file_size_bytes=size_bytes,
                raw_bytes=file_bytes,
                method="tesseract_ocr" if ocr_applied else ("native_pdf" if not is_scanned else "scanned_pdf")
            )

        else:
            # Image file (.png, .jpg, .jpeg)
            ocr_text = run_ocr_on_images([temp_path])
            ocr_applied = bool(ocr_text)

            return DocumentExtractionResult(
                text=ocr_text,
                ocr_applied=ocr_applied,
                is_scanned=True,
                pages_processed=1,
                file_type=content_type or f"image/{ext.replace('.', '')}",
                file_size_bytes=size_bytes,
                raw_bytes=file_bytes,
                method="tesseract_ocr" if ocr_applied else "image_upload"
            )

    finally:
        # Safe cleanup of main temp file
        if os.path.exists(temp_path):
            try:
                os.remove(temp_path)
            except Exception as e:
                logger.warning(f"Could not remove temp file {temp_path}: {e}")

        # Safe cleanup of any rendered page images
        for p in temp_image_paths:
            if os.path.exists(p):
                try:
                    os.remove(p)
                except Exception as e:
                    logger.warning(f"Could not remove temp image {p}: {e}")
