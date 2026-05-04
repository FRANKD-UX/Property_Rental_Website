import os
from typing import Optional, Tuple

from django.contrib.auth import get_user_model
from django.core.signing import BadSignature, SignatureExpired, TimestampSigner
from django.http import JsonResponse

TOKEN_SALT = "api-auth"
DEFAULT_TTL_SECONDS = 60 * 60 * 24


def issue_token(user) -> str:
    signer = TimestampSigner(salt=TOKEN_SALT)
    return signer.sign(str(user.id))


def verify_token(token: str, max_age_seconds: int) -> Tuple[Optional[object], Optional[str]]:
    signer = TimestampSigner(salt=TOKEN_SALT)
    try:
        user_id = signer.unsign(token, max_age=max_age_seconds)
    except SignatureExpired:
        return None, "expired"
    except BadSignature:
        return None, "invalid"

    user = get_user_model().objects.filter(pk=user_id).first()
    if not user:
        return None, "invalid"
    return user, None


def get_bearer_token(request) -> Optional[str]:
    header = request.headers.get("Authorization") or request.META.get("HTTP_AUTHORIZATION")
    if not header:
        return None
    parts = header.split(" ", 1)
    if len(parts) != 2 or parts[0].lower() != "bearer":
        return None
    return parts[1].strip()


def require_auth(request):
    token = get_bearer_token(request)
    if not token:
        return None, JsonResponse({"error": "Missing Authorization header"}, status=401)

    max_age = int(os.getenv("AUTH_TOKEN_TTL_SECONDS", str(DEFAULT_TTL_SECONDS)))
    user, error = verify_token(token, max_age)
    if error == "expired":
        return None, JsonResponse({"error": "Token expired"}, status=401)
    if error:
        return None, JsonResponse({"error": "Invalid token"}, status=401)

    request.auth_user = user
    request.is_admin = bool(user.is_staff or user.is_superuser)
    return user, None


def require_admin(request):
    user, response = require_auth(request)
    if response:
        return None, response
    if not request.is_admin:
        return None, JsonResponse({"error": "Admin access required"}, status=403)
    return user, None

