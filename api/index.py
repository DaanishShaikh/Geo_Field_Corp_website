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
        # If Vercel rewrote PATH_INFO to the entrypoint file, recover the actual request path from RAW_URI or REQUEST_URI
        if path in ("/api/index.py", "/api/index", "/index.py", "/api", ""):
            raw = environ.get("RAW_URI") or environ.get("REQUEST_URI") or environ.get("HTTP_X_VERCEL_FORWARDED_FOR") or ""
            if raw and raw.startswith("/"):
                path = raw.split("?")[0]

        # Strip redundant serverless function file prefixes if present
        for prefix in ["/api/index.py", "/api/index", "/index.py"]:
            if path.startswith(prefix):
                path = path[len(prefix):]
                break

        if not path.startswith("/"):
            path = "/" + path
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
