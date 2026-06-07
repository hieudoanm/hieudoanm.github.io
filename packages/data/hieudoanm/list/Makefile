.PHONY: all convert query

all: query convert

convert:
	uv run scripts/convert.py

query:
	uv run scripts/query-chess-titles.py
	uv run scripts/query-emojis.py
	uv run scripts/query-palindrome.py
	uv run scripts/query-tlds.py
	uv run scripts/query-wordle.py
