from .auth import auth_bp
from .seller import seller_bp
from .agent import agent_bp
from .admin import admin_bp
from .api import api_bp

__all__ = ["auth_bp", "seller_bp", "agent_bp", "admin_bp", "api_bp"]
