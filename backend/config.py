import os
from datetime import timedelta

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "geofield-ruco-uco-trace-secret-key-2026")
    
    # PostgreSQL with fallback to SQLite for local development
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        f"sqlite:///{os.path.join(BASE_DIR, 'data', 'ruco_platform.db')}"
    )
    # Fix for Postgres URLs that start with postgres://
    if SQLALCHEMY_DATABASE_URI.startswith("postgres://"):
        SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace("postgres://", "postgresql://", 1)
    # Strip channel_binding parameter — psycopg2 does not support it
    if "channel_binding=" in SQLALCHEMY_DATABASE_URI:
        import re
        SQLALCHEMY_DATABASE_URI = re.sub(r"[&?]channel_binding=[^&]*", "", SQLALCHEMY_DATABASE_URI)
        SQLALCHEMY_DATABASE_URI = re.sub(r"\?&", "?", SQLALCHEMY_DATABASE_URI).rstrip("?")
        
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session config
    PERMANENT_SESSION_LIFETIME = timedelta(days=7)
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    
    # Celery & Redis
    CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0")
    CELERY_RESULT_BACKEND = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
    
    # Storage
    CERTIFICATES_DIR = os.path.join(BASE_DIR, "data", "certificates")
    QR_CODES_DIR = os.path.join(BASE_DIR, "data", "qr_codes")
    
    # Mapbox configuration
    MAPBOX_ACCESS_TOKEN = os.environ.get(
        "MAPBOX_ACCESS_TOKEN", 
        "pk.eyJ1IjoiZ2VvZmllbGQiLCJhIjoiY2x5eG94OGdtMGJzczJqcTJ4bmw5c2QwayJ9.demo_token"
    )
