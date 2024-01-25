prisma-generate:
	prisma generate --schema prisma/chess/schema.prisma
	prisma generate --schema prisma/public/schema.prisma

prisma-chess-init:
	prisma format --schema prisma/chess/schema.prisma
	prisma generate --schema prisma/chess/schema.prisma
	prisma migrate dev --name init --schema prisma/chess/schema.prisma

prisma-public-init:
	prisma format --schema prisma/public/schema.prisma
	prisma generate --schema prisma/public/schema.prisma
	prisma migrate dev --name init --schema prisma/public/schema.prisma
