from fastapi import FastAPI, HTTPException, responses
from g4f.client import Client
from os import getenv
from pydantic import BaseModel
from uvicorn import run


def get_env(key: str, default_value: str):
    if getenv(key) is None:
        return default_value
    return getenv(key)


DEVELOPMENT = get_env("DEVELOPMENT", "true")
print("DEVELOPMENT", DEVELOPMENT)


client = Client()


app = FastAPI(
    title="Free GPT",
    summary="Free GPT with LangChain",
    description="Free GPT with LangChain",
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
    content: str


@app.post(
    "/process",
    response_class=responses.JSONResponse,
    operation_id="process",
    tags=["GPT"],
)
async def process(request_body: RequestBody):
    try:
        content: str = request_body.content
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": content}],
        )
        return response
    except HTTPException as http_error:
        raise http_error
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")


if __name__ == "__main__":
    run(
        "main:app",
        host="0.0.0.0",
        port=8127,
        reload=DEVELOPMENT == "true",
        loop="asyncio",
    )
