import { CacheInterceptor } from '@nestjs/cache-manager';
import { Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesResponseDto, CountryResponseDto } from './countries.dto';
import { CountriesService } from './countries.service';

@ApiTags('chess')
@Controller({ version: '1', path: 'chess/countries' })
@UseInterceptors(CacheInterceptor)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiResponse({ status: 200, type: CountryResponseDto })
  async getCountries(
    @Query('cache') cache: boolean = true
  ): Promise<CountryResponseDto[]> {
    return this.countriesService.getCountries({ cache });
  }

  @Get(':code')
  @ApiResponse({ status: 200, type: CountriesResponseDto })
  async getTitledPlayersByCountry(
    @Param('code') code: string,
    @Query('cache') cache: boolean = true
  ): Promise<CountriesResponseDto> {
    return this.countriesService.getTitledPlayersByCountry({ cache, code });
  }
}
