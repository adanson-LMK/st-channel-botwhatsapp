from django.shortcuts import render

# Create your views here.

def login_view(request):
    """Login page - MVP (no functionality yet)."""
    return render(request, 'account/login.html')


def register_view(request):
    """Register page - MVP (no functionality yet)."""
    return render(request, 'account/register.html')


def profile_view(request):
    """Profile page - Coming soon."""
    from django.shortcuts import redirect
    return redirect('landing:index')
