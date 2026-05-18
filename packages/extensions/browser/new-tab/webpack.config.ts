import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const baseConfig = {
  entry: {
    background: './src/background.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

export default [
  // Manifest V2 Configuration
  {
    ...baseConfig,
    output: {
      path: path.resolve(__dirname, 'dist/v2'),
      filename: '[name].js',
      clean: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'public/v2/manifest.json', to: 'manifest.json' }],
      }),
    ],
  },
  // Manifest V3 Configuration
  {
    ...baseConfig,
    output: {
      path: path.resolve(__dirname, 'dist/v3'),
      filename: '[name].js',
      clean: true,
    },
    plugins: [
      new CopyPlugin({
        patterns: [{ from: 'public/v3/manifest.json', to: 'manifest.json' }],
      }),
    ],
  },
];
