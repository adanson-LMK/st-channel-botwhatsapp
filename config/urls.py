"""
URL configuration para st_whatsapp project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse

def health(request):
    """Health check endpoint para Docker y GCP"""
    return JsonResponse({'status': 'ok', 'service': 'conauti-whats'})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health', health, name='health'),
    path('', include('apps.landing.urls')),
    # path('blog/', include('apps.blog.urls')),
    # path('users/', include('apps.users.urls')),
]

# Servir media y static files en desarrollo
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
