# Development tasks for the MRI pipeline.
#
# Run `make install` once after cloning, then `make check` before committing.

VENV    := .venv
PY      := $(VENV)/bin/python
RUFF    := $(VENV)/bin/ruff
PYRIGHT := $(VENV)/bin/pyright

.PHONY: install lint typecheck test check doctor demo clean

## install: create the venv and install runtime + dev dependencies
install:
	uv sync --dev

## lint: style and unused-code checks
lint:
	$(RUFF) check .

## typecheck: pyright in strict mode
typecheck:
	$(PYRIGHT)

## test: the pytest suite
test:
	$(PY) -m pytest -q

## check: everything CI should run
check: lint typecheck test

## doctor: report interpreter, device and path status
doctor:
	$(PY) -m pipeline doctor

## demo: build a synthetic cohort and run the dev config end to end
demo:
	$(PY) -m pipeline data cohort --participants data/synthetic/participants.tsv
	$(PY) -m pipeline run --config configs/dev.yaml --output-dir runs/

## clean: remove caches and bytecode
clean:
	rm -rf .pytest_cache .ruff_cache .coverage htmlcov
	find . -type d -name '__pycache__' -prune -exec rm -rf {} +
