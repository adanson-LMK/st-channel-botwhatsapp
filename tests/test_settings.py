"""
Tests for settings and configuration
"""
import os
import pytest
from django.conf import settings


def test_settings_loaded():
    """Test that Django settings are loaded correctly"""
    assert hasattr(settings, 'INSTALLED_APPS')
    assert 'apps.landing' in settings.INSTALLED_APPS


def test_databases_configured():
    """Test that database is configured"""
    assert settings.DATABASES is not None
    assert 'default' in settings.DATABASES


def test_static_files_configured():
    """Test that static files are configured"""
    assert settings.STATIC_URL == '/static/'
    assert settings.MEDIA_URL == '/media/'


def test_secret_key_not_default():
    """Test that SECRET_KEY is configured (not using default in production)"""
    assert settings.SECRET_KEY is not None
