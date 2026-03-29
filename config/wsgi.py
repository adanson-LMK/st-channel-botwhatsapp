"""
WSGI config para flowchat project.
"""

import os
from django.core.wsgi import get_wsgi_application

environment = os.getenv('DJANGO_ENV', 'development')
if environment == 'production':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')

application = get_wsgi_application()
