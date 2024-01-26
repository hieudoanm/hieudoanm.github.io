export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
// Stripe
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY ?? '';
export const STRIPE_PRICE_ID: string = process.env.STRIPE_PRICE_ID ?? '';
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
// Base URL
export const BASE_URL: string = process.env.BASE_URL ?? 'http://localhost:8080';
export const GRAPHQL_BASE_URL: string =
  process.env.GRAPHQL_BASE_URL ?? 'http://localhost:8080';
// GraphQL
export const GRAPHQL_URI: string =
  process.env.GRAPHQL_URI ?? 'http://localhost:3002/api/graphql';
export const NEXT_PUBLIC_GRAPHQL_URI: string =
  process.env.NEXT_PUBLIC_GRAPHQL_URI ?? 'http://localhost:3002/api/graphql';
