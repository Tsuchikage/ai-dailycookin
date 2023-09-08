from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from typing_extensions import Annotated

from services.image.encoding import base64_encode_image

from services.image.processing import ImageProcessing

router = APIRouter(prefix="/images")


@router.post("/process_image")
async def post_process_image(
    image: Annotated[UploadFile, File()],
):
    if image.content_type not in ["image/jpeg", "image/png"]:
        raise HTTPException(status_code=400, detail="Invalid file type")

    processing = ImageProcessing(image_bytes=await image.read())
    new_file = processing.process_image()

    image_bytes = base64_encode_image(image=new_file)

    return {"base64_image": image_bytes, "some_param": "123"}
