# ReportSaathi (रिपोर्ट साथी)
> **Educational Medical Laboratory Report Explainer**  
> Demystifying lab reports into patient-friendly, plain language with actionable questions for physician consultations.

---

## ⚠️ Important Educational & Safety Notice
**ReportSaathi is strictly an educational tool.**  
It does **NOT** provide medical diagnoses, treatment recommendations, clinical evaluations, or prescriptions. All laboratory metrics must be interpreted by a licensed healthcare provider in the context of the patient's individual clinical history.

---

## 🏗️ Architecture & Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend**: Python 3.15, FastAPI, Pydantic v2.
- **Text & Document Extraction**:
  - `pdfplumber` & `pypdf` for digital lab PDFs.
  - Automatic fallback to **Gemini Multimodal Vision** for scanned images and photos (`.png`, `.jpg`, `.jpeg`, `.webp`), eliminating local binary OCR hurdles.
  - Optional local Tesseract support via `pytesseract` if configured.
- **AI Explainer Engine**:
  - Google Gemini API (`gemini-2.5-flash` / `gemini-1.5-flash`) via `google-genai` SDK.
  - Built-in **Educational Sample Mode** for instant demonstration without an active API key.

---

## 🚀 Running Locally

### Backend (FastAPI)
```powershell
cd backend
.\venv\Scripts\Activate.ps1
uvicorn app.main:app --host 127.0.0.1 --port 8000
```
API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`

### Frontend (React + Vite)
```powershell
cd frontend
npm run dev
```
Local Web App: `http://localhost:5173`

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```
*Note: If `GEMINI_API_KEY` is not provided, the app gracefully runs in Sample/Demo Mode with a full CBC & Lipid Profile report.*

