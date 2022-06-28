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
      branches: 30,
      functions: 50,
      lines: 70,
      statements: 70,
    },
  },
  preset: 'ts-jest',
  roots: ['<rootDir>/src'],
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[t]s?(x)'],
  verbose: true,
};
