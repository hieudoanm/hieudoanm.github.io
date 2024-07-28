from io import BufferedReader
from os import getenv
from pickle import load
from fastapi import FastAPI, HTTPException, responses
from pydantic import BaseModel
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.preprocessing import LabelEncoder
from uvicorn import run


def get_env_by_key(key: str, default: str) -> str:
    return getenv(key) or default


PORT: str = get_env_by_key("PORT", "8080")


count_vectorizer_file: BufferedReader = open("models/vector.pkl", "rb")
count_vectorizer: CountVectorizer = load(count_vectorizer_file)
model_file: BufferedReader = open("models/model.pkl", "rb")
model: MultinomialNB = load(model_file)
label_encoder_file: BufferedReader = open("models/label.pkl", "rb")
label_encoder: LabelEncoder = load(label_encoder_file)


def predict_languages(text: str):
    x = count_vectorizer.transform([text]).toarray()
    lang = model.predict(x)
    lang = label_encoder.inverse_transform(lang)
    return lang


def get_env(key: str, default_value: str):
    if getenv(key) is None:
        return default_value
    return getenv(key)


DEVELOPMENT = get_env("DEVELOPMENT", "true")
print("DEVELOPMENT", DEVELOPMENT)

app = FastAPI(
    title="Languages Detection API",
    summary="Free Languages Detection API",
    description="Free Languages Detection API",
    version="0.0.1",
    contact={
        "name": "Hieu Doan",
        "url": "https://hieudoanm.github.io",
        "email": "hieumdoan@gmail.com",
    },
    license_info={
        "name": "GNU General Public License",
        "url": "https://www.gnu.org/licenses/gpl-3.0.html",
    },
    redoc_url="/",
    docs_url="/swagger",
)


class HealthResponse(BaseModel):
    status: str


@app.get(
    path="/health",
    operation_id="get_health",
    response_class=responses.JSONResponse,
    tags=["Health"],
)
async def get_health() -> HealthResponse:
    health_response = HealthResponse(status="OK")
    return health_response


class RequestBody(BaseModel):
    text: str


@app.post(
    "/predict",
    response_class=responses.JSONResponse,
    operation_id="predict",
    tags=["GPT"],
)
async def predict(request_body: RequestBody):
    try:
        text: str = request_body.text
        languages = predict_languages(text)
        return {"language": languages[0]}
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=int(PORT),
        reload=DEVELOPMENT == "true",
        loop="asyncio",
    )
