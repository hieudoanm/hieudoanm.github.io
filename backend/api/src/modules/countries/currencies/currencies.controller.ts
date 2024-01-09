import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrenciesResponseDto } from './currencies.dto';
import { CurrenciesService } from './currencies.service';

@ApiTags('currencies')
@Controller({ version: '1', path: 'currencies' })
@UseInterceptors(CacheInterceptor)
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: CurrenciesResponseDto,
    description: 'List of Currencies',
  })
  async getCurrencies(): Promise<CurrenciesResponseDto> {
    return this.currenciesService.getCurrencies();
  }
}
