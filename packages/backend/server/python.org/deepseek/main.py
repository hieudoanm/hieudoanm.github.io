from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch


# Initialize FastAPI
app = FastAPI()


# Load the model and tokenizer
model_name = "deepseek-ai/deepseek-coder-1.3b"  # Most lightweight coder model
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    model_name, trust_remote_code=True, torch_dtype=torch.bfloat16
).cuda()


# Define request model
class CodeRequest(BaseModel):
    prompt: str
    max_length: int = 200


# API Endpoint
@app.post("/generate/")
async def generate_code(request: CodeRequest):
    inputs = tokenizer(request.prompt, return_tensors="pt").to("cuda")
    outputs = model.generate(**inputs, max_length=request.max_length)
    generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"generated_code": generated_text}


# Run with `uvicorn main:app --host 0.0.0.0 --port 8000`
