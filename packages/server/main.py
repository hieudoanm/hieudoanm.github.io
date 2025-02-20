from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel


app = FastAPI(
    title="Nothing",
    description="Nothing Server",
    docs_url="/swagger",
    redoc_url="/",
)


# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")


class HealthResponse(BaseModel):
    status: str


@app.get(
    "/heath",
    name="Health",
    summary="Health",
    description="Health Check",
    tags=["Health"],
    response_model=HealthResponse,
)
def health():
    return {"status": "OK"}


class OCRResponse(BaseModel):
    routes: list[str]


@app.get(
    "/ocr",
    name="OCR",
    summary="OCR",
    description="Optical Character Recognition",
    tags=["OCR"],
    response_model=OCRResponse,
)
def ocr():
    return {"routes": ["vietnam/license/plates"]}


class OCRVietnamLicensePlatesResponse(BaseModel):
    text: str


@app.post(
    "/ocr/vietnam/license/plates",
    name="OCR - Vietnam - License Plates",
    summary="OCR - Vietnam - License Plates",
    description="Optical Character Recognition - Vietnam - License Plates",
    tags=["OCR"],
    response_model=OCRVietnamLicensePlatesResponse,
)
def ocr_vietnam_license_plates():
    return {"text": "29A-12345"}
