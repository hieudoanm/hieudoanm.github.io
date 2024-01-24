import { PrismaPublicClient } from '@hieudoanm/common/prisma/public/prisma.public';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [GitHubController],
  providers: [PrismaPublicClient, GitHubService],
})
export class GitHubModule {}
