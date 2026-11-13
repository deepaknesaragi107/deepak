import { ReportAnalysis, BackendHealth } from '../types/report';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function checkBackendHealth(): Promise<BackendHealth> {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`Health check failed with status: ${res.status}`);
    return await res.json();
  } catch {
    // Try relative fallback via Vite proxy
    const fallback = await fetch('/health');
    if (!fallback.ok) throw new Error('Backend is unreachable');
    return await fallback.json();
  }
}

export async function fetchSampleReport(): Promise<ReportAnalysis> {
  let res = await fetch(`${API_BASE_URL}/api/v1/sample-report`);
  if (!res.ok) {
    res = await fetch('/api/v1/sample-report');
  }
  if (!res.ok) throw new Error('Failed to load sample report');
  return await res.json();
}

/**
 * Uploads a laboratory report (PDF, JPG, PNG) to POST /api/reports/analyze
 */
export async function analyzeReportFile(file: File, forceDemo: boolean = false): Promise<ReportAnalysis> {
  const formData = new FormData();
  formData.append('file', file);

  const targetUrl = `${API_BASE_URL}/api/reports/analyze?demo=${forceDemo}`;
  
  let res: Response;
  try {
    res = await fetch(targetUrl, {
      method: 'POST',
      body: formData,
    });
  } catch {
    // Attempt fallback via relative proxy
    res = await fetch(`/api/reports/analyze?demo=${forceDemo}`, {
      method: 'POST',
      body: formData,
    });
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const message = errorData?.detail || `Analysis request failed with status ${res.status}`;
    throw new Error(message);
  }

  return await res.json();
}
