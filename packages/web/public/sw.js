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
    const g = (e) => n(e, a),
      o = { module: { uri: a }, exports: c, require: g };
    s[a] = Promise.all(i.map((e) => o[e] || g(e))).then((e) => (t(...e), c));
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
          url: '/nothing/_next/static/SgCmXPAApaJH1Diwg3tIe/_buildManifest.js',
          revision: 'c757db7df2a3130da7979ba93e66fb4b',
        },
        {
          url: '/nothing/_next/static/SgCmXPAApaJH1Diwg3tIe/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/1265-f16836d48b1fa31c.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/4932-a00a94f16af16289.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/6531-b0a11a99ae3ee355.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/7641-ca84857f8642ad52.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/8518-3dfd89d6c8aef301.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/9002-7c0dc816d087fa44.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/99-da6b2e0c475c572c.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/ba2ada85-11422d340d3316b5.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/be5956cf-f488b2c5641d98e6.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/framework-603521deff95ab99.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/main-4b16a685ebc1392e.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-c54c196378364408.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-10e2b6fecc692c83.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-d0bd8c23402822e7.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-723399990e2587a1.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-9aa1b925d1082c34.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-cbd51f9262a91bf8.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chemistry-d9655a64fa104236.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/countries-54eed7dd9408c21e.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/csv-3957e7d040e80ca6.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/manifest.json-0a5a84b9d3dfa6dd.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/markdown-2424e1ddaccd33e6.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/qrcode-26dae3c81a00c51f.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-ca881e4d939dfbb0.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-ed7ce8af027aeedb.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/uuid-054ba0a0544a89a6.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-2902b4d402de35d8.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-59004f99753987ef.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-d4098120f63e2595.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-71f23a4dd7591eb5.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-6dea214cde6148ab.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-30b6175abca0a69f.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-f8f83cebbabca704.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-291bc627ffdbf852.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-6cbb0f35d0086789.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-47b910442b72b866.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-0c8b8f14cedeec07.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-08c7616b0234c812.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-ac7b80630c0f2dee.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-7d0e41787529034c.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-268d631001ae60a5.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-88d9efb8564d1fb6.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-db296b670328d71c.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-890b9a16d6d87389.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-a448940a41988452.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-d5544edbf57157b3.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-e1753e36da78e914.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-f2b751e852cff51a.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-4c40403df5f41536.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-223e6f0844295051.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-34f72283bb510fee.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-e8ab58f7725f9a0d.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-ecf212a866603d37.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-a4d6e4c47b7f117d.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-0b6143328e69e75b.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-f717d770d4f17463.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-4e080a592a8d8cce.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-edbbba3a39260cbb.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-3783232107bb5b8c.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-6c8b4d4c597aedaf.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-72be9146ef2193c5.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-a6dbcc86900e6e1d.js',
          revision: 'SgCmXPAApaJH1Diwg3tIe',
        },
        {
          url: '/nothing/_next/static/css/c8279c1cbdfba67c.css',
          revision: 'c8279c1cbdfba67c',
        },
        {
          url: '/nothing/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/nothing/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
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
