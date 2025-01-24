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
    let o = {};
    const c = (s) => n(s, a),
      g = { module: { uri: a }, exports: o, require: c };
    e[a] = Promise.all(i.map((s) => g[s] || c(s))).then((s) => (t(...s), o));
  };
}
define(['./workbox-e9849328'], function (s) {
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
          url: '/nothing/_next/static/chunks/111-4d0f6354064c423a.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/494-9c9de0f3c6f62058.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/61c87872-cdc7dcfb8370bb38.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/974-8286d68cd7bd1bd7.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-e24e992fb8865b3c.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/framework-318bc3f183224ed6.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/main-392581ce45dbf102.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-ff4f1921dfc8d375.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-c9bee2c4c7dd924e.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-25287073226274ac.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-e23673b7328b5a2c.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-c79a7a0c66d52c21.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/battery-d13c8684288bd455.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/browser-2eab8648b9cdc9f9.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calculator-699309de19bf256f.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calendar-85f5d6f2bb005ed8.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/clock-2dd9681e06390c59.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/compass-b42bc74bdf9b1ddc.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/crypto-987803d5fbf4f5de.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/files-83d6f10727d2aa18.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/fitness-87ea9c512475f1f4.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/health-aca4288c729176f3.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/home-7f567e68b1e54cf2.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-f3b7f69774f71e87.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/mail-8017674b2306d806.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/maps-7f82275a5bfce17c.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/messages-266c43ab7924837c.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/music-5e1cfff68db3fc85.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/news-c5f8dbd19e4de1cb.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/notes-7dfd1edda6205fbb.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/phone-7bba4ea307a534b0.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/photos-a1733ff8f9bf6844.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/settings-5a620a5a97d3abc5.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/stocks-d5892f5f5334d211.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/tasks-a3f057b31cc7fe81.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/translate-adda6e9f639380dd.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/videos-e9d6b46ba44b3b6c.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/wallet-78fb4da042224589.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/weather-05e8148c0715574e.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-2eb536567a28aff6.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-8dcfac1db454b612.js',
          revision: 'swsOq-oEwIilgz3jN252C',
        },
        {
          url: '/nothing/_next/static/css/624f9349b5329b82.css',
          revision: '624f9349b5329b82',
        },
        {
          url: '/nothing/_next/static/swsOq-oEwIilgz3jN252C/_buildManifest.js',
          revision: 'ee52af746203601e07f6b7839d522684',
        },
        {
          url: '/nothing/_next/static/swsOq-oEwIilgz3jN252C/_ssgManifest.js',
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
