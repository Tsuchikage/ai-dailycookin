from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from typing_extensions import Annotated

from services.image.description import ImageDescriptionFetcher
from services.image.encoding import base64_encode_image

from services.image.processing import ImageProcessing
from services.image.tags import TagsFetcher

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

    tags_fetcher = TagsFetcher(image_bytes=image_bytes)
    tags = await tags_fetcher.get_tags()
    print(f"{tags=}")

    description_fetcher = ImageDescriptionFetcher(tags=tags)
    description = await description_fetcher.get_description()

    return {"base64_image": image_bytes, "tags": tags, "description": description}
