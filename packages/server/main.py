from fastapi import FastAPI, UploadFile, File
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from os import makedirs, path
from pydantic import BaseModel
from shutil import copyfileobj, disk_usage
from easyocr import Reader
from psutil import virtual_memory


ocrReader = Reader(
    ["en"], model_storage_directory="models", detector=True, recognizer=True, gpu=False
)

app = FastAPI(
    title="Nothing",
    description="Nothing Server",
    docs_url="/swagger",
    redoc_url="/",
)


UPLOAD_DIR = "uploads"
makedirs(UPLOAD_DIR, exist_ok=True)  # Ensure the uploads directory exists


# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")


class HealthResponse(BaseModel):
    status: str
    disk_memory: dict[str, int]
    virtual_memory: dict[str, int]


@app.get(
    "/health",
    name="Health",
    summary="Health",
    description="Health Check",
    tags=["Health"],
    response_model=HealthResponse,
)
def health():
    memory = virtual_memory()
    total, used, free = disk_usage("/")
    return JSONResponse(
        content={
            "status": "OK",
            "disk_memory": {
                "total_gb": round(total / (1024**3), 2),  # Convert to GB
                "used_gb": round(used / (1024**3), 2),
                "free_gb": round(free / (1024**3), 2),
                "percent_used": round((used / total) * 100, 2),
            },
            "virtual_memory": {
                "total": memory.total // (1024 * 1024),  # Convert to MB
                "used": memory.used // (1024 * 1024),
                "free": memory.available // (1024 * 1024),
                "percent": memory.percent,
            },
        }
    )


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
    message: str
    file_name: str
    text: str


@app.post(
    "/ocr/vietnam/license/plates",
    name="OCR - Vietnam - License Plates",
    summary="OCR - Vietnam - License Plates",
    description="Optical Character Recognition - Vietnam - License Plates",
    tags=["OCR"],
    response_model=OCRVietnamLicensePlatesResponse,
)
def ocr_vietnam_license_plates(file: UploadFile = File(...)):
    print("filename", file.filename)
    file_path = path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        copyfileobj(file.file, buffer)

    result: list[str] = ocrReader.readtext(file_path, detail=0)

    return JSONResponse(
        content={
            "file_name": file.filename,
            "message": "File uploaded successfully",
            "text": "".join(result),
        }
    )
