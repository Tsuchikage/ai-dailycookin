import os

from aiohttp import ClientSession


class TagsFetcher:
    GOOGLE_VISION_API_KEY = os.environ["GOOGLE_VISION_API_KEY"]

    def __init__(self, image_bytes: bytes):
        self.image_bytes = image_bytes
        self.session: ClientSession | None = None

    def _construct_payload(self) -> dict:
        return {
            "requests": [
                {
                    "image": {"content": self.image_bytes.decode("UTF-8")},
                    "features": [{"type": "LABEL_DETECTION"}],
                }
            ]
        }

    async def _ensure_session(self) -> None:
        if self.session is None:
            self.session = ClientSession()

    def _construct_url(self) -> str:
        return f"https://vision.googleapis.com/v1/images:annotate?key={self.GOOGLE_VISION_API_KEY}"

    async def get_tags(self) -> list | None:
        await self._ensure_session()
        async with (self.session.post(
            url=self._construct_url(), json=self._construct_payload()
        ) as resp):
            if resp.status != 200:
                return None
            data = await resp.json()
            tags = [
                tag["description"]
                for tag in data["responses"][0]["labelAnnotations"]
            ]
            return tags
