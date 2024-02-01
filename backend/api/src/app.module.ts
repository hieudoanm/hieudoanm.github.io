import { CountriesModule } from '@hieudoanm/modules/countries/countries.module';
import { HealthModule } from '@hieudoanm/modules/health/health.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

const rootPath: string = join(__dirname, '..', 'public');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    ServeStaticModule.forRoot({ rootPath }),
    HttpModule,
    CountriesModule,
    HealthModule,
  ],
})
export class AppModule {}
