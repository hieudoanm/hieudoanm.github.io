import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [LanguagesController],
  providers: [PrismaService, LanguagesService],
})
export class LanguagesModule {}
