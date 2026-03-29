"""
Django settings para PRODUCTION (GCP)
"""
import dj_database_url
from .base import *

DEBUG = False
ALLOWED_HOSTS = ALLOWED_HOSTS.split(',') if isinstance(ALLOWED_HOSTS, str) else ALLOWED_HOSTS

# Database - PostgreSQL o MySQL en producción
if DATABASE_URL and DATABASE_URL != 'sqlite:///db.sqlite3':
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Email - Gmail SMTP en producción
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = EMAIL_HOST
EMAIL_PORT = EMAIL_PORT
EMAIL_HOST_USER = EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = EMAIL_HOST_PASSWORD
EMAIL_USE_TLS = EMAIL_USE_TLS
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

# Security - Habilitado en producción
SECURE_SSL_REDIRECT = SECURE_SSL_REDIRECT
SESSION_COOKIE_SECURE = SESSION_COOKIE_SECURE
CSRF_COOKIE_SECURE = CSRF_COOKIE_SECURE
SECURE_HSTS_SECONDS = SECURE_HSTS_SECONDS
SECURE_HSTS_INCLUDE_SUBDOMAINS = SECURE_HSTS_INCLUDE_SUBDOMAINS
SECURE_HSTS_PRELOAD = True

# CORS
CORS_ALLOWED_ORIGINS = []  # Configurable vía env var

# GCP CloudStorage para static files
if GCS_BUCKET_NAME:
    DEFAULT_FILE_STORAGE = 'storages.backends.gcloud_storage.GoogleCloudStorage'
    GS_BUCKET_NAME = GCS_BUCKET_NAME
    GS_PROJECT_ID = GCP_PROJECT_ID

# Logs en producción
LOGGING['handlers']['file'] = {
    'level': 'INFO',
    'class': 'logging.handlers.RotatingFileHandler',
    'filename': '/var/log/django/app.log',
    'maxBytes': 1024 * 1024 * 10,  # 10MB
    'backupCount': 5,
    'formatter': 'verbose',
}
LOGGING['root']['handlers'] = ['console', 'file']
LOGGING['root']['level'] = 'INFO'
