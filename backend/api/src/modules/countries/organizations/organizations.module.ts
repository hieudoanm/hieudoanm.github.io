import { Module } from '@nestjs/common';
import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [],
  controllers: [OrganizationsController],
  providers: [PrismaService, OrganizationsService],
})
export class OrganizationsModule {}
