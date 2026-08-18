.PHONY: build app dmg clean dev test

APP_NAME := Top
BUNDLE_ID := io.github.hieudoanm.Top
VERSION := 0.0.1

BUILD_DIR := build
APP_DIR := $(BUILD_DIR)/$(APP_NAME).app
CONTENTS_DIR := $(APP_DIR)/Contents
MACOS_DIR := $(CONTENTS_DIR)/MacOS
RESOURCES_DIR := $(CONTENTS_DIR)/Resources

SWIFT_BUILD_DIR := .build/arm64-apple-macosx/release
BINARY := $(SWIFT_BUILD_DIR)/$(APP_NAME)

DMG_NAME := $(APP_NAME)-$(VERSION).dmg
DMG_PATH := $(BUILD_DIR)/$(DMG_NAME)

build: $(BINARY)

$(BINARY):
	swift build -c release

app: build
	@echo "Creating $(APP_NAME).app bundle..."
	@mkdir -p $(MACOS_DIR)
	@mkdir -p $(RESOURCES_DIR)
	@cp $(BINARY) $(MACOS_DIR)/$(APP_NAME)
	@cp Resources/Info.plist $(CONTENTS_DIR)/Info.plist
	@codesign --force --sign - \
		--entitlements Resources/Top.entitlements \
		$(APP_DIR)
	@echo "$(APP_NAME).app created at $(APP_DIR)"

dmg: app
	@echo "Creating $(DMG_NAME)..."
	@mkdir -p $(BUILD_DIR)/dmg-staging
	@cp -R $(APP_DIR) $(BUILD_DIR)/dmg-staging/
	@ln -s /Applications $(BUILD_DIR)/dmg-staging/Applications
	@hdiutil create \
		-volname "$(APP_NAME)" \
		-srcfolder $(BUILD_DIR)/dmg-staging \
		-ov \
		-format UDZO \
		$(DMG_PATH)
	@rm -rf $(BUILD_DIR)/dmg-staging
	@echo "$(DMG_NAME) created at $(DMG_PATH)"

clean:
	@swift package clean
	@rm -rf $(BUILD_DIR)
	@echo "Cleaned."

test:
	swift test

dev:
	@echo "Starting $(APP_NAME) in dev mode..."
	@swift build -c debug && .build/debug/$(APP_NAME)
