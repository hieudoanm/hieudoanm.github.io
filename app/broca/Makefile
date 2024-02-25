import-languages:
	yarn ts-node ./scripts/import/languages

import-news-sources:
	yarn ts-node ./scripts/import/news-sources --env-file=.env

import-quotes:
	yarn ts-node ./scripts/import/quotes

import-tarot-cards:
	yarn ts-node ./scripts/import/tarot-cards

import-words:
	yarn ts-node ./scripts/import/words-api
	yarn ts-node ./scripts/import/words-txt

import-words-api:
	yarn ts-node ./scripts/import/words-api

import-words-txt:
	yarn ts-node ./scripts/import/words-txt

tauri-dev:
	yarn tauri dev

tauri-build:
	BUILD_ENV="static" yarn tauri build

tauri-build-macos:
	BUILD_ENV="static" yarn tauri build --target universal-apple-darwin
