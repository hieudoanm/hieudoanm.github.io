if (!self.define) {
  let s,
    n = {};
  const e = (e, t) => (
    (e = new URL(e + '.js', t).href),
    n[e] ||
      new Promise((n) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = e), (s.onload = n), document.head.appendChild(s);
        } else (s = e), importScripts(e), n();
      }).then(() => {
        let s = n[e];
        if (!s) throw new Error(`Module ${e} didn’t register its module`);
        return s;
      })
  );
  self.define = (t, i) => {
    const a =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[a]) return;
    let c = {};
    const o = (s) => e(s, a),
      r = { module: { uri: a }, exports: c, require: o };
    n[a] = Promise.all(t.map((s) => r[s] || o(s))).then((s) => (i(...s), c));
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
          url: '/nothing/_next/static/chunks/1233-61d78315122a0005.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/4799-47eb069a93e57856.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/4932-0711b9568497fb57.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/5330-d2a486eaaf4c74fc.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/5557-a3edcd9a3c5c5f52.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/57abf2e6-89047b68c50072a8.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/631.94815fff8764be45.js',
          revision: '94815fff8764be45',
        },
        {
          url: '/nothing/_next/static/chunks/6526-275cc17515238d2e.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/6531-3e5dbc7fe89873bd.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/70d9f234-42f1390790527c9d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/9002-04055b82b6eaeb5a.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/91661ca0-5a27df4f7c6cf5a1.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/ba2ada85-601b11a4bfcecc95.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/framework-2a9569cd90ec3ae8.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/main-346b1576ea6785d1.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-9d6590ffbdb3712a.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-deecd8dc2c7c98be.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-e404eebf88119a7d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-9cf938b76bd07cad.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-76d7d8f8e63d2d7f.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-054a695e251e9b98.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/code/braille-cefd8eca3c7df63a.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/code/morse-ec9e116f8dc862d3.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/csv/html-1c2d0d9caa48b07c.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/csv/json-0b2a770fa132af5c.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/csv/md-6e87cb16ecf3ad79.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/csv/sql-2929fba3e6550864.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/json/csv-76b8ca3dfd195594.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/json/yaml-41d85449736262cd.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/data/yaml/json-be18114c8887d58a.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/images/png2ico-0c20bfb8a81c2783.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/images/svg2png-3832ed8e35df103c.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/markdown-88e86bd178235cab.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/manifest.json-0f2a79fffd2c026d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/qrcode-fe319684de26a252.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/uuid-a7b58044bcf52758.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-212498d1ee0e54c7.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-8d0c77ea59f52f70.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/grayify-d94c5347d435c4da.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/chemistry-bf640b0b69a42f24.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/countries-72aa627f6bf9d2a9.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/ocr-8ef9f02f308b6ca1.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-a4769c7c75bf48ee.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-a961047bd09bd21b.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-00fe29eb3346e1f7.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-bba053bb66aa011d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-30ac0b65b0b9405d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-c594ca1abd1674ee.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-7201ea9982969e06.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-fbbf131800aa32c9.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-a885bf9efd3a0e70.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-a6507a3c3679569d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-7003e0afe55cd58f.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-603a23a18bc7fe89.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-2829e87a1988a66c.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-35f99247176c8676.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-56972fba0c84ed36.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-ba872cdc5e23049b.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-2177e89eaa9ea44d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-25d6bf8977bd5de4.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-3ac2fe34177a0207.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-d3e85c441ecc9160.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-cffbce6a3f5ba308.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-913fd1a0b43148b2.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-1cce4d8063b9f91e.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-cb8f528da9232fcd.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-024360b6530cde70.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-cf32c99bc36d8ece.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-e0768c60ccd16df2.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-60257a35a4b030f1.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-5f9e958faa69379b.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-8611a7fd8e51137d.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-a9ec3c9453b6d900.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-73538c417df80e4b.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-53b62fc4c050f9cc.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-35996bdd9abe2cd7.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-66c64e742ab4cca1.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-4255a05b1ebec1ff.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-1b7c7b3311f4b0a9.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-e4b33bd5a6100bc6.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-eb2548dc171bad52.js',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/css/12823186737d24f2.css',
          revision: '12823186737d24f2',
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
          url: '/nothing/_next/static/wasm/55193d4df27848c1.wasm',
          revision: 'xvssoSwZxSvU5nAFrIKyz',
        },
        {
          url: '/nothing/_next/static/xvssoSwZxSvU5nAFrIKyz/_buildManifest.js',
          revision: '8fd479ee4fb1dc65470d34bd0e06b7a9',
        },
        {
          url: '/nothing/_next/static/xvssoSwZxSvU5nAFrIKyz/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
              response: n,
              event: e,
              state: t,
            }) =>
              n && 'opaqueredirect' === n.type
                ? new Response(n.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: n.headers,
                  })
                : n,
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
        const n = s.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
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
