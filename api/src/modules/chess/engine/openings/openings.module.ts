import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsRepository } from './openings.repository';
import { PrismaService } from '../../../../common/prisma/prisma.service';

@Module({
  controllers: [OpeningsController],
  providers: [PrismaService, OpeningsRepository],
})
export class OpeningsModule {}
