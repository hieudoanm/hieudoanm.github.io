if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[a]) return;
    let c = {};
    const r = (e) => n(e, a),
      o = { module: { uri: a }, exports: c, require: r };
    s[a] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (t(...e), c));
  };
}
define(['./workbox-01fd22c6'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
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
          url: '/nothing/_next/static/8YWvAbFArasQIbI9j7Sez/_buildManifest.js',
          revision: '62b1d2350eb68fa4c960520fae0d2456',
        },
        {
          url: '/nothing/_next/static/8YWvAbFArasQIbI9j7Sez/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/1265-f16836d48b1fa31c.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/4799-a5fe3e31d4d4b4a6.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/4932-a00a94f16af16289.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/6526-9d4ef75e2190ffdf.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/6531-b0a11a99ae3ee355.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/70d9f234-de705bb289cb93bb.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/8518-fe40b9a71ebb264b.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/9002-37d4551a2a682ed8.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/9813-a91df0427cd6bb2a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/ba2ada85-11422d340d3316b5.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/be5956cf-f46c4deb95ac52a0.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/framework-603521deff95ab99.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/main-4633c3d07bbe2b50.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-c54c196378364408.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-79fc90bfd200ed49.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-f4933b249512fe3a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-a9effdf1f977bf68.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-1bbe03480f642c00.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-3f9dec5e92a4a773.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chemistry-704dbdba77be369a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/countries-533fa17eacdf9abc.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/csv-db4fe56b035eec5e.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-798de6e358a3c6ce.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-1be9caa75b280c4d.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/grayify-e0a65c01cf3304e5.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/manifest.json-05cb7d2beabc93ca.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/markdown-2424e1ddaccd33e6.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/qrcode-e2c092464deb344a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-10fb676339408e49.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-50f2d672e5be9865.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/svg2png-1bae88d4da9ddc3b.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-b95c3f68e007b148.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/uuid-31129867904fe178.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/yaml2json-61fc3ac1cb73ea45.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-2902b4d402de35d8.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-04397d6d72bfd4a1.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-838acea4c081bd4f.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-98b5f257e38c585a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-42d1682735899947.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-116db0043e07c5c0.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-01421e9cb8d05d49.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-f709bc89ff3be6fa.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-91b17dc04fa02b59.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-0cbba0069ee78ae6.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-c3bf59098f30430a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-d45a3bdacfa38518.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-9727ae1154145941.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-c49b035f3ec11d59.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-741a46699eb0ade8.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-d47f5b1abbc0a6c2.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-53036261e7d5b1fb.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-e15ec12f23d8b83a.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-7f438fa324d3e294.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-e4e985fd7690ba5d.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-7d672c56f8107281.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-56ebff41b7162677.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-3340cd70599bed83.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-1f86ac95e92d9c52.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-770fcf84d8b97e32.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-8a89948d0b6c9273.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-faf072ae3ac4dec7.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-96c6c5e40e744638.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-edf8a85dc815ab67.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-d4a8f7b5c053edaf.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-ce03a3a2cc2d87c2.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-509f32369406e9cc.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-0ff77b4fd6b098bf.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-19cfd29f643d2838.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-d9d734af1254a1ab.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-a6dbcc86900e6e1d.js',
          revision: '8YWvAbFArasQIbI9j7Sez',
        },
        {
          url: '/nothing/_next/static/css/4626ac33cee69978.css',
          revision: '4626ac33cee69978',
        },
        {
          url: '/nothing/_next/static/css/ffa13e86a945624e.css',
          revision: 'ffa13e86a945624e',
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
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/nothing',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: i,
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
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
