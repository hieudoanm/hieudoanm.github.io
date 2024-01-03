import { Module } from '@nestjs/common';
import { TitledController } from './titled.controller';
import { TitledRepository } from './titled.repository';
import { TitledService } from './titled.service';
import { PrismaService } from '../../../common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [TitledController],
  providers: [PrismaService, TitledRepository, TitledService],
})
export class TitledModule {}
