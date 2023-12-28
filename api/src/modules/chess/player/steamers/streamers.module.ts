import { Module } from '@nestjs/common';
import { StreamersController } from './streamers.controller';
import { StreamersRepository } from './streamers.repository';
import { PrismaService } from '../../../../common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [StreamersController],
  providers: [PrismaService, StreamersRepository],
})
export class StreamersModule {}
