prisma-push:
	yarn prisma format
	yarn prisma generate
	yarn prisma db push

tauri-dev:
	yarn tauri dev

tauri-build:
	BUILD_ENV="static" yarn tauri build

import-symbols:
	yarn prisma format
	yarn prisma generate
	yarn ts-node ./scripts/import/stock/symbols.ts

import-history:
	yarn prisma format
	yarn prisma generate
	yarn ts-node ./scripts/import/stock/history.ts
