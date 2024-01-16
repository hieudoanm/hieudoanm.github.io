import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { GitHubController } from './github.controller';
import { GitHubService } from './github.service';

@Module({
  imports: [CacheModule.register()],
  controllers: [GitHubController],
  providers: [PrismaService, GitHubService],
})
export class GitHubModule {}
