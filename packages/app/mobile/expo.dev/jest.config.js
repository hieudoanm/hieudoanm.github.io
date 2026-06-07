const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm|react-native|@react-native|expo.*|@expo.*|react-native-.*|@react-navigation|@sentry)/)',
  ],
  moduleNameMapper: {
    '\\.css$': '<rootDir>/__mocks__/styleMock.js',
  },
};

module.exports = config;
