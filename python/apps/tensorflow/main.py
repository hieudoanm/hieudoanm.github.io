from fastapi import FastAPI, responses
from json import load
from os import getenv
from pydantic import BaseModel
from uvicorn import run


class Language(BaseModel):
    cca2: str
    cca3: str
    name: str

languages_file_path : str = "./resources/json"
languages_dict_json_file = open(f"{languages_file_path}/dict/languages.json", "r")
languages_dict : dict[str, str] = load(languages_dict_json_file)
languages_list_json_file = open(f"{languages_file_path}/list/languages.json", "r")
languages_list : list[Language] = load(languages_list_json_file)


DEVELOPMENT : str = getenv('DEVELOPMENT') or 'true'
LOG_LEVEL : str = getenv('LOG_LEVEL') or 'debug'
PORT : str = getenv('PORT') or '8000'


app = FastAPI()


@app.get("/health", response_class=responses.JSONResponse, tags=["health"], name="health", operation_id="health")
def health() -> dict:
    return { "status": "OK" }


@app.get("/languages", response_class=responses.JSONResponse, tags=["languages"], name="languages", operation_id="languages")
def get_languages() -> dict:
    return languages_dict


class DetectRequestBody(BaseModel):
    text: str


@app.post("/detect", response_class=responses.JSONResponse, tags=["broca"], name="detect_language", operation_id="detect_language")
def detect_language(detect_request_body: DetectRequestBody) -> dict:
    text : str = detect_request_body.text
    return { "text": text }


if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port = int(PORT),
        log_level = LOG_LEVEL,
        reload = DEVELOPMENT == 'true',
    )
