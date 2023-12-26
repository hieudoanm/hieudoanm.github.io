import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountriesDto, CurrenciesDto, LanguagesDto } from './countries.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('countries')
@Controller('countries')
@UseInterceptors(CacheInterceptor)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: CountriesDto,
    description: 'List of Countries',
  })
  async getCountries(): Promise<CountriesDto> {
    return this.countriesService.getCountries();
  }

  @Get('currencies')
  @ApiResponse({
    status: 200,
    type: CurrenciesDto,
    description: 'List of Currencies',
  })
  async getCurrencies(): Promise<CurrenciesDto> {
    return this.countriesService.getCurrencies();
  }

  @Get('languages')
  @ApiResponse({
    status: 200,
    type: LanguagesDto,
    description: 'List of Languages',
  })
  async getLanguages(): Promise<LanguagesDto> {
    return this.countriesService.getLanguages();
  }
}
