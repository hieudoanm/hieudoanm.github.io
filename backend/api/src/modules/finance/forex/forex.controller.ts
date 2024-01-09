import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ForexService } from './forex.service';
import { RatesRequestQueryDto, RatesResponseDto } from './forex.dto';

@ApiTags('forex')
@Controller({ version: '1', path: 'forex' })
@UseInterceptors(CacheInterceptor)
export class ForexController {
  constructor(private readonly forexService: ForexService) {}

  @Get('rates')
  @ApiQuery({
    name: 'amount',
    type: Number,
    description: 'Amount',
    required: false,
  })
  @ApiQuery({
    name: 'base',
    type: String,
    description: 'Base',
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: RatesResponseDto,
    description: 'List of Forex Rates',
  })
  async getRates(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    { amount = 1, base = 'EUR' }: RatesRequestQueryDto
  ): Promise<RatesResponseDto> {
    return this.forexService.getRates({ amount, base });
  }
}
