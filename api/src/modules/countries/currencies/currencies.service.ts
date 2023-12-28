import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CurrenciesResponseDto } from './currencies.dto';

@Injectable()
export class CurrenciesService {
  private readonly logger = new Logger(CurrenciesService.name);

  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getCurrencies(): Promise<CurrenciesResponseDto> {
    this.logger.log('getCurrencies');
    const currencies = await this.prismaService.currency.findMany({
      include: { countries: true },
    });
    const total = currencies.length;
    return { total, currencies };
  }
}
