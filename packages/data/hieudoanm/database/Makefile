.PHONY: all convert query

all: query convert

convert:
	uv run scripts/convert.py

query:
	uv run scripts/query-chess-openings.py
	uv run scripts/query-quotes.py
	uv run scripts/query-timezones.py
	uv run scripts/query-visas.py
