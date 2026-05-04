from django.urls import path

from . import views
from . import auth_views

urlpatterns = [
    path("auth/login/", auth_views.login_view, name="auth-login"),
    path("auth/me/", auth_views.me_view, name="auth-me"),
    path("properties/", views.property_collection, name="property-collection"),
    path("properties/<int:property_id>/", views.property_detail, name="property-detail"),
]
