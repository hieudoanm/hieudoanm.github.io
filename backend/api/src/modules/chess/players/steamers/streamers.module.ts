import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersRepository } from './streamers.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamersController],
  providers: [PrismaPublicClient, StreamersRepository],
})
export class StreamersModule {}
