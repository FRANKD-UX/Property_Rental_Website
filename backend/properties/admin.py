from django.contrib import admin

from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "price", "bedrooms", "bathrooms", "area", "updated_at")
    search_fields = ("title", "location")
    list_filter = ("bedrooms", "bathrooms")

