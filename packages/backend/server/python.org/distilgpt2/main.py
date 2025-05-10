from fastapi import FastAPI
from fastapi.responses import FileResponse
from pydantic import BaseModel
import requests
import socket
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


app = FastAPI(
    title="Free DistilGPT2 API",
    description="Free DistilGPT2 API",
    version="0.0.1",
    docs_url="/swagger",
    redoc_url="/",
    openapi_url="/openapi.json",
)


# Load model and tokenizer
MODEL_NAME = "distilgpt2"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForCausalLM.from_pretrained(MODEL_NAME)


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("favicon.ico")


class HealthResponse(BaseModel):
    status: str


@app.get("/api/health")
def health() -> HealthResponse:
    response = HealthResponse(status="OK")
    return response


class GenerateData(BaseModel):
    prompt: str
    max_new_tokens: int = 50
    temperature: float = 1.0


class GenerateResponse(BaseModel):
    generated: str


@app.post("/api/chat/completions")
async def generate(data: GenerateData) -> GenerateResponse:
    prompt = data.prompt
    max_tokens = data.max_new_tokens
    temperature = data.temperature
    inputs = tokenizer(prompt, return_tensors="pt")
    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=max_tokens,
            temperature=temperature,
            do_sample=True,
            top_p=0.95,
            top_k=50,
        )
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return GenerateResponse(generated=result)


def get_public_ip():
    try:
        ip = requests.get("https://api.ipify.org").text
        return ip
    except requests.RequestException:
        return ""


def get_local_ip():
    try:
        # This doesn't need internet—just a trick to get your LAN IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "Unable to retrieve local IP"


print("Public IP :", f"http://{get_public_ip()}:10000")
print("Local IP  :", f"http://{get_local_ip()}:10000")
