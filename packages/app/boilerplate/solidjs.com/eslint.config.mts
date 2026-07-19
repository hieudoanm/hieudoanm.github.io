import tseslint from 'typescript-eslint';
import solid from 'eslint-plugin-solid';

export default [
  {
    ignores: [
      '.output/**',
      '.vercel/**',
      '.vinxi/**',
      '.nitro/**',
      'dist/**',
      'node_modules/**',
      'public/**',
    ],
  },
  ...tseslint.configs.recommended,
  solid.configs['flat/typescript'],
];
