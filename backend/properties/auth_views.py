import json

from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .auth import issue_token, require_auth


def parse_json(request) -> dict:
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    try:
        payload = parse_json(request)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    username = payload.get("username") or payload.get("email")
    password = payload.get("password")
    if not username or not password:
        return JsonResponse({"error": "Username/email and password required"}, status=400)

    user = authenticate(request, username=username, password=password)
    if not user:
        return JsonResponse({"error": "Invalid credentials"}, status=401)

    token = issue_token(user)
    return JsonResponse(
        {
            "token": token,
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.get_username(),
                "is_admin": bool(user.is_staff or user.is_superuser),
            },
        }
    )


@csrf_exempt
@require_http_methods(["GET"])
def me_view(request):
    user, response = require_auth(request)
    if response:
        return response

    return JsonResponse(
        {
            "id": user.id,
            "email": user.email,
            "username": user.get_username(),
            "is_admin": bool(user.is_staff or user.is_superuser),
        }
    )

