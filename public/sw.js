if (!self.define) {
  let e,
    n = {};
  const s = (s, i) => (
    (s = new URL(s + '.js', i).href),
    n[s] ||
      new Promise((n) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = s), (e.onload = n), document.head.appendChild(e);
        } else (e = s), importScripts(s), n();
      }).then(() => {
        let e = n[s];
        if (!e) throw new Error(`Module ${s} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const a =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (n[a]) return;
    let o = {};
    const c = (e) => s(e, a),
      r = { module: { uri: a }, exports: o, require: c };
    n[a] = Promise.all(i.map((e) => r[e] || c(e))).then((e) => (t(...e), o));
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
          url: '/nothing/_next/static/1qz6e8G0TNhn7biRoXZ5u/_buildManifest.js',
          revision: '419939359f01f33c4c2b731900fc41d4',
        },
        {
          url: '/nothing/_next/static/1qz6e8G0TNhn7biRoXZ5u/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/111-faa5d4ca2efd4e63.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/494-a60be0e9affe99cf.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/61c87872-cdc7dcfb8370bb38.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/769-429a0d72f7cc381c.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-af5b8df133223e09.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/framework-790b83e62cde60ee.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-ff4f1921dfc8d375.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/main-c9c82f8eedbbd449.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-c9bee2c4c7dd924e.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-25287073226274ac.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-a030804af4e486ee.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-c79a7a0c66d52c21.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/battery-1bd0064359e84191.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/browser-b8bf1ad1abf2ecfa.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calculator-a9ab2a50c97fd7f8.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/calendar-b02b792bf55df219.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/camera-776943152dcdc116.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/clock-55ea9868b7b66b56.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/colors-ceea7a6dea5cd8af.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/compass-a3fd01c1b9f078ad.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/crypto-987803d5fbf4f5de.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/files-d3b9c407e1b1c4d9.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/fitness-87ea9c512475f1f4.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/games-49b6453cc3c266dd.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/health-227bfa9ad7efe19e.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/home-38704e6edb20f54f.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-ed348d8ecce24c71.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/mail-ba14e6b41098c689.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/maps-6ad840bae62acbfe.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/messages-fff159f47990da51.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/music-abc9cb7767e15f9d.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/news-c5f8dbd19e4de1cb.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/notes-8e311a4458993cf9.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/phone-1dc4cebd5a70e708.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/photos-a1733ff8f9bf6844.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/settings-74e81c1a99db38ab.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/stocks-d5892f5f5334d211.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/tasks-7729bebe0e3a6485.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/translate-04ae42c69151064b.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/videos-7fd8125736212bf6.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/wallet-48866d1666f18055.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/weather-4cbe33fd46a64f03.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-1fdb166a0f0a48ef.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-8dcfac1db454b612.js',
          revision: '1qz6e8G0TNhn7biRoXZ5u',
        },
        {
          url: '/nothing/_next/static/css/730a716250853ef3.css',
          revision: '730a716250853ef3',
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
              event: s,
              state: i,
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
