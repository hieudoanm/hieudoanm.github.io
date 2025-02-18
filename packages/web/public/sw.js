if (!self.define) {
  let s,
    i = {};
  const e = (e, n) => (
    (e = new URL(e + '.js', n).href),
    i[e] ||
      new Promise((i) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = e), (s.onload = i), document.head.appendChild(s);
        } else (s = e), importScripts(e), i();
      }).then(() => {
        let s = i[e];
        if (!s) throw new Error(`Module ${e} didn’t register its module`);
        return s;
      })
  );
  self.define = (n, t) => {
    const a =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (i[a]) return;
    let c = {};
    const o = (s) => e(s, a),
      r = { module: { uri: a }, exports: c, require: o };
    i[a] = Promise.all(n.map((s) => r[s] || o(s))).then((s) => (t(...s), c));
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
          url: '/nothing/_next/static/3d37Gi4Xo88iBs9CWsA5W/_buildManifest.js',
          revision: '8ed61bd8b3e784f409233d6f48e379e1',
        },
        {
          url: '/nothing/_next/static/3d37Gi4Xo88iBs9CWsA5W/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/1265-f16836d48b1fa31c.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/1565-18e1f4ea08e88e68.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/4799-a5fe3e31d4d4b4a6.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/4932-a00a94f16af16289.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/6526-9d4ef75e2190ffdf.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/6531-b0a11a99ae3ee355.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/70d9f234-de705bb289cb93bb.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/8518-11b9de044e64ec57.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/9002-76ff7ee47e024884.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/ba2ada85-11422d340d3316b5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/be5956cf-0fb4483ab0149631.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/bee74250-64cb668d125340cb.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/framework-603521deff95ab99.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/main-4633c3d07bbe2b50.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-c54c196378364408.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-79fc90bfd200ed49.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-f4933b249512fe3a.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-325b60a327cd2ed1.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-1bbe03480f642c00.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-115b2f57703c1f38.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/braille-0b810e09952404c5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/csv-b07765a4ed7c7717.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/markdown-a5084d5198a1ae60.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/morse-cdedd0090c68cbeb.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/convert/yaml2json-51eb5ac9e52c0634.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/manifest.json-2aa0e02dd4db1d1d.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/qrcode-eb4e8fbf3e040e4a.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/uuid-7d43abbcd7e4e9f4.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-798de6e358a3c6ce.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-4ac016706de296a5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/grayify-e0a65c01cf3304e5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/chemistry-80e2a6844dd88cec.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/countries-b51552cfc5916e9b.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-10fb676339408e49.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-9ec847d4e05264ff.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/svg2png-1bae88d4da9ddc3b.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-1264b316e6a99044.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-d3c78743f2d7574d.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-73ee655798a10848.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-973ed004c3729841.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-abb43327eda7a6b5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-555e25314433c64d.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-02c69e30c52cebc3.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-be0ef0169061f6c7.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-cf1f2e51242eb693.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/clock-91b17dc04fa02b59.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/colors-be2ba88f8ff88200.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-a474b168602164c6.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-d45a3bdacfa38518.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-b291733430a4a2fe.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-5d618e515fbafa82.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-741a46699eb0ade8.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-d870b292856dbac2.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-0967c5f52c03777b.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-9ffff52220b89ee7.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-35d0048cd2f48f90.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-aa4e66ea7a5e7332.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-8b863d6f5acb0eb0.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-8f24a6d510687e23.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-393bfa166d9a4c0b.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-fecd223aba03cd03.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-21daeb879939ae8b.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-8a89948d0b6c9273.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-6bf4c66530e2a8b3.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-96c6c5e40e744638.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-edf8a85dc815ab67.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-d4a8f7b5c053edaf.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-22ed59a374b676a5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-5b39b161d65306b8.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-598100af9fed6861.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-55eb5383590298cb.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-3d430733450f63d5.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-a6dbcc86900e6e1d.js',
          revision: '3d37Gi4Xo88iBs9CWsA5W',
        },
        {
          url: '/nothing/_next/static/css/4626ac33cee69978.css',
          revision: '4626ac33cee69978',
        },
        {
          url: '/nothing/_next/static/css/ab481253f541790f.css',
          revision: 'ab481253f541790f',
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
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/nothing',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: i,
              event: e,
              state: n,
            }) =>
              i && 'opaqueredirect' === i.type
                ? new Response(i.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: i.headers,
                  })
                : i,
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
        const i = s.pathname;
        return !i.startsWith('/api/auth/') && !!i.startsWith('/api/');
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
