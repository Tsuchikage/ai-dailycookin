from io import BytesIO

import numpy as np
from PIL import Image
from numpy import ndarray

from ultralytics import YOLO
from fastsam import FastSAM, FastSAMPrompt


class ImageProcessing:
    DEVICE = "cpu"
    SAM_MODEL = FastSAM("FastSAM-x.pt")
    YOLO_MODEL = YOLO("yolov8n.pt")

    def __init__(self, image_bytes: bytes):
        self.image_bytes = image_bytes
        self.pil_image = Image.open(BytesIO(image_bytes)).convert("RGBA")

    def _get_area_from_box(self, box) -> int:
        _, _, width, height = box
        return width * height

    def _get_nparray_from_image(self, pil_image: Image) -> ndarray:
        return np.array(pil_image)  # noqa

    def find_largest_box(self, confidences, boxes):
        largest_area = 0
        largest_box_index = None

        for index, (confidence, box) in enumerate(zip(confidences, boxes)):
            if confidence < 0.2:
                continue

            area = self._get_area_from_box(box=box)

            if area > largest_area:
                largest_area = area
                largest_box_index = index

        return largest_box_index

    def get_box(self) -> list:
        results = self.YOLO_MODEL.predict(self.pil_image)
        index_of_target = self.find_largest_box(
            confidences=results[0].boxes.conf, boxes=results[0].boxes.xywh
        )
        return results[0].boxes.xyxy[index_of_target].tolist()

    def get_mask(self, box) -> list | ndarray:
        everything_results = self.SAM_MODEL.predict(
            source=self.pil_image,
            device=self.DEVICE,
            retina_masks=True,
            imgsz=1024,
            conf=0.4,
            iou=0.9,
        )
        prompt_process = FastSAMPrompt(
            image=self.pil_image, results=everything_results, device=self.DEVICE
        )

        return prompt_process.box_prompt(bbox=box)

    def convert_pil_img_to_bytes(self, pil_image: Image) -> bytes:
        buffer = BytesIO()
        pil_image.save(buffer, format="PNG")
        return buffer.getvalue()

    def _pil_image_from_nparray(self, array: ndarray) -> Image:
        return Image.fromarray(np.uint8(array))

    def apply_mask(self, mask) -> bytes:
        image_np = self._get_nparray_from_image(pil_image=self.pil_image)
        image_np[:, :, 3] = image_np[:, :, 3] * mask

        image_with_transparency = self._pil_image_from_nparray(array=image_np)

        return self.convert_pil_img_to_bytes(pil_image=image_with_transparency)

    def process_image(self) -> bytes:
        mask = self.get_mask(self.get_box())
        return self.apply_mask(mask)
