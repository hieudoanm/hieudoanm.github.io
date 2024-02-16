clean-build:
	docker build --no-cache -t stockfish .

build:
	docker build -t stockfish .

dev:
	uvicorn main:app --reload

freeze:
	python3.12 -m pigar generate

start:
	docker run -it stockfish
