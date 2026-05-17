# Backend (Django + MySQL)

## End-to-end setup

1. Create and activate a virtual environment.
2. Install requirements.
3. Copy `.env.example` to `.env` and set database values.
4. Create the MySQL database and user.
5. Run migrations and create an admin user.

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

## Create MySQL database

Run this on your MySQL server (local, cPanel, or managed host) with your own password:

```sql
CREATE DATABASE property_rental_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'property_admin'@'localhost' IDENTIFIED BY 'replace_with_strong_password';
GRANT ALL PRIVILEGES ON property_rental_db.* TO 'property_admin'@'localhost';
FLUSH PRIVILEGES;
```

## Environment variables

`settings.py` supports both `DB_*` and `MYSQL_*` keys. Use `DB_*` on shared hosting where those names are common.

Required:
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `DB_HOST`
- `DB_PORT`

Important production values:
- `DEBUG=False`
- `ALLOWED_HOSTS=yourdomain.co.za,www.yourdomain.co.za`
- `CSRF_TRUSTED_ORIGINS=https://yourdomain.co.za,https://www.yourdomain.co.za`
- `SECURE_SSL_REDIRECT=True` (only when HTTPS is configured)

## Move existing data from SQLite to MySQL

If you still have old SQLite data, export it first before changing environments:

```bash
python manage.py dumpdata --exclude auth.permission --exclude contenttypes > data.json
```

After your `.env` points to MySQL and migrations are applied:

```bash
python manage.py loaddata data.json
```

Then verify:

```bash
python manage.py check
python manage.py showmigrations
```

## Properties API
- `GET /api/properties/` -> list properties
- `POST /api/properties/` -> create property
- `GET /api/properties/<id>/` -> get property
- `PUT/PATCH /api/properties/<id>/` -> update property
- `DELETE /api/properties/<id>/` -> delete property

Payload fields match `Property` in `src/app/context/PropertyContext.tsx`. The frontend sends uploaded image data as `image_data`; Django stores the file in `backend/media/property-images/` and stores the file reference in MySQL. API responses include `image_url` for rendering the image.

## Auth API
- `POST /api/auth/login/` -> returns a bearer token
- `GET /api/auth/me/` -> returns the current user (requires `Authorization: Bearer <token>`)

Property mutations (`POST`, `PUT`, `PATCH`, `DELETE`) require an admin token. Admin is `is_staff`/`is_superuser`.

Example login payload:

```json
{
  "username": "admin",
  "password": "your-password"
}
```

## Notes
- Database settings are read from environment variables in `rental_backend/settings.py`.
- The `properties` app defines the initial schema for rentals.
