if (!self.define) {
  let n,
    e = {};
  const s = (s, t) => (
    (s = new URL(s + '.js', t).href),
    e[s] ||
      new Promise((e) => {
        if ('document' in self) {
          const n = document.createElement('script');
          (n.src = s), (n.onload = e), document.head.appendChild(n);
        } else (n = s), importScripts(s), e();
      }).then(() => {
        let n = e[s];
        if (!n) throw new Error(`Module ${s} didn’t register its module`);
        return n;
      })
  );
  self.define = (t, c) => {
    const i =
      n ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[i]) return;
    let a = {};
    const o = (n) => s(n, i),
      r = { module: { uri: i }, exports: a, require: o };
    e[i] = Promise.all(t.map((n) => r[n] || o(n))).then((n) => (c(...n), a));
  };
}
define(['./workbox-e9849328'], function (n) {
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
          url: '/nothing/_next/static/9zqQHtaCnXOV3ClccmGR8/_buildManifest.js',
          revision: '7944c8b10a0c266648ed8937514c552e',
        },
        {
          url: '/nothing/_next/static/9zqQHtaCnXOV3ClccmGR8/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/494-9c9de0f3c6f62058.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/61c87872-cdc7dcfb8370bb38.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/805-58c56b8d63b7af96.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/974-5c75f26d1a92ca4d.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-4bd1117a7f2ed77a.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/framework-318bc3f183224ed6.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/main-392581ce45dbf102.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-ff4f1921dfc8d375.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-c9bee2c4c7dd924e.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-25287073226274ac.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-fee54d3cdd8593d0.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-c79a7a0c66d52c21.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/battery-2a9e132dae8b9174.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/browser-e4bc570b5a48b028.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calculator-583dded3dbb56b49.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calendar-85f5d6f2bb005ed8.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/clock-912d0d936254c934.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/compass-7c2c96b6e4c5f051.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/files-90d15d5fd3b51fe0.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/fitness-2c109298e0d01454.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/health-c793cffa48939155.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/home-926d27d979215c01.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-e6428199b11b5f67.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/mail-f8c24f52309de82b.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/maps-6b41da09c339495c.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/messages-702835fdff45ef7c.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/music-a8d39a570f931b5e.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/news-486e37607fcf1bf5.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/notes-88a93b978a77b385.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/phone-d1f842f045d6dcdb.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/photos-5c90e2c8a414ebf6.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/settings-c8fa2aed4a01a3fd.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/stocks-c4e3a1eb7e2b633f.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/tasks-d0592bac20e00979.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/translate-358bc0a5c8b9a610.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/videos-0f331a265eed2aa2.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/wallet-20e1882fb0d84060.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/weather-baf8bbe2ceb4d7bc.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-401a8a74059473e5.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-8dcfac1db454b612.js',
          revision: '9zqQHtaCnXOV3ClccmGR8',
        },
        {
          url: '/nothing/_next/static/css/079e924b5fee7811.css',
          revision: '079e924b5fee7811',
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
    n.cleanupOutdatedCaches(),
    n.registerRoute(
      '/nothing',
      new n.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: n,
              response: e,
              event: s,
              state: t,
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
        const e = n.pathname;
        return !e.startsWith('/api/auth/') && !!e.startsWith('/api/');
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
