

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Property",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("location", models.CharField(max_length=200)),
                ("price", models.CharField(max_length=50)),
                ("bedrooms", models.PositiveIntegerField()),
                ("bathrooms", models.PositiveIntegerField()),
                ("area", models.CharField(max_length=100)),
                ("image_base64", models.TextField()),
                ("description", models.TextField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
    ]

