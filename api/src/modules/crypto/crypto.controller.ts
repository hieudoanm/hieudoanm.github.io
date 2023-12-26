import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { CoinsResponseDto } from './crypto.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('crypto')
@Controller('crypto')
@UseInterceptors(CacheInterceptor)
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('coins')
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
