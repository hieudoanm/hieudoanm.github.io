import dotenv from 'dotenv';

dotenv.config();

export const PORT: string = process.env.PORT ?? '3000';
export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';

export const API_KEY_NEWS: string = process.env.API_KEY_NEWS ?? '';

export const REDIS_URI: string = process.env.REDIS_URI ?? '';
