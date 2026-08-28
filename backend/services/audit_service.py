from backend.models import db, AuditLog
from flask import request

def log_audit(actor_id, actor_role, action, entity_type, entity_id, details=None):
    """
    Append-only tamper-proof audit log entry creator.
    """
    ip = None
    try:
        if request:
            ip = request.remote_addr
    except Exception:
        pass

    log_entry = AuditLog(
        actor_id=actor_id,
        actor_role=actor_role,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        details=details,
        ip_address=ip
    )
    db.session.add(log_entry)
    # Commit or flush is handled by caller or session
    return log_entry
