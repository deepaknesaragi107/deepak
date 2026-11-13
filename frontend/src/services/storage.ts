import { ReportAnalysis } from '../types/report';
import { SAMPLE_REPORTS } from '../data/sampleReports';

const STORAGE_KEY = 'reportsaathi_saved_reports_v1';

export function getStoredReports(): ReportAnalysis[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return SAMPLE_REPORTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [];
  } catch (err) {
    console.warn('Failed to read reports from localStorage:', err);
    return SAMPLE_REPORTS;
  }
}

export function saveReports(reports: ReportAnalysis[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.warn('Failed to save reports to localStorage:', err);
  }
}

export function addReport(newReport: ReportAnalysis): ReportAnalysis[] {
  const current = getStoredReports();
  const updated = [newReport, ...current];
  saveReports(updated);
  return updated;
}

export function deleteReportById(reportId: string): ReportAnalysis[] {
  const current = getStoredReports();
  const updated = current.filter((r) => r.id !== reportId);
  saveReports(updated);
  return updated;
}

export function clearStoredReports(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  } catch (err) {
    console.warn('Failed to clear localStorage:', err);
  }
}

export function restoreDefaultReports(): ReportAnalysis[] {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_REPORTS));
  } catch (err) {
    console.warn('Failed to restore default reports:', err);
  }
  return SAMPLE_REPORTS;
}

