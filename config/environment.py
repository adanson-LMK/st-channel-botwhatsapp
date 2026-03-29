"""
Manejo centralizado de variables de entorno
"""
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent


def get_env(key: str, default=None, cast=str):
    """Obtiene variable de entorno con casting opcional"""
    value = os.getenv(key, default)

    if cast == bool:
        return value.lower() in ('true', '1', 'yes', 'on') if value else False
    elif cast == int:
        return int(value) if value else default
    elif cast == list:
        return value.split(',') if value else []

    return value


# Environment
ENVIRONMENT = get_env('DJANGO_ENV', 'development')
DEBUG = get_env('DEBUG', 'True', bool)
SECRET_KEY = get_env('SECRET_KEY', 'django-insecure-changeme-in-production')

# Allowed hosts
ALLOWED_HOSTS = get_env('ALLOWED_HOSTS', 'localhost,127.0.0.1', list)

# Database
DATABASE_URL = get_env('DATABASE_URL', 'sqlite:///db.sqlite3')

# WhatsApp & API Keys
WHATSAPP_API_KEY = get_env('WHATSAPP_API_KEY', '')
WHATSAPP_BUSINESS_ACCOUNT_ID = get_env('WHATSAPP_BUSINESS_ACCOUNT_ID', '')

# Stripe (Payments)
STRIPE_PUBLIC_KEY = get_env('STRIPE_PUBLIC_KEY', '')
STRIPE_SECRET_KEY = get_env('STRIPE_SECRET_KEY', '')

# Email
EMAIL_BACKEND = get_env('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = get_env('EMAIL_HOST', 'smtp.gmail.com')
EMAIL_PORT = get_env('EMAIL_PORT', '587', int)
EMAIL_HOST_USER = get_env('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = get_env('EMAIL_HOST_PASSWORD', '')
EMAIL_USE_TLS = get_env('EMAIL_USE_TLS', 'True', bool)

# Security
SECURE_SSL_REDIRECT = get_env('SECURE_SSL_REDIRECT', 'False', bool)
SESSION_COOKIE_SECURE = get_env('SESSION_COOKIE_SECURE', 'False', bool)
CSRF_COOKIE_SECURE = get_env('CSRF_COOKIE_SECURE', 'False', bool)
SECURE_HSTS_SECONDS = get_env('SECURE_HSTS_SECONDS', '0', int)
SECURE_HSTS_INCLUDE_SUBDOMAINS = get_env('SECURE_HSTS_INCLUDE_SUBDOMAINS', 'False', bool)

# GCP
GCP_PROJECT_ID = get_env('GCP_PROJECT_ID', '')
GCS_BUCKET_NAME = get_env('GCS_BUCKET_NAME', '')
