module.exports = {
  extends: [
    'next',
    'plugin:prettier/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
  ],
  plugins: ['github', 'prettier', 'jest', 'sonarjs', 'unicorn'],
  rules: {
    'unicorn/no-null': 'off',
    'unicorn/prefer-spread': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
