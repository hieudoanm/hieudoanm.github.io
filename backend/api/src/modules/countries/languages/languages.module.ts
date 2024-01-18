import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [LanguagesController],
  providers: [PrismaService, LanguagesService],
})
export class LanguagesModule {}
