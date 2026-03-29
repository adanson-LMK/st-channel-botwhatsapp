"""
ASGI config para st_whatsapp project.
"""

import os
from django.core.asgi import get_asgi_application

environment = os.getenv('DJANGO_ENV', 'development')
if environment == 'production':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

application = get_asgi_application()
