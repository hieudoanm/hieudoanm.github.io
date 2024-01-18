import { PrismaService } from '@hieudoanm/common/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [],
  controllers: [OrganizationsController],
  providers: [PrismaService, OrganizationsService],
})
export class OrganizationsModule {}
