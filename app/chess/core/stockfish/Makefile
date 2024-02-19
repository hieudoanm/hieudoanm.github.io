clean-build:
	docker build --no-cache -t stockfish .

build:
	docker build -t stockfish .

dev:
	uvicorn main:app --reload

freeze:
	python3 -m pigar generate

start:
	docker run -it stockfish

get-chess-openings:
	python3 ./scripts/chess/openings.py

get-chess960-setup:
	python3 ./scripts/chess960/setup.py
