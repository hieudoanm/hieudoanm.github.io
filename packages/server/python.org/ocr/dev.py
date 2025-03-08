from uvicorn import run


run("main:app", host="127.0.0.1", port=8000, reload=True)
