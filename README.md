
# Professional Property Rental Website

This project contains a React frontend (`src/`) and Django backend (`backend/`) in one codebase.

## Frontend (Vite)

```bash
npm i
npm run dev
```

Frontend API base URL is controlled by `VITE_API_BASE_URL` (see `.env.example`).

## Backend (Django + MySQL)

Follow `backend/README.md` for complete MySQL setup.

Quick start:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

## Production deployment (shared hosting)

- Keep frontend and backend on the same domain.
- Point frontend API calls to same-origin (`VITE_API_BASE_URL=`).
- Use MySQL (not SQLite) with production env vars.
  