import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesService } from './countries.service';
import { CountriesDto, CurrenciesDto, LanguagesDto } from './countries.dto';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiResponse({ status: 200, type: CountriesDto })
  async getCountries(): Promise<CountriesDto> {
    return this.countriesService.getCountries();
  }

  @Get('currencies')
  @ApiResponse({ status: 200, type: CurrenciesDto })
  async getCurrencies(): Promise<CurrenciesDto> {
    return this.countriesService.getCurrencies();
  }

  @Get('languages')
  @ApiResponse({ status: 200, type: LanguagesDto })
  async getLanguages(): Promise<LanguagesDto> {
    return this.countriesService.getLanguages();
  }
}
