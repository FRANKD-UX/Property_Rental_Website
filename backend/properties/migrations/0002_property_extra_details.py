from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("properties", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="available_date",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="deposit_amount",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="furnished",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="property",
            name="garages",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="property",
            name="lifestyle",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="property",
            name="listing_number",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="parking",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="property",
            name="pets_allowed",
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AddField(
            model_name="property",
            name="property_type",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name="property",
            name="street_address",
            field=models.CharField(blank=True, max_length=255),
        ),
    ]
