from http.server import BaseHTTPRequestHandler
import json
import sys
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        
        info = {
            "python": sys.version,
            "sys_path": sys.path,
            "cwd": os.getcwd(),
        }
        try:
            import flask
            info["flask"] = flask.__version__
        except Exception as e:
            info["flask_error"] = str(e)

        try:
            import psycopg2
            info["psycopg2"] = psycopg2.__version__
        except Exception as e:
            info["psycopg2_error"] = str(e)

        try:
            sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
            from backend.app import create_app
            info["backend_import"] = "SUCCESS"
        except Exception as e:
            info["backend_error"] = str(e)
            
        self.wfile.write(json.dumps(info, indent=2).encode("utf-8"))
