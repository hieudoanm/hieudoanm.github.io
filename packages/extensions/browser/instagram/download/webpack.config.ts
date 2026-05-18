import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const baseConfig = {
  mode,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: {
    content: './src/content.ts',
    background: './src/background.ts',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
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
          {
            from: 'public',
            to: '.',
            globOptions: { ignore: ['**/v2/**', '**/v3/**'] },
          },
          { from: 'src/popup/popup.html', to: 'popup.html' },
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
          {
            from: 'public',
            to: '.',
            globOptions: { ignore: ['**/v2/**', '**/v3/**'] },
          },
          { from: 'src/popup/popup.html', to: 'popup.html' },
          { from: 'public/manifest/v3/manifest.json', to: 'manifest.json' },
          { from: 'public/icons', to: 'icons' },
        ],
      }),
    ],
  },
];
