import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsRepository } from './openings.repository';
import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [CacheModule.register()],
  controllers: [OpeningsController],
  providers: [PrismaService, OpeningsRepository],
})
export class OpeningsModule {}
