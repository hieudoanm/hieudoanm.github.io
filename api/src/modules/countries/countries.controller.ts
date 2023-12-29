import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountryDto } from '../../../src/generated/country.entity';
import {
  CountriesRequestQueryDto,
  CountriesResponseDto,
  CurrenciesResponseDto,
} from './countries.dto';
import { CountriesService } from './countries.service';
import { Region } from '@prisma/client';

@ApiTags('countries')
@Controller('countries')
@UseInterceptors(CacheInterceptor)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    description: 'Name',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'capital',
    description: 'Capital',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'unMember',
    description: 'United Nation Member',
    type: Boolean,
    required: false,
  })
  @ApiQuery({
    name: 'region',
    description: 'Region',
    enum: Region,
    required: false,
  })
  @ApiQuery({
    name: 'subregion',
    description: 'Subregion',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'currency',
    description: 'Currency',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'language',
    type: String,
    description: 'Language',
    required: false,
  })
  @ApiQuery({
    name: 'timezone',
    description: 'Timezone',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: 200,
    type: CountriesResponseDto,
    description: 'List of Countries',
  })
  async getCountries(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      })
    )
    { name, unMember, region, subregion, timezone }: CountriesRequestQueryDto
  ): Promise<CountriesResponseDto> {
    return this.countriesService.getCountries({
      name,
      unMember,
      region,
      subregion,
      timezone,
    });
  }

  @Get(':code')
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    type: CountryDto,
    description: 'Get Country by Code',
  })
  async getCountry(@Param('code') code: string): Promise<CountryDto> {
    return this.countriesService.getCountry(code);
  }

  @Get('currencies')
  @ApiResponse({
    status: 200,
    type: CurrenciesResponseDto,
    description: 'List of Currencies',
  })
  async getCurrencies(): Promise<CurrenciesResponseDto> {
    return this.countriesService.getCurrencies();
  }
}
