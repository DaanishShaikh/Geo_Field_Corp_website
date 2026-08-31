import os
from flask import Flask, send_from_directory, jsonify
from flask_login import LoginManager
from backend.config import Config
from backend.models import db, User
from backend.routes import auth_bp, seller_bp, agent_bp, admin_bp, api_bp

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=None)
    app.config.from_object(config_class)

    # On Vercel (HTTPS), session cookies must be Secure
    is_production = os.environ.get("VERCEL") or os.environ.get("DATABASE_URL", "").startswith("postgresql")
    app.config["SESSION_COOKIE_SECURE"] = bool(is_production)
    app.config["SESSION_COOKIE_SAMESITE"] = "None" if is_production else "Lax"
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["REMEMBER_COOKIE_SECURE"] = bool(is_production)
    app.config["REMEMBER_COOKIE_SAMESITE"] = "None" if is_production else "Lax"

    # Ensure required data directories exist (skip on read-only serverless)
    try:
        os.makedirs(app.config.get("CERTIFICATES_DIR", "/tmp/certs"), exist_ok=True)
        os.makedirs(app.config.get("QR_CODES_DIR", "/tmp/qr"), exist_ok=True)
    except OSError:
        pass

    # Initialize database
    db.init_app(app)

    # Auto-create tables on first cold start (serverless-safe)
    with app.app_context():
        try:
            db.create_all()
        except Exception as e:
            app.logger.warning(f"db.create_all() skipped: {e}")

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.get(User, user_id)

    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({"error": "Authentication required", "authenticated": False}), 401

    # Register API Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(seller_bp)
    app.register_blueprint(agent_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_bp)

    # Global JSON error handlers — prevents raw HTML 500 pages reaching the frontend
    @app.errorhandler(400)
    def bad_request(e):
        return jsonify({"error": "Bad request", "details": str(e)}), 400

    @app.errorhandler(401)
    def unauthorized_error(e):
        return jsonify({"error": "Authentication required"}), 401

    @app.errorhandler(403)
    def forbidden(e):
        return jsonify({"error": "Forbidden"}), 403

    @app.errorhandler(404)
    def not_found(e):
        # For SPA routing — return index.html for unknown paths
        dist_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
        if os.path.exists(os.path.join(dist_dir, "index.html")):
            return send_from_directory(dist_dir, "index.html")
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        db.session.rollback()
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        db.session.rollback()
        app.logger.error(f"Unhandled exception: {e}", exc_info=True)
        return jsonify({"error": "Server error", "details": str(e)}), 500

    # Serve Vue Frontend SPA for local development
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        dist_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
        if path and os.path.exists(os.path.join(dist_dir, path)):
            return send_from_directory(dist_dir, path)
        elif os.path.exists(os.path.join(dist_dir, "index.html")):
            return send_from_directory(dist_dir, "index.html")
        return jsonify({
            "message": "RUCO Logistics Platform API is running.",
            "status_url": "/api/status"
        })

    return app

# Vercel / gunicorn entrypoint
app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
