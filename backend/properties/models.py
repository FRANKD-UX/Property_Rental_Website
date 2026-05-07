from django.db import models


class Property(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    price = models.CharField(max_length=50)
    bedrooms = models.PositiveIntegerField()
    bathrooms = models.PositiveIntegerField()
    area = models.CharField(max_length=100)
    image_base64 = models.TextField()
    description = models.TextField(blank=True)
    street_address = models.CharField(max_length=255, blank=True)
    listing_number = models.CharField(max_length=100, blank=True)
    property_type = models.CharField(max_length=100, blank=True)
    available_date = models.CharField(max_length=100, blank=True)
    deposit_amount = models.CharField(max_length=100, blank=True)
    lifestyle = models.CharField(max_length=255, blank=True)
    garages = models.CharField(max_length=50, blank=True)
    parking = models.CharField(max_length=50, blank=True)
    pets_allowed = models.CharField(max_length=50, blank=True)
    furnished = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.title} - {self.location}"
