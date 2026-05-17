import base64
import binascii
import json
import uuid

from django.core.files.base import ContentFile
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Property
from .auth import require_admin


REQUIRED_FIELDS = ["title", "location", "price", "bedrooms", "bathrooms", "area"]
IMAGE_DATA_FIELDS = ["image_data", "image", "image_base64"]
ALLOWED_IMAGE_EXTENSIONS = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
}


def serialize_property(property_obj: Property, request=None) -> dict:
    image_url = property_obj.image.url if property_obj.image else property_obj.image_base64
    if request and property_obj.image:
        image_url = request.build_absolute_uri(image_url)
    return {
        "id": property_obj.id,
        "title": property_obj.title,
        "location": property_obj.location,
        "price": property_obj.price,
        "bedrooms": property_obj.bedrooms,
        "bathrooms": property_obj.bathrooms,
        "area": property_obj.area,
        "image": property_obj.image.name if property_obj.image else "",
        "image_url": image_url,
        "image_base64": property_obj.image_base64,
        "description": property_obj.description,
        "street_address": property_obj.street_address,
        "listing_number": property_obj.listing_number,
        "property_type": property_obj.property_type,
        "available_date": property_obj.available_date,
        "deposit_amount": property_obj.deposit_amount,
        "lifestyle": property_obj.lifestyle,
        "garages": property_obj.garages,
        "parking": property_obj.parking,
        "pets_allowed": property_obj.pets_allowed,
        "furnished": property_obj.furnished,
        "created_at": property_obj.created_at.isoformat(),
        "updated_at": property_obj.updated_at.isoformat(),
    }


def parse_json(request) -> dict:
    if not request.body:
        return {}
    return json.loads(request.body.decode("utf-8"))


def get_image_data(payload: dict) -> str:
    for field in IMAGE_DATA_FIELDS:
        value = payload.get(field)
        if value:
            return value
    return ""


def decode_data_url(data_url: str) -> tuple[str, ContentFile] | None:
    if not data_url.startswith("data:image/"):
        return None

    try:
        header, encoded = data_url.split(",", 1)
        content_type = header.removeprefix("data:").split(";", 1)[0]
        extension = ALLOWED_IMAGE_EXTENSIONS.get(content_type)
        if not extension:
            raise ValueError("Unsupported image type")
        decoded = base64.b64decode(encoded, validate=True)
    except (ValueError, binascii.Error):
        raise ValueError("Invalid image data")

    filename = f"{uuid.uuid4().hex}.{extension}"
    return filename, ContentFile(decoded)


def save_uploaded_image(property_obj: Property, image_data: str) -> None:
    decoded_image = decode_data_url(image_data)
    if not decoded_image:
        return

    filename, content = decoded_image
    if property_obj.image:
        property_obj.image.delete(save=False)
    property_obj.image.save(filename, content, save=False)
    property_obj.image_base64 = ""


@csrf_exempt
@require_http_methods(["GET", "POST"])
def property_collection(request):
    if request.method == "GET":
        properties = Property.objects.order_by("-created_at")
        return JsonResponse({"items": [serialize_property(item, request) for item in properties]})

    _, response = require_admin(request)
    if response:
        return response

    try:
        payload = parse_json(request)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    missing = [field for field in REQUIRED_FIELDS if field not in payload or payload[field] in (None, "")]
    if not get_image_data(payload):
        missing.append("image_data")
    if missing:
        return JsonResponse({"error": "Missing required fields", "fields": missing}, status=400)

    property_obj = Property(
        title=payload["title"],
        location=payload["location"],
        price=payload["price"],
        bedrooms=payload["bedrooms"],
        bathrooms=payload["bathrooms"],
        area=payload["area"],
        description=payload.get("description", ""),
        street_address=payload.get("street_address", ""),
        listing_number=payload.get("listing_number", ""),
        property_type=payload.get("property_type", ""),
        available_date=payload.get("available_date", ""),
        deposit_amount=payload.get("deposit_amount", ""),
        lifestyle=payload.get("lifestyle", ""),
        garages=payload.get("garages", ""),
        parking=payload.get("parking", ""),
        pets_allowed=payload.get("pets_allowed", ""),
        furnished=payload.get("furnished", ""),
    )
    image_data = get_image_data(payload)
    try:
        save_uploaded_image(property_obj, image_data)
    except ValueError as error:
        return JsonResponse({"error": str(error)}, status=400)
    if not property_obj.image:
        property_obj.image_base64 = image_data
    property_obj.save()
    return JsonResponse(serialize_property(property_obj, request), status=201)


@csrf_exempt
@require_http_methods(["GET", "PUT", "PATCH", "DELETE"])
def property_detail(request, property_id: int):
    try:
        property_obj = Property.objects.get(pk=property_id)
    except Property.DoesNotExist:
        return JsonResponse({"error": "Property not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(serialize_property(property_obj, request))

    _, response = require_admin(request)
    if response:
        return response

    if request.method == "DELETE":
        if property_obj.image:
            property_obj.image.delete(save=False)
        property_obj.delete()
        return JsonResponse({"status": "deleted"})

    try:
        payload = parse_json(request)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=400)
    for field in [
        "title",
        "location",
        "price",
        "bedrooms",
        "bathrooms",
        "area",
        "description",
        "street_address",
        "listing_number",
        "property_type",
        "available_date",
        "deposit_amount",
        "lifestyle",
        "garages",
        "parking",
        "pets_allowed",
        "furnished",
    ]:
        if field in payload:
            setattr(property_obj, field, payload[field])
    image_data = get_image_data(payload)
    if image_data:
        try:
            save_uploaded_image(property_obj, image_data)
        except ValueError as error:
            return JsonResponse({"error": str(error)}, status=400)
    property_obj.save()
    return JsonResponse(serialize_property(property_obj, request))
