import { StatusClient } from '@hieudoanm/common/clients/apis/status/status.client';
import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { LinusController } from './linus.controller';
import { LinusService } from './linus.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [LinusController],
  providers: [PrismaPublicClient, StatusClient, LinusService],
})
export class LinusModule {}
