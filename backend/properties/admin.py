from django.contrib import admin

from .models import Property


@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    list_display = ("title", "location", "price", "property_type", "listing_number", "updated_at")
    search_fields = ("title", "location", "listing_number", "street_address")
    list_filter = ("bedrooms", "bathrooms")
