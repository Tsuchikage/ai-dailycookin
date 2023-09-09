from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers import image_router

app = FastAPI(title="ITMO AI HACK BACKEND", docs_url="/api/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

app.include_router(image_router, prefix="/api")
