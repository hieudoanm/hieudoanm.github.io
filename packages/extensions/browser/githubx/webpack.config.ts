import CopyPlugin from 'copy-webpack-plugin';
import path from 'node:path';

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const baseConfig = {
  mode,
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  entry: {
    background: './src/background/index.ts',
    content: './src/content/index.ts',
    github: './src/content/github-link-opener.ts',
    chess: './src/content/chess-focus.ts',
    shopify: './src/content/shopify-detect.ts',
    claude: './src/content/claude-limit.ts',
    instagram: './src/content/instagram-download.ts',
    youtube: './src/content/youtube-transcript.ts',
    popup: './src/popup/index.ts',
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
            globOptions: { ignore: ['**/manifest/**', '**/rules.json'] },
          },
          { from: 'public/manifest/v2/manifest.json', to: 'manifest.json' },
          { from: 'public/icons', to: 'icons' },
        ],
      }),
    ],
  },
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
            globOptions: { ignore: ['**/manifest/**'] },
          },
          { from: 'public/manifest/v3/manifest.json', to: 'manifest.json' },
          { from: 'public/icons', to: 'icons' },
          { from: 'public/manifest/v3/rules.json', to: 'rules.json' },
        ],
      }),
    ],
  },
];
