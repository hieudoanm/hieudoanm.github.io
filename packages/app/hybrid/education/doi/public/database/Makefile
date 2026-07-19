PY := python3
MAIN := scripts/crawl.py
TO_CSV := scripts/to_csv.py
ANALYSE := scripts/analyse.py
VISUALISE := scripts/visualise.py
DB ?= doi.db
CSV_DIR := csv
IMG_DIR := images
DOI ?= 10.1038/nature12373
LEVEL ?= 0
QUERY ?=

.PHONY: help all crawl csv analyse visualise clean

help:
	@printf 'Usage: make [target] [DOI=10.x/xxx] [DB=doi.db] [LEVEL=0-10] [QUERY=term]\n\n'
	@printf 'Targets:\n'
	@printf '  all        crawl references from DOI into $(DB), then convert to csv/ and render images/\n'
	@printf '  crawl      crawl references from DOI (or store QUERY results when QUERY is set) into $(DB) at depth LEVEL\n'
	@printf '  csv        convert every *.db in this directory to csv/ using $(TO_CSV)\n'
	@printf '  analyse    print citation stats from $(DB) using $(ANALYSE), filtered by QUERY if set\n'
	@printf '  visualise  render citation links from $(DB) to $(IMG_DIR)/ using $(VISUALISE), filtered by QUERY if set\n'
	@printf '  clean      remove generated $(DB), $(CSV_DIR)/ and $(IMG_DIR)/ files\n'

all: crawl csv visualise

crawl:
	$(PY) $(MAIN) "$(if $(QUERY),$(QUERY),$(DOI))" $(if $(QUERY),-q,) -o $(DB) -l $(LEVEL)

csv:
	mkdir -p $(CSV_DIR)
	$(PY) $(TO_CSV) -o $(CSV_DIR) $(wildcard *.db)

analyse:
	$(PY) $(ANALYSE) -d $(DB) $(if $(QUERY),-q "$(QUERY)",)

visualise:
	$(PY) $(VISUALISE) -d $(DB) -o $(IMG_DIR) $(if $(QUERY),-q "$(QUERY)",)

clean:
	rm -f *.db
	rm -rf $(CSV_DIR)
	rm -rf $(IMG_DIR)
