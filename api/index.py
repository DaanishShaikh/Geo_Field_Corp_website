import os
import sys

# Add project root to sys.path so backend modules resolve properly
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app import create_app

# Create app — no blocking operations at startup
app = create_app()
