import { Module } from '@nestjs/common';
import { PrismaService } from '../../../../src/common/prisma/prisma.service';
import { VietnamController } from './vietnam.controller';
import { VietnamService } from './vietnam.service';

@Module({
  imports: [],
  controllers: [VietnamController],
  providers: [PrismaService, VietnamService],
})
export class VietnamModule {}
