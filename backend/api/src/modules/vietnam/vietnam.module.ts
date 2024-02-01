import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.client';
import { Module } from '@nestjs/common';
import { VietnamController } from './vietnam.controller';
import { VietnamService } from './vietnam.service';

@Module({
  imports: [],
  controllers: [VietnamController],
  providers: [PrismaPublicClient, VietnamService],
})
export class VietnamModule {}
