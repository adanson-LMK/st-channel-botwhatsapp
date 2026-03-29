"""
Pytest configuration and fixtures
"""
import os
import django
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.development')
django.setup()

import pytest


@pytest.fixture
def client():
    """Django test client"""
    from django.test import Client
    return Client()


@pytest.fixture
def db_setup(db):
    """Database setup fixture"""
    return db
