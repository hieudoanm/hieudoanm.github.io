if (!self.define) {
  let e,
    n = {};
  const t = (t, s) => (
    (t = new URL(t + '.js', s).href),
    n[t] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = t), (e.onload = n), document.head.appendChild(e);
        } else (e = t), importScripts(t), n();
      }).then(() => {
        let e = n[t];
        if (!e) throw new Error(`Module ${t} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, i) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[a]) return;
    let o = {};
    const c = (e) => t(e, a),
      r = { module: { uri: a }, exports: o, require: c };
    n[a] = Promise.all(s.map((e) => r[e] || c(e))).then((e) => (i(...e), o));
  };
}
define(['./workbox-e9849328'], function (e) {
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
          url: '/nothing/_next/static/chunks/494-9c9de0f3c6f62058.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/61c87872-cdc7dcfb8370bb38.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/805-9a61ed8a754ab16a.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/974-d2b466cf2d4be4df.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-74a2b428dfbde544.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/framework-318bc3f183224ed6.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/main-41ec24c986373d08.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-ff4f1921dfc8d375.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-c9bee2c4c7dd924e.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-25287073226274ac.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-61db5eda1fd2f221.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-c79a7a0c66d52c21.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/browser-6c65c4f29b8b00ff.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calculator-da92e8da118134d3.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calendar-85f5d6f2bb005ed8.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/clock-912d0d936254c934.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/compass-7c2c96b6e4c5f051.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/files-e6d1fb828165bd14.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/fitness-2c109298e0d01454.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/health-c793cffa48939155.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/home-d7d5dbf5fdebe390.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-c065b12cf25f3a04.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/mail-d079b8e65bf24426.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/maps-91a1a709ad5ea9ff.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/messages-a8c87c2b497f060e.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/music-e6496371afa37a5a.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/news-486e37607fcf1bf5.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/notes-b486b2a1bdeffbab.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/phone-2d77f3185ecbc1a9.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/photos-5c90e2c8a414ebf6.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/settings-6a0c92ed2785f269.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/stocks-c4e3a1eb7e2b633f.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/tasks-d0592bac20e00979.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/translate-1df18c0b4c10e8d3.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/videos-7a563427912e414b.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/wallet-ddaa5b3d0711e4d7.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/weather-0398d58433294281.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-b50a3e894aabf3b8.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-8dcfac1db454b612.js',
          revision: 'qt17tUXHpFoa-en_CQP0l',
        },
        {
          url: '/nothing/_next/static/css/3476ad9e4d3595a1.css',
          revision: '3476ad9e4d3595a1',
        },
        {
          url: '/nothing/_next/static/qt17tUXHpFoa-en_CQP0l/_buildManifest.js',
          revision: '72afd2f47c8b576ba09f6e9db3cf93ca',
        },
        {
          url: '/nothing/_next/static/qt17tUXHpFoa-en_CQP0l/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
              response: n,
              event: t,
              state: s,
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
        const n = e.pathname;
        return !n.startsWith('/api/auth/') && !!n.startsWith('/api/');
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
