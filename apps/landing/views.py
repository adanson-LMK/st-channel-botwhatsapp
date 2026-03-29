from django.shortcuts import render


def index(request):
    """Landing page principal"""
    return render(request, 'landing/landing.html')
