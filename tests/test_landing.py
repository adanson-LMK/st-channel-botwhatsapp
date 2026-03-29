"""
Tests for landing page
"""
import pytest
from django.test import Client


@pytest.mark.django_db
def test_landing_page_loads():
    """Test that landing page loads successfully"""
    client = Client()
    response = client.get('/')
    assert response.status_code == 200
    assert 'Conauti Whats' in response.content.decode()


@pytest.mark.django_db
def test_health_endpoint():
    """Test health check endpoint"""
    client = Client()
    response = client.get('/health')
    assert response.status_code == 200
    assert response.json()['status'] == 'ok'


@pytest.mark.django_db
def test_admin_panel_requires_auth():
    """Test that admin panel requires authentication"""
    client = Client()
    response = client.get('/admin/')
    assert response.status_code == 302  # Redirect to login
