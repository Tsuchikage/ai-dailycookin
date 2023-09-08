import base64
from typing import BinaryIO


def base64_encode_image(image: bytes) -> bytes:
    return base64.b64encode(image)
