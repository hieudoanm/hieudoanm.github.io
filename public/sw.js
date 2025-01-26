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
    const o = (e) => n(e, a),
      u = { module: { uri: a }, exports: c, require: o };
    s[a] = Promise.all(i.map((e) => u[e] || o(e))).then((e) => (t(...e), c));
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
          url: '/nothing/_next/static/JKOi3EGVRXGeR9uMq9ZF7/_buildManifest.js',
          revision: 'ed76d9c3041190184353b034a493a8ef',
        },
        {
          url: '/nothing/_next/static/JKOi3EGVRXGeR9uMq9ZF7/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/3769-1d34a8de3c3bba22.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/4682-025dd07c0dbe312a.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/5494-005ec4219a0c9a8b.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/5865-11d0c7437646808b.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/60-b6f772d4763e3863.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/61c87872-511f7722317371b2.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/6918-5e95e6e9f70f332f.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/8296-5788a8d6c5a30dc2.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/ddb80a4a-25a9883f0713a622.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/framework-819a94d267f8fc98.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/main-60737fd0fd5031a5.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-9d188e640a63b973.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-bfd7c656047169db.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-aed0bd12456c89f4.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-f2933a183ce438ab.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-55fb49bb39b4b80b.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-4660f9920075a325.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chemistry-c9841b5ea53f6516.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/countries-a3876ac594247435.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/csv-80b8c46d11847261.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/manifest.json-e711d8120e3aefd5.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/markdown-3900dfa69e23228c.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/qrcode-000e272d94a28cb5.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-10b4e546de36ebcf.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/uuid-4ea493336fc916a2.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-ee5331608cb12ab4.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-1ea948595b928257.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-5ea3a676612a2369.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-b44a614652934dbe.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-9b07fd4b766ab8b7.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-d8f197ebf234efec.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-b38aaec628044341.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-2b04851974a3ba74.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-f2d6bb39b23c9184.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-08c3bb0e72f7e7b0.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-a76d2cc916d529d8.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-d692a6ad51840e2c.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-44687bfc45819b5d.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-b7682a964725184b.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-47178d5df38b9aad.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-cd53c1b873244e5d.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-747e513e655c1ecc.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-1552a8eed0a60d5a.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-00383f23a1249f5d.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-de6b395e18d7b242.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-6aa4bc4a633d171b.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-5ad09dbef7c5f2de.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-1c808e7932e053db.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-70045657ac395791.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-88350a1f5ef455aa.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-212459bce78de966.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-d20d216d8404d391.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-99c5c0e21e7e0f3d.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-f24a35b6ad998925.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-2e68a0a0a945b08f.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-e43fe43d0f89a1f2.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-3c472db2c12a2171.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-98fd1d10cdd68388.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-bfec65091a20f3c8.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-b1753696cda6685c.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-49e34b84d9bc8174.js',
          revision: 'JKOi3EGVRXGeR9uMq9ZF7',
        },
        {
          url: '/nothing/_next/static/css/5574a715655beee8.css',
          revision: '5574a715655beee8',
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
