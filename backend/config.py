import os
import shutil
import tempfile
from datetime import timedelta

try:
    from dotenv import load_dotenv
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    load_dotenv(os.path.join(BASE_DIR, "..", ".env"))
except Exception:
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Detect Vercel or AWS Lambda serverless execution environment
IS_SERVERLESS = bool(
    os.environ.get("VERCEL") 
    or os.environ.get("AWS_LAMBDA_FUNCTION_NAME") 
    or os.environ.get("LAMBDA_TASK_ROOT")
)

def get_database_uri():
    db_url = os.environ.get("DATABASE_URL")
    if db_url:
        db_url = db_url.strip('"\' \t\r\n')
        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)
        if "channel_binding=" in db_url:
            import re
            db_url = re.sub(r"[&?]channel_binding=[^&]*", "", db_url)
            db_url = re.sub(r"\?&", "?", db_url).rstrip("?")
        return db_url
    
    # SQLite fallback
    if IS_SERVERLESS:
        # In serverless (Vercel / AWS Lambda), the deployment directory is strictly read-only.
        # SQLite needs a writable directory for WAL, locking, and mutations, which is /tmp.
        tmp_dir = tempfile.gettempdir()
        tmp_db = os.path.join(tmp_dir, "ruco_platform.db")
        orig_db = os.path.join(BASE_DIR, "data", "ruco_platform.db")
        
        # Copy the pre-seeded database to /tmp if it hasn't been copied yet
        if not os.path.exists(tmp_db) and os.path.exists(orig_db):
            try:
                shutil.copyfile(orig_db, tmp_db)
            except Exception:
                pass
        return f"sqlite:///{tmp_db}"

    return f"sqlite:///{os.path.join(BASE_DIR, 'data', 'ruco_platform.db')}"

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "geofield-ruco-uco-trace-secret-key-2026")
    
    SQLALCHEMY_DATABASE_URI = get_database_uri()
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 300,
    }
    
    # Session config
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    
    # Celery & Redis
    CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
    
    # Storage - use writable temp directory on serverless environments
    if IS_SERVERLESS:
        tmp_base = tempfile.gettempdir()
        CERTIFICATES_DIR = os.path.join(tmp_base, "certificates")
        QR_CODES_DIR = os.path.join(tmp_base, "qr_codes")
    else:
        CERTIFICATES_DIR = os.path.join(BASE_DIR, "data", "certificates")
        QR_CODES_DIR = os.path.join(BASE_DIR, "data", "qr_codes")
        
    try:
        os.makedirs(CERTIFICATES_DIR, exist_ok=True)
        os.makedirs(QR_CODES_DIR, exist_ok=True)
    except Exception:
        pass
    
    # Maps configuration
    GOOGLE_MAPS_API_KEY = os.environ.get(
        "GOOGLE_MAPS_API_KEY",
        "AIzaSyC9vpy6T1_JwsLJDFR4O3mjNvQZiB_Ohzg"
    )
    MAPBOX_ACCESS_TOKEN = os.environ.get(
        "MAPBOX_ACCESS_TOKEN", 
        "pk.eyJ1IjoiZ2VvZmllbGQiLCJhIjoiY2x5eG94OGdtMGJzczJqcTJ4bmw5c2QwayJ9.demo_token"
    )

