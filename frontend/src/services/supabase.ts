import { createClient } from '@supabase/supabase-js';
import { ReportAnalysis } from '../types/report';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Save report to Supabase if configured, otherwise returns null.
 */
export async function saveReportToSupabase(report: ReportAnalysis): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('reports').insert([
      {
        report_title: report.report_title,
        patient_name: report.patient_name,
        report_date: report.report_date,
        summary: report.summary,
        key_findings: report.key_findings,
        categories: report.categories,
        questions_for_doctor: report.questions_for_doctor,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.warn('Supabase save error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase integration error:', err);
    return false;
  }
}

