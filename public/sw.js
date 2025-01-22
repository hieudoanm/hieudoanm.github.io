if (!self.define) {
  let e,
    s = {};
  const n = (n, t) => (
    (n = new URL(n + '.js', t).href),
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
  self.define = (t, i) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[a]) return;
    let o = {};
    const c = (e) => n(e, a),
      r = { module: { uri: a }, exports: o, require: c };
    s[a] = Promise.all(t.map((e) => r[e] || c(e))).then((e) => (i(...e), o));
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
          url: '/nothing/_next/static/chunks/127-c1c537cd31c7c3c5.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/35623fe0-1f976f6a279015f3.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-68c9d7bbefd1d5be.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/framework-7abcce5eaff85f88.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/main-295f1b9c30780ea7.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-178c3585625e16e9.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-4a9f75cbca6260f8.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-d2224bb2591b3eb8.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-b85682b8ca160730.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-d5d902816041a41d.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/browser-e0b9ab894be1849f.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calculator-8c4f151ac071a5a5.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calendar-a65e7ee94680e5a1.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/clock-0f9538e51aeab433.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/compass-dba3d9da8058b8ea.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/files-f23fab5bb040cff8.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/fitness-3329b7f4eb901e2d.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/health-4a948add478ba780.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/home-e44e0170ccc479a0.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-71755bd46cefa6bc.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/mail-c8f03d5bb35534e6.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/maps-5e76ebd14f3720b1.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/messages-62e81e7dc74bdfd9.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/music-d0fdaafc47a18737.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/news-f5f2997d12244353.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/notes-793fe3e03083be5d.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/phone-93ab2f789495582e.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/photos-7ca9551a6d232bdf.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/settings-15ad39495bd674ba.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/stocks-614c250d647cb5bf.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/tasks-39d1f9a8ddbe2220.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/translate-1ff51fdfa09f9ddb.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/videos-62a30d3da3c3625e.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/wallet-e35440c94e495bcb.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/weather-c66c9c6383de5347.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-7ca2eabc99e018a9.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-8dcfac1db454b612.js',
          revision: 'oztJa1sekm-BX05WyqpUK',
        },
        {
          url: '/nothing/_next/static/css/c0d80bf668c6b509.css',
          revision: 'c0d80bf668c6b509',
        },
        {
          url: '/nothing/_next/static/oztJa1sekm-BX05WyqpUK/_buildManifest.js',
          revision: 'b0b0d1a23436cbfc44bc4c30c97ed66a',
        },
        {
          url: '/nothing/_next/static/oztJa1sekm-BX05WyqpUK/_ssgManifest.js',
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
              response: s,
              event: n,
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
