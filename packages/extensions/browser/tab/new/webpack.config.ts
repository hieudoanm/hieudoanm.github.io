import CopyPlugin from 'copy-webpack-plugin';
import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const baseConfig = {
  mode,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
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
        patterns: [
          { from: 'public/manifest/v2/manifest.json', to: 'manifest.json' },
          { from: 'public/icons', to: 'icons' },
        ],
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
        patterns: [
          { from: 'public/manifest/v3/manifest.json', to: 'manifest.json' },
          { from: 'public/icons', to: 'icons' },
        ],
      }),
    ],
  },
];
