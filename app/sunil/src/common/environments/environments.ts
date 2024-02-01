export const NODE_ENV = process.env.NODE_ENV ?? 'development';
// BASE API
export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
// GraphQL
export const GRAPHQL_URI =
  process.env.GRAPHQL_URI ?? 'http://localhost:3000/api/graphql';
export const NEXT_PUBLIC_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_URI ?? 'http://localhost:3000/api/graphql';
// API
export const AIR_VISUAL_KEY: string = process.env.AIR_VISUAL_KEY ?? '';
export const API_KEY_PROPUBLICA_CONGRESS: string =
  process.env.API_KEY_PROPUBLICA_CONGRESS ?? '';
export const FOOTBALL_DATA_TOKEN: string =
  process.env.FOOTBALL_DATA_TOKEN ?? '';
export const FIXER_ACCESS_KEY: string = process.env.FIXER_ACCESS_KEY ?? '';
export const OPEN_WEATHER_MAP_APP_ID: string =
  process.env.OPEN_WEATHER_MAP_APP_ID ?? '';
export const TELEGRAM_TOKEN: string = process.env.TELEGRAM_TOKEN ?? '';
