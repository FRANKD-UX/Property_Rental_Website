import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'rental_backend.settings')
django.setup()

from django.contrib.auth.models import User

# Check if admin user already exists
if User.objects.filter(username='admin').exists():
    print("Admin user already exists!")
else:
    User.objects.create_superuser(
        username='admin',
        email='admin@easirent.co.za',
        password='admin123'
    )
    print("Admin user created successfully!")
    print("Email: admin@easirent.co.za")
    print("Password: admin123")
