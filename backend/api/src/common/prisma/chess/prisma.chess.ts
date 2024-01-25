import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@hieudoanm/generated/prisma/chess/client';

@Injectable()
export class PrismaChessClient extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
