if (!self.define) {
  let n,
    s = {};
  const e = (e, t) => (
    (e = new URL(e + '.js', t).href),
    s[e] ||
      new Promise((s) => {
        if ('document' in self) {
          const n = document.createElement('script');
          (n.src = e), (n.onload = s), document.head.appendChild(n);
        } else (n = e), importScripts(e), s();
      }).then(() => {
        let n = s[e];
        if (!n) throw new Error(`Module ${e} didn’t register its module`);
        return n;
      })
  );
  self.define = (t, i) => {
    const c =
      n ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let a = {};
    const g = (n) => e(n, c),
      d = { module: { uri: c }, exports: a, require: g };
    s[c] = Promise.all(t.map((n) => d[n] || g(n))).then((n) => (i(...n), a));
  };
}
define(['./workbox-01fd22c6'], function (n) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    n.clientsClaim(),
    n.precacheAndRoute(
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
          url: '/nothing/_next/static/6lglnhWng8VTcVdUdJks6/_buildManifest.js',
          revision: 'b8b7f00ed0af114a9bce7bea4ed8f834',
        },
        {
          url: '/nothing/_next/static/6lglnhWng8VTcVdUdJks6/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/0bf34dc7-d7403df3b8615ebe.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/1145-15b2319eb6d30233.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/1231-d41abb567a677cd4.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/2638-f2ae14ec3a645c1c.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/3281.42b7c9c70fd20b65.js',
          revision: '42b7c9c70fd20b65',
        },
        {
          url: '/nothing/_next/static/chunks/4198-1cdc526f5b629f7f.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/4577-ee74825b4c99968c.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/4940-875c2590d4e653b3.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/4e918f5f-5930b268a2199b8d.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/6117-3828dfbe8dafd22a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/6285-d426cfccacbeb4dd.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/7c8826c0-224cba4d6db509fd.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/8255-c1a327fc7265c4a7.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/9fe7e568-61ec4b17e8db9b1b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/bce4d9fd-6988d28194c80f92.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/dc8fe69c-f107caa89ebc281b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/framework-81b8d3007bfcde78.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/main-72fbbfc8b7a779b0.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-95a0d72891a43694.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-d2cb4dfd697c98b6.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-c3bc8d90c6e77876.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-340cb1de10002f6f.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-e9ceb76c6d97fc67.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-db81a934dbd06325.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/bookmarks-2661d6575eed5f38.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/fen2png-b3cc2d5d27a3bd0d.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/pgn2gif-1d6d80e3c638ea46.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/clock-93b49e4648f36d01.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/elo-288279088df5f617.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/variants/chess960-e36ae5e5080170d9.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/braille-ca4e8d8bfbddea93.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/morse-973f3029a1026c52.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/html-e2f2f212c85df41e.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/json-6c0cd2b6529b7e4b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/md-0503cade7d81f389.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/sql-1c10d792c157a1de.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/csv-5bcf88a27ba15f83.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/yaml-5792d5bd9e3ae1e9.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/yaml/json-cf5bfcf610dcfc2c.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/images/png2ico-27960309c77ead2a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/images/svg2png-b420783b73e0a722.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/manifest.json-54087ca5de26bf6e.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/markdown-f48bb7eca7ee25f7.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/filter/golden-6042d81d66562fd2.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/filter/grayscale-7cdd35c935b5c4e1.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/qrcode-1c41bbb18e7e113a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/uuid-13e7147056bf49cf.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-c1d3ca9e2942b94d.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-f157eb5cb302a25a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/chemistry-71c5e8712873ee30.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/countries-1761f854ce524d10.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/ocr-41f37adb98588043.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-39366136ea5eea7b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-0f713d17bb7acf7a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-90bc9d9bb5c24b97.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-12ae062f94612738.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-87b8b78beb0f1925.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-44e7f6cb30988b45.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-471b8c5e2b32d25f.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-4c09b02e5fca10bd.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-189bab3a5737acfe.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-89f8d67b87dc93a3.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-ad9d26b56c9d2d41.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-a02d96dbc651cb67.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-443d46af1b1765ba.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-005e06f26b363d92.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-3d8e3b6449629708.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-46a97ace6d4b5444.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-317863b4e5b4986e.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-0d7d931a236b7931.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-eadfb4e56e229807.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-54133cc5e3b0848c.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-94bbdc28e40d1e54.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-873e5acd946ae0f4.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-16182f948f79b21d.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-7ef64b3d81a9397d.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-c300ec36a55e77c0.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-92ca13664c0b8b69.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-abcec26c872618df.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-a0af779f2c12a12a.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-3c5a8c08fb007f64.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-4822a470fd2c418b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-bdc8f3392b5e4ead.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-d5e0de1b167da19c.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-b2ba7bc3e9f2a9b2.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-53ba9901abdac314.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-01d7f69aa508729b.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-d03f8ca3324a22fc.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-f706a1ff3c6b3c2f.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-0de2260573e64dd2.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-700e5fb8fae9d008.js',
          revision: '6lglnhWng8VTcVdUdJks6',
        },
        {
          url: '/nothing/_next/static/css/4626ac33cee69978.css',
          revision: '4626ac33cee69978',
        },
        {
          url: '/nothing/_next/static/css/fce078f6494fcbda.css',
          revision: 'fce078f6494fcbda',
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
          revision: '6lglnhWng8VTcVdUdJks6',
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
    n.cleanupOutdatedCaches(),
    n.registerRoute(
      '/nothing',
      new n.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: n,
              response: s,
              event: e,
              state: t,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new n.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new n.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new n.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new n.RangeRequestsPlugin(),
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:mp4)$/i,
      new n.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new n.RangeRequestsPlugin(),
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:js)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:css|less)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new n.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => {
        if (!(self.origin === n.origin)) return !1;
        const s = n.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new n.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => {
        if (!(self.origin === n.origin)) return !1;
        return !n.pathname.startsWith('/api/');
      },
      new n.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => !(self.origin === n.origin),
      new n.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
