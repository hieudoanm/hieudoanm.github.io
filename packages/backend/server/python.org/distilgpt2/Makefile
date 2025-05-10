format:
	python3 -m black .

check:
	python3 -m ruff check .

dev:
	uvicorn main:app --host 0.0.0.0 --port 10000 --reload

start:
	uvicorn main:app --host 0.0.0.0 --port 10000

docker-build:
	docker build -t distilgpt2 .

docker-run:
	docker run -p 10000:10000 distilgpt2

lock:
	python3 -m pigar generate
