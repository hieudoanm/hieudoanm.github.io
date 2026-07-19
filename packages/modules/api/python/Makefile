format:
	uv run ruff format .

lint:
	uv run ruff check .

test:
	PYTHONPATH=src uv run pytest tests/ -q

all: format lint test
