# ReportSaathi Backend API
> **FastAPI + Tesseract OCR + Google Gemini Medical Lab Report Explainer**

---

## 🚀 Features

- **Document Extraction (`POST /api/reports/analyze`)**:
  - Accepts `.pdf`, `.jpg`, `.jpeg`, and `.png` (up to 10MB).
  - Safe temporary file management with guaranteed cleanup.
  - Multi-page digital PDF parsing using `pdfplumber` & `pypdf`.
  - Scanned PDF detection, rendering to images with `pypdfium2`, and OCR using `pytesseract`.
  - Automatic fallback to Gemini Multimodal Vision when local Tesseract binary is not present.
- **Strict Clinical Safety & Gemini AI Integration**:
  - Enforces non-diagnostic language (no diagnosis, prescribing, or clinical certainty).
  - **Never invents missing values, units, or reference ranges** (omitted ranges are set to `null`).
  - **Clearly distinguishes source-extracted facts from AI explanations** (`source_fact` excerpt vs `simple_explanation`).
  - Flags smudged, ambiguous, or incomplete items in `missing_or_unclear_notes`.
  - Generates patient-empowering questions for doctor consultations.
  - `GEMINI_API_KEY` is loaded exclusively from server-side environment variables and is never exposed to the client.
- **Health Check (`GET /health`)**:
  - Reports service status, Gemini AI configuration, Tesseract availability, allowed formats, and max file limits.

---

## 🛠️ Setup & Installation

### 1. Create and Activate Virtual Environment
```powershell
cd d:\me\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```powershell
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
# Gemini API Configuration (Server-Side Only)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# CORS Allowed Origins
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173

# Optional: Path to local Tesseract OCR if installed
TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
```
*Note: If `GEMINI_API_KEY` is not provided, the backend seamlessly runs in Synthetic Demonstration Mode.*

### 4. Run the API Server
```powershell
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 📡 API Endpoints

- `GET /health`: Health status & OCR/AI capability matrix.
- `POST /api/reports/analyze`: Upload a PDF, JPG, or PNG report for structured extraction and patient-friendly explanation.
- `GET /docs`: Interactive Swagger UI documentation.

