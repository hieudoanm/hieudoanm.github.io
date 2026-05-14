// Generated using webpack-cli
import CopyPlugin from 'copy-webpack-plugin';
import path from 'path';

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

// Shared config factory
const createConfig = () => ({
  mode,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: './src/background.ts',
  output: {
    path: path.resolve(__dirname, `dist`), // dist-chrome or dist-firefox
    filename: 'background.js',
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '.', context: 'public' }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
  },
});

export default createConfig();
