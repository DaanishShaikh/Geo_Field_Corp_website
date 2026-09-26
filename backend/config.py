import os
import tempfile
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "geofield-ruco-uco-trace-secret-key-2026")
    
    # PostgreSQL with fallback to SQLite for local development
    _raw_db_url = os.environ.get("DATABASE_URL")
    if _raw_db_url:
        _raw_db_url = _raw_db_url.strip().strip("'\"")
        if _raw_db_url.startswith("postgres://"):
            _raw_db_url = _raw_db_url.replace("postgres://", "postgresql+psycopg2://", 1)
        elif _raw_db_url.startswith("postgresql://"):
            _raw_db_url = _raw_db_url.replace("postgresql://", "postgresql+psycopg2://", 1)
        elif _raw_db_url.startswith("postgresql+psycopg://"):
            _raw_db_url = _raw_db_url.replace("postgresql+psycopg://", "postgresql+psycopg2://", 1)
        if "channel_binding=" in _raw_db_url:
            import re
            _raw_db_url = re.sub(r"[&?]channel_binding=[^&]*", "", _raw_db_url)
            _raw_db_url = re.sub(r"\?&", "?", _raw_db_url).rstrip("?")
        SQLALCHEMY_DATABASE_URI = _raw_db_url
    else:
        if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"):
            SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(tempfile.gettempdir(), 'ruco_platform.db')}"
        else:
            SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'data', 'ruco_platform.db')}"
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session config
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    
    # Celery & Redis
    CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
    
    # Storage - use writable /tmp directory on serverless environments
    if os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"):
        CERTIFICATES_DIR = os.path.join(tempfile.gettempdir(), "certificates")
        QR_CODES_DIR = os.path.join(tempfile.gettempdir(), "qr_codes")
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
