import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CryptoService } from './crypto.service';
import { CoinsResponseDto } from './crypto.dto';

@ApiTags('crypto')
@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Get('coins')
  @ApiResponse({ status: 200, type: CoinsResponseDto })
  async getCountries(
    @Query('limit') limit: number = 100
  ): Promise<CoinsResponseDto> {
    return this.cryptoService.getCoins({ limit });
  }
}
