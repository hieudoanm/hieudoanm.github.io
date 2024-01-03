import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../src/common/prisma/prisma.service';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [GitHubController],
  providers: [PrismaService, GitHubService],
})
export class GitHubModule {}
