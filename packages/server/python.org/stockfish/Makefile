format:
	black .

build:
	docker build --tag stockfish-api .

start:
	docker stop stockfish-api
	docker rm -f stockfish-api
	docker run -p 8000:8000 --name stockfish-api stockfish-api
