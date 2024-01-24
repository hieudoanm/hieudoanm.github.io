import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { ForexModule } from './forex/forex.module';

@Module({
  imports: [CryptoModule, ForexModule],
})
export class FinanceModule {}
