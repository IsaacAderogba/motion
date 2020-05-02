from datetime import datetime


def generate_iso_date():
    return datetime.now().isoformat()
