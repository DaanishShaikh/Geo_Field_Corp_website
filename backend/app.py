import os
from flask import Flask, send_from_directory, jsonify
from flask_login import LoginManager
from backend.config import Config
from backend.models import db, User
from backend.routes import auth_bp, seller_bp, agent_bp, admin_bp, api_bp

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=None)
    app.config.from_object(config_class)

    # Universal cookie settings for same-origin SPA (compatible with both HTTP localhost and HTTPS Vercel)
    app.config["SESSION_COOKIE_HTTPONLY"] = True
    app.config["SESSION_COOKIE_SAMESITE"] = "Lax"
    app.config["SESSION_COOKIE_SECURE"] = False
    app.config["REMEMBER_COOKIE_HTTPONLY"] = True
    app.config["REMEMBER_COOKIE_SAMESITE"] = "Lax"
    app.config["REMEMBER_COOKIE_SECURE"] = False

    # Initialize database extension only (no connection yet)
    db.init_app(app)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    @login_manager.user_loader
    def load_user(user_id):
        try:
            return db.session.get(User, str(user_id))
        except Exception:
            return None

    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({"error": "Authentication required", "authenticated": False}), 401

    # Register API Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(seller_bp)
    app.register_blueprint(agent_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_bp)

    # Ensure Super Admin account and rate card exist without injecting dummy sellers/agents
    _admin_checked = False

    @app.before_request
    def ensure_admin_account():
        nonlocal _admin_checked
        if not _admin_checked:
            try:
                from backend.models import RateCard
                from sqlalchemy import text
                db.create_all()

                # Safe auto-migration for new seller KYC columns
                new_columns = [
                    ("contact_name", "VARCHAR(150)"),
                    ("alt_contact_name", "VARCHAR(150)"),
                    ("alt_phone", "VARCHAR(50)"),
                    ("gst_no", "VARCHAR(50)"),
                    ("bank_upi_or_cheque", "VARCHAR(150)"),
                    ("msme_udyam_no", "VARCHAR(80)"),
                ]
                for col_name, col_type in new_columns:
                    try:
                        db.session.execute(text(f"ALTER TABLE seller_profiles ADD COLUMN IF NOT EXISTS {col_name} {col_type};"))
                        db.session.commit()
                    except Exception:
                        db.session.rollback()
                        try:
                            # SQLite syntax fallback
                            db.session.execute(text(f"ALTER TABLE seller_profiles ADD COLUMN {col_name} {col_type};"))
                            db.session.commit()
                        except Exception:
                            db.session.rollback()

                admin = User.query.filter_by(role="admin").first()
                if not admin:
                    admin = User(
                        id="ADM-001",
                        email="admin@geofield.com",
                        name="Super Admin (GeoField Platform Owner)",
                        phone="+91 98800 11223",
                        role="admin",
                        status="approved"
                    )
                    admin.set_password("admin123")
                    db.session.add(admin)
                else:
                    if admin.status != "approved":
                        admin.status = "approved"
                    if not admin.check_password("admin123"):
                        admin.set_password("admin123")
                
                if not RateCard.query.first():
                    rc = RateCard(base_rate=55.0, low_tpc_bonus=5.0, high_tpc_penalty=8.0)
                    db.session.add(rc)

                # Clean up legacy/demo accounts
                stale_emails = [
                    "greenleaf@cafe.com", 
                    "mumbai@kitchen.com", 
                    "bangalore@cloudkitchen.com", 
                    "agent.rahul@geofield.com", 
                    "agent.priya@geofield.com", 
                    "agent@geofield.com", 
                    "seller@geofield.com"
                ]
                for stale in User.query.filter(User.email.in_(stale_emails)).all():
                    db.session.delete(stale)

                db.session.commit()
                _admin_checked = True
            except Exception as e:
                try:
                    db.session.rollback()
                except Exception:
                    pass
                app.logger.warning(f"Admin bootstrap check: {e}")



    # Global JSON error handlers
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
        dist_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
        if os.path.exists(os.path.join(dist_dir, "index.html")):
            return send_from_directory(dist_dir, "index.html")
        return jsonify({"error": "Not found"}), 404

    @app.errorhandler(500)
    def internal_error(e):
        try:
            db.session.rollback()
        except Exception:
            pass
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

    @app.errorhandler(Exception)
    def handle_exception(e):
        try:
            db.session.rollback()
        except Exception:
            pass
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

    # Ensure HTML is never cached by browser so updates apply instantly without hard refresh
    @app.after_request
    def add_cache_headers(response):
        if response.content_type and "text/html" in response.content_type:
            response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
            response.headers["Pragma"] = "no-cache"
            response.headers["Expires"] = "0"
        return response

    return app
