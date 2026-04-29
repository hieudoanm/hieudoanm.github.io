query-countries:
	uv run ./scripts/query-countries.py

query-passport:
	uv run playwright install firefox
	uv run ./scripts/query-passport-index.py

merge-countries:
	uv run ./scripts/merge-countries.py

build: query-countries query-passport merge-countries
	@echo "✅ DONE!"
