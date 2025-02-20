format:
	black .

check:
	ruff check .

lock:
	python3 -m pigar generate

dev:
	uvicorn main:app --host 127.0.0.1 --port 8000 --reload
