from uvicorn import run
from main import app


run("main:app", host="127.0.0.1", port=8000, reload=True)
