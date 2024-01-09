import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { TitledController } from './titled.controller';
import { TitledRepository } from './titled.repository';
import { TitledService } from './titled.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [TitledController],
  providers: [PrismaService, TitledRepository, TitledService],
})
export class TitledModule {}
