import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GoogleResponseDto } from './news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly httpService: HttpService) {}

  async getGoogle(): Promise<GoogleResponseDto> {
    const url: string =
      'https://trends.google.com/trends/hottrends/visualize/internal/data';
    const response = await this.httpService.axiosRef.get<
      Record<string, string[]>
    >(url);
    const { data } = response;
    const countryKeys = Object.keys(data);
    const countries = countryKeys.map((countryKey: string) => {
      const queries: string[] = data[countryKey].sort();
      const country: string = countryKey.replaceAll('_', ' ');
      return { country, queries };
    });
    const total = countries.length;
    return { total, countries };
  }
}
