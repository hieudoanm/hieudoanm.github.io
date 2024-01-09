export const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
// Stripe
export const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';
export const STRIPE_SECRET_KEY: string = process.env.STRIPE_SECRET_KEY ?? '';
export const STRIPE_PRICE_ID: string = process.env.STRIPE_PRICE_ID ?? '';
// Base API
export const BASE_API: string =
  process.env.BASE_API ?? 'http://localhost:8080/v1';
export const ANALYSE_API: string =
  process.env.ANALYSE_API ?? 'http://localhost:8000/v1';
// GraphQL
export const GRAPHQL_URI: string = process.env.GRAPHQL_URI ?? '';
export const NEXT_PUBLIC_GRAPHQL_URI: string =
  process.env.NEXT_PUBLIC_GRAPHQL_URI ?? '';
