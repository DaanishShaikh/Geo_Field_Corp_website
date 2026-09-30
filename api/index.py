import os
import sys

# Add project root to sys.path so backend modules resolve properly
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

try:
    from backend.app import create_app
    app = create_app()

    # Wrap wsgi_app so path is normalized to /api without changing app type
    _original_wsgi_app = app.wsgi_app
    def _normalized_wsgi_app(environ, start_response):
        path = environ.get("PATH_INFO", "")
        if path.startswith("/api/index.py"):
            path = path.replace("/api/index.py", "/api", 1)
        elif path.startswith("/api/index"):
            path = path.replace("/api/index", "/api", 1)
        if not path.startswith("/api"):
            path = "/api" + path
        environ["PATH_INFO"] = path
        return _original_wsgi_app(environ, start_response)
    app.wsgi_app = _normalized_wsgi_app
except Exception as e:
    import traceback
    from flask import Flask, jsonify
    app = Flask(__name__)
    _err_msg = str(e)
    _err_trace = traceback.format_exc()
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def catch_all(path):
        return jsonify({
            "error": "Failed to start application",
            "message": _err_msg,
            "traceback": _err_trace
        }), 500
