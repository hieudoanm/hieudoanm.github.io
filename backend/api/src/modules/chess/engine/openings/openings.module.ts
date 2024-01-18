import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsRepository } from './openings.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [OpeningsController],
  providers: [PrismaService, OpeningsRepository],
})
export class OpeningsModule {}
