import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@hieudoanm/generated/prisma/public/client';

@Injectable()
export class PrismaPublicClient extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
