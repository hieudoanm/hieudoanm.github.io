import { Module } from '@nestjs/common';
import { OpeningsModule } from './openings/openings.module';

@Module({
  imports: [OpeningsModule],
})
export class EngineModule {}
