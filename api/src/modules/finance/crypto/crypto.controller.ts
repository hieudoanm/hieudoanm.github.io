import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoinsResponseDto } from './crypto.dto';
import { CryptoService } from './crypto.service';

@ApiTags('crypto')
@Controller('crypto')
@UseInterceptors(CacheInterceptor)
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('coins')
  @ApiQuery({ name: 'limit', type: Number })
  @ApiResponse({
    status: 200,
    type: CoinsResponseDto,
    description: 'List of Crypto Coins',
  })
  async getCountries(
    @Query('limit') limit: number = 100
  ): Promise<CoinsResponseDto> {
    return this.cryptoService.getCoins({ limit });
  }
}
