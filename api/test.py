from flask import Flask, jsonify
import sys
import os

app = Flask(__name__)

@app.route("/api/test")
@app.route("/test")
@app.route("/")
def test():
    return jsonify({
        "status": "ok",
        "python_version": sys.version,
        "env_vars": [k for k in os.environ.keys() if "KEY" not in k and "SECRET" not in k and "PASS" not in k and "URL" not in k],
        "has_database_url": bool(os.environ.get("DATABASE_URL")),
        "cwd": os.getcwd(),
        "files_in_cwd": os.listdir(".") if os.path.exists(".") else []
    })
