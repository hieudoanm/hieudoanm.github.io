import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { GoogleResponseDto, NewsSourcesDto } from './news.dto';
import { API_KEY_NEWS } from '../../common/environments/environments';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);

  constructor(private readonly httpService: HttpService) {}

  async getGoogle(): Promise<GoogleResponseDto> {
    const url: string =
      'https://trends.google.com/trends/hottrends/visualize/internal/data';
    const response =
      await this.httpService.axiosRef.get<Record<string, string[]>>(url);
    const { data } = response;
    const countryKeys = Object.keys(data);
    const countries = countryKeys.map((countryKey: string) => {
      const queries: string[] = data[countryKey];
      queries.sort((a, b) => (a > b ? 1 : -1));
      const country: string = countryKey.replaceAll('_', ' ');
      return { country, queries };
    });
    const total = countries.length;
    return { total, countries };
  }

  async getSources(): Promise<NewsSourcesDto> {
    try {
      const url: string = `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY_NEWS}`;
      this.logger.log(`getSources url=${url}`);
      const response = await this.httpService.axiosRef.get<NewsSourcesDto>(url);
      const { data } = response;
      const { sources } = data;
      const total = sources.length;
      return { total, sources };
    } catch (error) {
      this.logger.error(`getSources error=${error}`);
      return { total: 0, sources: [] };
    }
  }
}
