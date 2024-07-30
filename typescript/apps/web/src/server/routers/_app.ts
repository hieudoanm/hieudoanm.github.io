import { Title, Variant, TimeClass } from '@prisma/client';
import { getCoins, Tag } from '@web/clients/coinranking/coinranking.client';
import { Coin } from '@web/clients/coinranking/coinranking.dto';
import { getLatest } from '@web/clients/forex/frankfurter/frankfurter.client';
import { FrankfurterLatestResponse } from '@web/clients/forex/frankfurter/frankfurter.dto';
import { getTrends } from '@web/clients/google/google.client';
import { getTopHeadlines } from '@web/clients/news/news.client';
import { Article } from '@web/clients/news/news.dto';
import { Category, Country } from '@web/clients/news/news.enums';
import { LANGUAGES_API } from '@web/constants/languages.constants';
import { logger } from '@web/log';
import {
  Days,
  getInsights,
  getTitled,
} from '@web/services/chess/chess.service';
import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { procedure, router } from '../trpc';
import { Insights } from '@web/services/chess/chess.model';

export type Result = {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
  derivation: string[];
};

export type Weather = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    weather_code: string;
  };
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weather_code: number;
  };
};

const weatherCodes: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing Rime Fog',
  51: 'Light Drizzle',
  53: 'Moderate Drizzle',
  55: 'Dense Intensity Drizzle',
  56: 'Light Freezing Drizzle',
  57: 'Dense Intensity Freezing Drizzle',
  61: 'Slight Rain',
  63: 'Moderate Rain',
  65: 'Heavy Intensity Rain',
  66: 'Light Freezing Rain',
  67: 'Heavy Intensity Freezing Rain',
  71: 'Slight Snow Fall',
  73: 'Moderate Snow Fall',
  75: 'Heavy Intensity Snow Fall',
  77: 'Snow grains',
  80: 'Slight Rain Showers',
  81: 'Moderate Rain Showers',
  82: 'Violent Rain Showers',
  85: 'Slight Snow showers',
  86: 'Heavy Snow Showers',
  95: 'Thunderstorm',
  96: 'Slight Thunderstorm',
  99: 'Heavy Thunderstorm',
};

export const appRouter = router({
  chess: {
    titled: procedure
      .input(
        z.object({
          days: z.number().int().optional(),
          title: z.nativeEnum(Title).optional(),
          countryCode: z.string().optional(),
        })
      )
      .query(async (options) => {
        const days: Days | undefined = options.input.days as Days | undefined;
        const title: Title | undefined = options.input.title;
        const countryCode: string | undefined = options.input.countryCode;
        const titled = await getTitled({ days, title, countryCode });
        return titled;
      }),
    insights: procedure
      .input(
        z.object({
          username: z.string(),
          variant: z.nativeEnum(Variant),
          timeClass: z.nativeEnum(TimeClass),
        })
      )
      .query(async (options): Promise<Insights> => {
        const timeClass: TimeClass = options.input.timeClass;
        const username: string = options.input.username;
        const variant: Variant = options.input.variant;
        const insights = await getInsights({
          username,
          variant,
          timeClass,
          rated: true,
        });
        return insights;
      }),
  },
  countries: procedure.query(async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const { data: countries } = await axios.get<{
      name: { common: string; official: string };
      cca2: string;
      cca3: string;
      flag: string;
      region: string;
      subregion: string;
      unMember: boolean;
    }>(url);
    return countries;
  }),
  crypto: procedure
    .input(
      z.object({
        tag: z.nativeEnum(Tag).optional().default(Tag.LAYER_1),
      })
    )
    .query(async (options): Promise<Coin[]> => {
      const tag: Tag = options.input.tag;
      const {
        data: { coins = [] },
      } = await getCoins({ tag });
      return coins;
    }),
  forex: procedure
    .input(
      z.object({
        amount: z.number().int().optional().default(1),
        base: z.string().optional().default('EUR'),
      })
    )
    .query((options): Promise<FrankfurterLatestResponse> => {
      const amount: number = options.input.amount;
      const base: string = options.input.base;
      return getLatest({ amount, base });
    }),
  languages: router({
    health: procedure.query(async () => {
      try {
        const headers = { 'Content-Type': 'application/json' };
        const url = `${LANGUAGES_API}/health`;
        const {
          data: { status },
        } = await axios.get<{ status: string }>(url, { headers });
        return { status };
      } catch (error) {
        if (error instanceof AxiosError) {
          logger.error(error.cause ?? error.message);
        } else {
          logger.error(error);
        }
        return { status: 'ERROR' };
      }
    }),
    predict: procedure
      .input(
        z.object({
          text: z.string().default(''),
        })
      )
      .mutation(async (options): Promise<{ language: string }> => {
        try {
          const text: string = options.input.text;
          const url: string = `${LANGUAGES_API}/predict`;
          const {
            data: { language },
          } = await axios.post<{ language: string }>(
            url,
            { text },
            { headers: { 'Content-Type': 'application/json' } }
          );
          return { language };
        } catch (error) {
          if (error instanceof AxiosError) {
            logger.error(error.cause ?? error.message);
          } else {
            logger.error(error);
          }
          return { language: 'N/A' };
        }
      }),
  }),
  news: procedure
    .input(
      z.object({
        category: z.nativeEnum(Category).optional().default(Category.GENERAL),
        country: z
          .nativeEnum(Country)
          .optional()
          .default(Country.UNITED_STATES),
        page: z.number().int().optional().default(1),
        pageSize: z.number().int().optional().default(100),
        query: z.string().optional().default(''),
      })
    )
    .query(async (options): Promise<Article[]> => {
      const category: Category = options.input.category;
      const country: Country = options.input.country;
      const page: number = options.input.page;
      const pageSize: number = options.input.pageSize;
      const query: string = options.input.query;
      const { articles = [] } = await getTopHeadlines({
        category,
        country,
        page,
        pageSize,
        query,
      });
      return articles;
    }),
  trends: procedure.query((): Promise<Record<string, string[]>> => {
    return getTrends();
  }),
  weather: procedure
    .input(
      z.object({
        latitude: z.number().default(0),
        longitude: z.number().default(0),
      })
    )
    .query(async (options) => {
      const { latitude = 0, longitude = 0 } = options.input;
      try {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.set('timezone', 'GMT');
        urlSearchParams.set('latitude', latitude.toString());
        urlSearchParams.set('longitude', longitude.toString());
        urlSearchParams.set('current', 'temperature_2m');
        urlSearchParams.append('current', 'weather_code');
        const url = `https://api.open-meteo.com/v1/forecast?${urlSearchParams.toString()}`;
        const response = await axios.get<Weather>(url);
        const { data } = response;
        const { current } = data;
        const { weather_code = 0, temperature_2m: temperature = 0 } = current;
        const main: string = weatherCodes[weather_code] ?? 'N/A';
        return { main, temperature };
      } catch (error) {
        logger.error(`error=${error}`);
        return { main: '', temperature: 0 };
      }
    }),
  word: procedure
    .input(
      z.object({
        word: z.string().default(''),
      })
    )
    .query(async (options) => {
      const { word } = options.input;
      try {
        const url = `https://www.wordsapi.com/mashape/words/${encodeURIComponent(word)}?when=2024-06-03T05:47:08.760Z&encrypted=8cfdb18ee722959bea9207bfea58babeaeb0250937f997b8`;
        const response = await axios.get<{ results: Result[] }>(url);
        const { data } = response;
        const { results } = data;
        return { word, results };
      } catch (error) {
        logger.error(`error=${error}`);
        return { word, results: [] };
      }
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
