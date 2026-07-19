PYTHON ?= python3
PUBLIC ?= public
DB ?= $(PUBLIC)/research.sqlite
PORT ?= 8000

.DEFAULT_GOAL := all
.PHONY: all build ingest rank dashboard og verify-js smoke-js check query reset serve help

all: build ## Rebuild the store, rankings, exports and dashboard

build: ## Full pipeline: store, scores, CSV exports and dashboard
	$(PYTHON) scripts/build.py

ingest: ## Load taxonomy, supervisors and projects into the store
	$(PYTHON) scripts/ingest.py

rank: ## Reload configuration, rescore and rewrite the CSV exports
	$(PYTHON) scripts/runs.py

dashboard: ## Rebuild only the dashboard from the latest run
	$(PYTHON) scripts/dashboard.py

og: ## Rebuild only the Open Graph preview card from the store
	$(PYTHON) scripts/og_image.py

verify-js: dashboard ## Check the browser scorer still matches the Python scores
	$(PYTHON) scripts/verify_js.py

smoke-js: dashboard ## Drive the built dashboard in a real DOM (needs jsdom)
	node scripts/ui_smoke.js

check: verify-js smoke-js ## Verify scoring parity and the interactive dashboard

query: ## Open the store for ad-hoc analysis
	sqlite3 -header -column $(DB)

serve: ## Preview public/ locally, the way GitHub Pages will serve it
	@echo "Serving $(PUBLIC)/ at http://localhost:$(PORT)/"
	@cd $(PUBLIC) && $(PYTHON) -m http.server $(PORT)

reset: ## Delete the store and dashboard so the next build starts from scratch
	rm -f $(DB) $(PUBLIC)/index.html $(PUBLIC)/styles.css $(PUBLIC)/scripts.js \
	      $(PUBLIC)/og.svg $(PUBLIC)/og.png

help: ## List available targets
	@printf '%s\n' \
	  'make              Rebuild the store, rankings, exports and dashboard' \
	  'make ingest       Load taxonomy, supervisors and projects into the store' \
	  'make rank         Reload configuration and rescore' \
	  'make dashboard    Rebuild the dashboard from the latest run' \
	  'make og           Rebuild only the Open Graph preview card' \
	  'make verify-js    Check the browser scorer matches the Python scores' \
	  'make smoke-js     Drive the dashboard in a real DOM (needs jsdom)' \
	  'make check        Verify scoring parity and the interactive dashboard' \
	  'make query        Open the store for ad-hoc analysis' \
	  'make serve        Preview public/ at http://localhost:$(PORT)/' \
	  'make reset        Delete the store and dashboard' \
	  'make help         Show this help'
