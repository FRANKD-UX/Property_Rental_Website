# Backend (Django + PostgreSQL)

## Quick start

```bash
python -m pip install -r requirements.txt
```

Create a local `.env` in this folder based on `.env.example`, then run migrations:

```bash
python manage.py migrate
```

Start the dev server:

```bash
python manage.py runserver
```

## Properties API
- `GET /api/properties/` -> list properties
- `POST /api/properties/` -> create property
- `GET /api/properties/<id>/` -> get property
- `PUT/PATCH /api/properties/<id>/` -> update property
- `DELETE /api/properties/<id>/` -> delete property

Payload fields match `Property` in `src/app/context/PropertyContext.tsx`, with `image_base64` storing base64 data.

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
