import os

import openai


class ImageDescriptionFetcher:
    OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
    DEFAULT_PROMPT = "create most possible short product description for marketplace using this annotation and translate it to russian. The answer must contain only text of description in russian."

    def __init__(self, tags: list[str]):
        self.tags = tags

    async def get_description(self) -> str:
        tags_str = ", ".join(self.tags)
        content = f"{self.DEFAULT_PROMPT}\n{tags_str}"
        response = await openai.ChatCompletion.acreate(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional writer of product descriptions on marketplaces.",
                },
                {"role": "user", "content": content},
            ],
        )

        return response["choices"][0]["message"]["content"]
