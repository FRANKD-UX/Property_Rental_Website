from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("properties", "0002_property_extra_details"),
    ]

    operations = [
        migrations.AddField(
            model_name="property",
            name="image",
            field=models.ImageField(blank=True, upload_to="property-images/"),
        ),
        migrations.AlterField(
            model_name="property",
            name="image_base64",
            field=models.TextField(blank=True, default=""),
        ),
    ]
