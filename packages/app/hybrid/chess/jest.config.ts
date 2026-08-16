import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/e2e/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testTimeout: 30000,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@chess/ts$': '<rootDir>/__mocks__/chess-ts.js',
    '^@frontend/react$': '<rootDir>/node_modules/@frontend/react/dist/index.js',
    '^@lodash/ts$': '<rootDir>/node_modules/@lodash/ts/dist/index.js',
    '^@lodashx/ts$': '<rootDir>/node_modules/@lodashx/ts/dist/index.js',
  },
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['html', 'lcov', 'text-summary'] as (
    'html' | 'lcov' | 'text-summary'
  )[],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.test.{ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
};

export default createJestConfig(config);
