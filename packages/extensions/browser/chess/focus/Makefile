.PHONY: lint build zip xpi sign clean

EXTENSION_NAME := chess-focus
SOURCE_DIR := ./dist
ARTIFACTS_DIR := ./download

ZIP_FILE := $(ARTIFACTS_DIR)/$(EXTENSION_NAME).zip
XPI_FILE := $(ARTIFACTS_DIR)/$(EXTENSION_NAME).xpi

lint:
	pnpm web-ext lint --source-dir $(SOURCE_DIR)

build: zip xpi

zip:
	mkdir -p $(ARTIFACTS_DIR)
	cd $(SOURCE_DIR) && zip -r ../$(ZIP_FILE) .

xpi:
	mkdir -p $(ARTIFACTS_DIR)
	pnpm web-ext build \
		--source-dir $(SOURCE_DIR) \
		--artifacts-dir $(ARTIFACTS_DIR) \
		--filename $(EXTENSION_NAME).xpi \
		--overwrite-dest

sign:
	@read -p "Enter WEB_EXT_API_KEY (JWT issuer): " API_KEY; \
	read -s -p "Enter WEB_EXT_API_SECRET (JWT secret): " API_SECRET; \
	echo ""; \
	mkdir -p $(ARTIFACTS_DIR); \
	WEB_EXT_API_KEY="$$API_KEY" \
	WEB_EXT_API_SECRET="$$API_SECRET" \
	pnpm web-ext sign \
		--source-dir $(SOURCE_DIR) \
		--artifacts-dir $(ARTIFACTS_DIR) \
		--channel unlisted

clean:
	rm -rf $(ARTIFACTS_DIR)
