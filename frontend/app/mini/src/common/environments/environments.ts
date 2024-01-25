export const NODE_ENV = process.env.NODE_ENV ?? 'development';
// BASE API
export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:8080';
// GraphQL
export const GRAPHQL_URI =
  process.env.GRAPHQL_URI ?? 'http://localhost:3001/api/graphql';
export const NEXT_PUBLIC_GRAPHQL_URI =
  process.env.NEXT_PUBLIC_GRAPHQL_URI ?? 'http://localhost:3001/api/graphql';
