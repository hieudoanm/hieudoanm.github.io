import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersRepository } from './streamers.repository';

@Module({
  imports: [CacheModule.register()],
  controllers: [StreamersController],
  providers: [PrismaService, StreamersRepository],
})
export class StreamersModule {}
