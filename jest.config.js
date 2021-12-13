module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/**/*.test.tsx',
    '!<rootDir>/src/**/*.test.tsx.snap',
    '!<rootDir>/src/**/*.stories.tsx',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  verbose: true,
};
