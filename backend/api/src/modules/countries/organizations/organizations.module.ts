import { PrismaPublicClient } from '@hieudoanm/common/prisma/prisma.public';
import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [],
  controllers: [OrganizationsController],
  providers: [PrismaPublicClient, OrganizationsService],
})
export class OrganizationsModule {}
