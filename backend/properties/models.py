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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.title} - {self.location}"

