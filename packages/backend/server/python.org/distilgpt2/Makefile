format:
	python3 -m black .

check:
	python3 -m ruff check .

dev:
	uvicorn main:app --host 0.0.0.0 --port 10000 --reload

build:
	docker build -t distilgpt2

start:
	uvicorn main:app --host 0.0.0.0 --port 10000
