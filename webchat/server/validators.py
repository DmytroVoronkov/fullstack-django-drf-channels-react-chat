import os

from django.core.exceptions import ValidationError
from PIL import Image


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as img:
            if img.width > 70 or img.height > 70:
                raise ValidationError(
                    f"The maximum allowed dimensions for image are 70x70 pixels - size of your image uploaded is {img.size}"
                )


def validate_image_file_extension(value):
    [_, ext] = os.path.splitext(value.name)
    valid_extensions = [".png", ".jpeg", ".jpg"]
    
    if not ext in valid_extensions:
        raise ValidationError(f"Unsupported file extension")
