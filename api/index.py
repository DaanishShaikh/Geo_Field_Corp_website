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
        if not path.startswith("/api"):
            environ["PATH_INFO"] = "/api" + path
        return _original_wsgi_app(environ, start_response)
    app.wsgi_app = _normalized_wsgi_app
except Exception as e:
    import traceback
    from flask import Flask, jsonify
    app = Flask(__name__)
    _err_msg = str(e)
    _tb = traceback.format_exc()

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def catch_all(path):
        return jsonify({
            "error": "Serverless backend initialization failed",
            "details": _err_msg,
            "traceback": _tb
        }), 500

