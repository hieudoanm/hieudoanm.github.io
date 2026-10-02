PYTHON ?= python3

.DEFAULT_GOAL := all
.PHONY: all categorize rank dashboard help

all: categorize rank dashboard ## Build categories, rank projects, and refresh dashboard

categorize: ## Rebuild csv/projects_categories.csv from md/projects/
	$(PYTHON) scripts/categorize.py

rank: categorize ## Rebuild categories and regenerate csv/projects_rankings.csv
	$(PYTHON) scripts/rank.py

dashboard: rank ## Refresh reports/projects_dashboard.html
	$(PYTHON) scripts/dashboard.py

help: ## List available targets
	@printf '%s\n' \
	  'make              Build categories, rankings, and dashboard' \
	  'make categorize   Rebuild the categorized project CSV' \
	  'make rank         Rebuild the categorized and ranked project CSVs' \
	  'make dashboard    Rebuild rankings and the dashboard' \
	  'make help         Show this help'
