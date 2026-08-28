import os
from flask import Flask, send_from_directory, jsonify
from flask_login import LoginManager
from flask_migrate import Migrate
from backend.config import Config
from backend.models import db, User
from backend.routes import auth_bp, seller_bp, agent_bp, admin_bp, api_bp

def create_app(config_class=Config):
    app = Flask(__name__, static_folder=os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"), static_url_path="")
    app.config.from_object(config_class)

    # Ensure required data directories exist
    os.makedirs(app.config["CERTIFICATES_DIR"], exist_ok=True)
    os.makedirs(app.config["QR_CODES_DIR"], exist_ok=True)
    os.makedirs(os.path.join(os.path.dirname(__file__), "data"), exist_ok=True)

    # Initialize extensions
    db.init_app(app)
    Migrate(app, db)

    login_manager = LoginManager()
    login_manager.init_app(app)
    login_manager.login_view = "auth.login"

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)

    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({"error": "Authentication required", "authenticated": False}), 401

    # Register API Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(seller_bp)
    app.register_blueprint(agent_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(api_bp)

    # Serve Vue Frontend Single Page Application / PWA assets
    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):
        dist_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
        if path and os.path.exists(os.path.join(dist_dir, path)):
            return send_from_directory(dist_dir, path)
        elif os.path.exists(os.path.join(dist_dir, "index.html")):
            return send_from_directory(dist_dir, "index.html")
        else:
            # Fallback to public index if dist not built yet
            public_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public")
            if os.path.exists(os.path.join(public_dir, "index.html")):
                return send_from_directory(public_dir, "index.html")
            return jsonify({
                "message": "RUCO Logistics Platform Backend API is running.",
                "status_url": "/api/status",
                "login_url": "/api/auth/login"
            })

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="0.0.0.0", port=5000, debug=True)
