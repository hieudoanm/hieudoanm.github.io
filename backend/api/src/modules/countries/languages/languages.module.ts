import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { LanguagesController } from './languages.controller';
import { LanguagesService } from './languages.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [LanguagesController],
  providers: [PrismaPublicClient, LanguagesService],
})
export class LanguagesModule {}
