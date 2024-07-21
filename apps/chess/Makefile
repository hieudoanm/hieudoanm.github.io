export-countries:
	yarn ts-node ./scripts/export/countries

import-countries:
	yarn ts-node ./scripts/import/countries

import-games-api:
	yarn ts-node ./scripts/import/games-api

import-games-database:
	yarn ts-node ./scripts/import/games-database

import-missing:
	yarn ts-node ./scripts/import/missing

import-openings:
	yarn ts-node ./scripts/import/openings

import-pgn:
	yarn ts-node ./scripts/import/pgn

import-players:
	yarn ts-node ./scripts/import/players

import-titles:
	yarn ts-node ./scripts/import/titles

prisma-generate:
	yarn prisma format
	yarn prisma generate

prisma-push:
	yarn prisma format
	yarn prisma generate
	yarn prisma db push

prisma-migrate:
	yarn prisma format
	yarn prisma generate
	yarn prisma migrate dev --name init

tauri-dev:
	yarn tauri dev

tauri-build:
	BUILD_ENV="static" yarn tauri build

tauri-build-macos:
	BUILD_ENV="static" yarn tauri build --target universal-apple-darwin
