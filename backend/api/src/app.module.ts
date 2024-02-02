import { HealthModule } from '@hieudoanm/modules/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';
import { VietnamModule } from './modules/vietnam/vietnam.module';
import { OrganizationsModule } from './modules/organizations/organizations.module';

const rootPath: string = join(__dirname, '..', 'public');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    ServeStaticModule.forRoot({ rootPath }),
    HttpModule,
    HealthModule,
    OrganizationsModule,
    VietnamModule,
  ],
})
export class AppModule {}
