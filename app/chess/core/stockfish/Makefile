build:
	docker build --no-cache -t stockfish .

dev:
	uvicorn main:app --reload

freeze:
	python3.11 -m pigar generate

start:
	docker run -it stockfish
