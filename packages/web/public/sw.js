if (!self.define) {
  let s,
    e = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    e[n] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = n), (s.onload = e), document.head.appendChild(s);
        } else (s = n), importScripts(n), e();
      }).then(() => {
        let s = e[n];
        if (!s) throw new Error(`Module ${n} didn’t register its module`);
        return s;
      })
  );
  self.define = (i, t) => {
    const a =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[a]) return;
    let c = {};
    const r = (s) => n(s, a),
      o = { module: { uri: a }, exports: c, require: r };
    e[a] = Promise.all(i.map((s) => o[s] || r(s))).then((s) => (t(...s), c));
  };
}
define(['./workbox-01fd22c6'], function (s) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: '/nothing/_next/app-build-manifest.json',
          revision: '434af078512000203212119bf342c673',
        },
        {
          url: '/nothing/_next/dynamic-css-manifest.json',
          revision: 'd751713988987e9331980363e24189ce',
        },
        {
          url: '/nothing/_next/static/XyDA4DP-F9fysjhUFfZ2r/_buildManifest.js',
          revision: 'b2fab154a7d229ce96e415da83947dc1',
        },
        {
          url: '/nothing/_next/static/XyDA4DP-F9fysjhUFfZ2r/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/0bf34dc7-d7403df3b8615ebe.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/1145-f75a01b13e5aac13.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/1231-d41abb567a677cd4.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/2638-f2ae14ec3a645c1c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/3281.42b7c9c70fd20b65.js',
          revision: '42b7c9c70fd20b65',
        },
        {
          url: '/nothing/_next/static/chunks/3971-36ef3feb0993ca50.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/4198-1cdc526f5b629f7f.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/4577-ee74825b4c99968c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/4940-875c2590d4e653b3.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/4e918f5f-5930b268a2199b8d.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/6117-3828dfbe8dafd22a.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/7c8826c0-224cba4d6db509fd.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/8255-bbd0b648e0687323.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/9fe7e568-61ec4b17e8db9b1b.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/c75cef2d-8b2ed867d255fe72.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/dc8fe69c-3629728b84417eb0.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/framework-81b8d3007bfcde78.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/main-72fbbfc8b7a779b0.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-95a0d72891a43694.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-d2cb4dfd697c98b6.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-c3bc8d90c6e77876.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-2dcbb74cfee049bb.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-e9ceb76c6d97fc67.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-0439733fbee86c9c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess-730c3aa949a5e8a0.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/bookmarks-088fd32cc2e648d4.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/books/chess960-476b56d8943e9d24.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/books/openings-3c1d1b5215dc6126.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/fen2png-49787409a6aeb552.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/pgn2gif-3cab8898f92a43e9.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/clock-02e7d0c9ae028bba.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/elo-288279088df5f617.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/braille-ca4e8d8bfbddea93.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/morse-973f3029a1026c52.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/html-e2f2f212c85df41e.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/json-6c0cd2b6529b7e4b.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/md-0503cade7d81f389.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/sql-1c10d792c157a1de.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/csv-5bcf88a27ba15f83.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/yaml-5792d5bd9e3ae1e9.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/yaml/json-cf5bfcf610dcfc2c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/manifest.json-54087ca5de26bf6e.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/markdown-f48bb7eca7ee25f7.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/qrcode-f4321e6f5015edfe.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/uuid-678d2608247ab42d.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-c1d3ca9e2942b94d.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-f157eb5cb302a25a.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/converter/png2ico-ef13ef4cf273892d.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/converter/svg2png-a61c4724ec5fe7c0.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/filter/golden-f92a8a0d2e7f1269.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/filter/grayscale-9d6c1c3a99093670.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/chemistry-71c5e8712873ee30.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/countries-1761f854ce524d10.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/ocr-41f37adb98588043.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-39366136ea5eea7b.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-0f713d17bb7acf7a.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-90bc9d9bb5c24b97.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-12ae062f94612738.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-7e7a302e47f82f91.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-44e7f6cb30988b45.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-cbcc06f7034387e5.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-bced831270395975.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-189bab3a5737acfe.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-2b20fa48380e1a82.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-4ef79e904053b149.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-a02d96dbc651cb67.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-ffed76a1b528ed45.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-005e06f26b363d92.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-3d8e3b6449629708.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-00b7a7370177abc8.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-e7b756c13b5c4721.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-0d7d931a236b7931.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-ea2f5c7188598ad3.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-54133cc5e3b0848c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-0ee28808739eeff4.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-d9834895ca1f811e.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-8e30d20a233fd1e7.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-eba59c5db1a9a514.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-0c4d6a2a5d7e1e5d.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-92ca13664c0b8b69.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-71c76167ee1ebb16.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-edead29fda49eebe.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-3c5a8c08fb007f64.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-5ca6c272265d51e6.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-bdc8f3392b5e4ead.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-d5e0de1b167da19c.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-b2ba7bc3e9f2a9b2.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-718ee298676cc920.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-f296270bde8dde8a.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-13fbc4b8a738fda2.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-9e56c0ded35c6e5a.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-110108bafc269a54.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-700e5fb8fae9d008.js',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/_next/static/css/06970d9651d28c9e.css',
          revision: '06970d9651d28c9e',
        },
        {
          url: '/nothing/_next/static/css/4626ac33cee69978.css',
          revision: '4626ac33cee69978',
        },
        {
          url: '/nothing/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/nothing/_next/static/media/7b812efc4471214e-s.p.woff2',
          revision: '04f8fa03d4daafccccc83f77ab478c8f',
        },
        {
          url: '/nothing/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/nothing/_next/static/media/b0cc75aeb56a47a4-s.woff2',
          revision: '305923ff8b12a63cfc8f7826a60cbd90',
        },
        {
          url: '/nothing/_next/static/media/instagram.ced1dbe0.svg',
          revision: 'b81c67a29589fddab85121a51ffd832d',
        },
        {
          url: '/nothing/_next/static/wasm/f75f3421a7e779d6.wasm',
          revision: 'XyDA4DP-F9fysjhUFfZ2r',
        },
        {
          url: '/nothing/data/csv/psychology/hofstede.csv',
          revision: '215430b994fa47cadec6e31d75d908dd',
        },
        {
          url: '/nothing/data/csv/usa/congresses.csv',
          revision: '98a524b391d63cec0518440e3de3378c',
        },
        {
          url: '/nothing/data/csv/usa/presidents.csv',
          revision: 'd1df4336b622c6999f678696ad52e6fc',
        },
        {
          url: '/nothing/data/csv/usa/states.csv',
          revision: '25794a80ef27796f3fe3b2a92211f17a',
        },
        {
          url: '/nothing/data/csv/vietnam/licenses.csv',
          revision: '7642d3e30e91cb4975eda1c9b856e497',
        },
        {
          url: '/nothing/data/csv/vietnam/provinces.csv',
          revision: 'fae6ac5162438d2b2dc7efd1945cab54',
        },
        {
          url: '/nothing/favicon.ico',
          revision: 'c30c7d42707a47a3f4591831641e50dc',
        },
        {
          url: '/nothing/file.svg',
          revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71',
        },
        {
          url: '/nothing/globe.svg',
          revision: '2aaafa6a49b6563925fe440891e32717',
        },
        {
          url: '/nothing/icon.svg',
          revision: '8ffbdcfd3ca3a757d965a1f689da04a1',
        },
        {
          url: '/nothing/icons/icon-128x128.png',
          revision: 'b955f52aa978da0fb3468f5a4ace539c',
        },
        {
          url: '/nothing/icons/icon-192x192.png',
          revision: '7e54870ebbd49a79cd3a4b3299bbd6db',
        },
        {
          url: '/nothing/icons/icon-256x256.png',
          revision: '0e5649eabe94e1c67b8b3cebe797fff2',
        },
        {
          url: '/nothing/icons/icon-512x512.png',
          revision: '7ed4ed21928e268e505b5824f4b51d09',
        },
        {
          url: '/nothing/next.svg',
          revision: '8e061864f388b47f33a1c3780831193e',
        },
        {
          url: '/nothing/vercel.svg',
          revision: 'c0af2f507b369b085b35ef4bbe3bcf1e',
        },
        {
          url: '/nothing/window.svg',
          revision: 'a2760511c65806022ad20adf74370ff3',
        },
        {
          url: '/nothing/workers/gif.worker.js',
          revision: 'dae5d85b26ee82df7e25da09b187af8f',
        },
        {
          url: '/nothing/workers/stockfish.js',
          revision: 'edf0167b75fe8916822afadf21e8c9fb',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/nothing',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: e,
              event: n,
              state: i,
            }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new s.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new s.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new s.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:mp4)$/i,
      new s.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new s.RangeRequestsPlugin(),
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:js)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:css|less)$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new s.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new s.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        const e = s.pathname;
        return !e.startsWith('/api/auth/') && !!e.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => {
        if (!(self.origin === s.origin)) return !1;
        return !s.pathname.startsWith('/api/');
      },
      new s.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    s.registerRoute(
      ({ url: s }) => !(self.origin === s.origin),
      new s.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
