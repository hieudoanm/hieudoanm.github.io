import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { OpeningsController } from './openings.controller';
import { OpeningsRepository } from './openings.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [OpeningsController],
  providers: [PrismaPublicClient, OpeningsRepository],
})
export class OpeningsModule {}
