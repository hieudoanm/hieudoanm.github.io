clean-build:
	docker build --no-cache -t broca .

build:
	docker build -t broca .

dev:
	uvicorn main:app --reload

freeze:
	python3 -m pigar generate

start:
	docker run -it broca
