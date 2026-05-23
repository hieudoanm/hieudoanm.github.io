.PHONY: build install clean package

build:
	pnpm run build

package: build
	pnpm vsce package --no-dependencies --allow-missing-repository

# Install into any found editor (VS Code, Cursor, Antigravity, etc.)
install: package
	@echo "=== Installing into editors ==="
	@EXT=$$(ls *.vsix 2>/dev/null | head -1); \
	if [ -z "$$EXT" ]; then echo "No .vsix found"; exit 1; fi; \
	for cmd in code cursor antigravity-ide; do \
		path=$$(command -v "$$cmd" 2>/dev/null || true); \
		if [ -n "$$path" ]; then \
			echo "  Installing via $$path --install-extension $$EXT"; \
			"$$cmd" --install-extension "$$EXT" 2>/dev/null && echo "    -> $$cmd: OK" || true; \
		else \
			bundle="/Applications/$$(echo $$cmd | sed 's/-//g' | sed 's/.*/\u&/').app"; \
			bin="$$bundle/Contents/Resources/app/bin/$$cmd"; \
			if [ -f "$$bin" ]; then \
				echo "  Installing via $$bin --install-extension $$EXT"; \
				"$$bin" --install-extension "$$EXT" 2>/dev/null && echo "    -> $$cmd (app bundle): OK" || true; \
			else \
				echo "  Skipping $$cmd (not found)"; \
			fi; \
		fi; \
	done
	rm -f *.vsix

clean:
	rm -rf dist node_modules *.vsix
