dev:
	python3 main.py

format:
	black main.py

lint:
	pylint main.py

lock:
	pipenv lock

install:
	python3 -m pip install --no-cache-dir --upgrade -r requirements.txt
	python3 -m pigar generate

docker-build:
	docker build -t languagesdetectionapi .
