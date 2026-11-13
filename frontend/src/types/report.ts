export type ParameterStatus = 'normal' | 'high' | 'low' | 'borderline' | 'inconclusive' | 'unclear';

export interface LabParameter {
  name: string;
  value: string;
  unit?: string | null;
  reference_range?: string | null;
  status: ParameterStatus;
  source_fact?: string | null;
  simple_explanation: string;
  what_this_value_means: string;
  missing_or_unclear_notes?: string | null;
  lifestyle_tips?: string[] | null;
}

export interface LabCategory {
  category_name: string;
  parameters: LabParameter[];
}

export interface ReportAnalysis {
  id?: string;
  status?: string;
  report_title: string;
  patient_name?: string | null;
  report_date?: string | null;
  lab_name?: string | null;
  summary: string;
  key_findings: string[];
  categories: LabCategory[];
  questions_for_doctor: string[];
  unclear_items_note?: string | null;
  educational_disclaimer: string;
  extraction_method: string;
  extracted_text?: string | null;
  ocr_applied?: boolean;
  file_type?: string | null;
  file_size_bytes?: number | null;
  pages_processed?: number;
}

export type ViewState = 'landing' | 'dashboard' | 'results';

export interface FileValidationError {
  title: string;
  message: string;
}

export interface BackendHealth {
  status: string;
  gemini_configured: boolean;
  model: string;
  tesseract_available?: boolean;
  allowed_formats?: string[];
  max_file_size_mb?: number;
}
