import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { CountriesResponseDto, CountryResponseDto } from './countries.dto';

@Controller('countries')
@ApiTags('Chess')
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
