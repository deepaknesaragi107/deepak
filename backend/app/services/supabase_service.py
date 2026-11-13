import logging
from typing import Optional, List, Dict, Any
from app.config import settings

logger = logging.getLogger(__name__)

supabase_client = None

if settings.supabase_url and settings.supabase_key:
    try:
        from supabase import create_client, Client
        supabase_client: Optional[Client] = create_client(settings.supabase_url, settings.supabase_key)
        logger.info("Supabase client initialized successfully.")
    except Exception as e:
        logger.warning(f"Failed to initialize Supabase client: {e}")


def is_supabase_enabled() -> bool:
    return supabase_client is not None


def store_report_history(report_data: Dict[str, Any], user_id: Optional[str] = None) -> bool:
    """Saves analyzed report metadata to Supabase 'reports' table if enabled."""
    if not is_supabase_enabled():
        return False

    try:
        payload = {
            "report_title": report_data.get("report_title"),
            "patient_name": report_data.get("patient_name"),
            "report_date": report_data.get("report_date"),
            "summary": report_data.get("summary"),
            "key_findings": report_data.get("key_findings"),
            "categories": report_data.get("categories"),
            "questions_for_doctor": report_data.get("questions_for_doctor"),
            "user_id": user_id,
        }
        res = supabase_client.table("reports").insert(payload).execute()
        return bool(res.data)
    except Exception as e:
        logger.error(f"Failed to store report in Supabase: {e}")
        return False

