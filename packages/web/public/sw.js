if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + '.js', c).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let n = {};
    const d = (e) => a(e, t),
      f = { module: { uri: t }, exports: n, require: d };
    s[t] = Promise.all(c.map((e) => f[e] || d(e))).then((e) => (i(...e), n));
  };
}
define(['./workbox-01fd22c6'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '434af078512000203212119bf342c673',
        },
        {
          url: '/_next/dynamic-css-manifest.json',
          revision: 'd751713988987e9331980363e24189ce',
        },
        {
          url: '/_next/static/chunks/1084-296aad5edd9a8364.js',
          revision: '296aad5edd9a8364',
        },
        {
          url: '/_next/static/chunks/4287-cb1a465f6be2732f.js',
          revision: 'cb1a465f6be2732f',
        },
        {
          url: '/_next/static/chunks/4d21ccdd-be93c27276187c1f.js',
          revision: 'be93c27276187c1f',
        },
        {
          url: '/_next/static/chunks/5769-ffefdc3bfd1e8d6e.js',
          revision: 'ffefdc3bfd1e8d6e',
        },
        {
          url: '/_next/static/chunks/5935a096-a340ad84e3dc273e.js',
          revision: 'a340ad84e3dc273e',
        },
        {
          url: '/_next/static/chunks/813-732cd1af6fcec2d3.js',
          revision: '732cd1af6fcec2d3',
        },
        {
          url: '/_next/static/chunks/8900-e427957839b9f204.js',
          revision: 'e427957839b9f204',
        },
        {
          url: '/_next/static/chunks/8932-6207daf0164f1aef.js',
          revision: '6207daf0164f1aef',
        },
        {
          url: '/_next/static/chunks/ff3b2f09-e4add005efcdf328.js',
          revision: 'e4add005efcdf328',
        },
        {
          url: '/_next/static/chunks/framework-95987ef19789f016.js',
          revision: '95987ef19789f016',
        },
        {
          url: '/_next/static/chunks/main-159766556bd23a08.js',
          revision: '159766556bd23a08',
        },
        {
          url: '/_next/static/chunks/main-app-2c9b75b36cb2473d.js',
          revision: '2c9b75b36cb2473d',
        },
        {
          url: '/_next/static/chunks/pages/404-33d0275a497f8953.js',
          revision: '33d0275a497f8953',
        },
        {
          url: '/_next/static/chunks/pages/500-b5f369adf77e8370.js',
          revision: 'b5f369adf77e8370',
        },
        {
          url: '/_next/static/chunks/pages/_app-22f0e6f50680cf0f.js',
          revision: '22f0e6f50680cf0f',
        },
        {
          url: '/_next/static/chunks/pages/_error-b75f9920ac982106.js',
          revision: 'b75f9920ac982106',
        },
        {
          url: '/_next/static/chunks/pages/index-31663732e6448420.js',
          revision: '31663732e6448420',
        },
        {
          url: '/_next/static/chunks/pages/offline-0063c2384778b935.js',
          revision: '0063c2384778b935',
        },
        {
          url: '/_next/static/chunks/pages/posts-de5ae859026ffe2e.js',
          revision: 'de5ae859026ffe2e',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5B...id%5D-7feab7bcad4527f2.js',
          revision: '7feab7bcad4527f2',
        },
        {
          url: '/_next/static/chunks/pages/store-c0841792ec692deb.js',
          revision: 'c0841792ec692deb',
        },
        {
          url: '/_next/static/chunks/pages/widgets-768cd7a64eeca746.js',
          revision: '768cd7a64eeca746',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-616ad4f2a63b8b69.js',
          revision: '616ad4f2a63b8b69',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-3738731e2ff841fb.js',
          revision: '3738731e2ff841fb',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-6f9036a0ac306854.js',
          revision: '6f9036a0ac306854',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-c804221b1476bb4c.js',
          revision: 'c804221b1476bb4c',
        },
        {
          url: '/_next/static/chunks/pages/widgets/clock-1b1fc2502926977c.js',
          revision: '1b1fc2502926977c',
        },
        {
          url: '/_next/static/chunks/pages/widgets/colors-bd8451620ae14072.js',
          revision: 'bd8451620ae14072',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-1a5a14e4f801c629.js',
          revision: '1a5a14e4f801c629',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-dc811622381d78ea.js',
          revision: 'dc811622381d78ea',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-cc1bd4955fcf5891.js',
          revision: 'cc1bd4955fcf5891',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-bc4bb48ba8e95dea.js',
          revision: 'bc4bb48ba8e95dea',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-746c97cfbdc51d84.js',
          revision: '746c97cfbdc51d84',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-fd866ad00f96ad40.js',
          revision: 'fd866ad00f96ad40',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-e500d887aa9d5031.js',
          revision: 'e500d887aa9d5031',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-2cb075603c663c46.js',
          revision: '2cb075603c663c46',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-e4758ba5af0cd1fb.js',
          revision: 'e4758ba5af0cd1fb',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-ef6e09c0d6033a4b.js',
          revision: 'ef6e09c0d6033a4b',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-c3f9dfe9394ce4bc.js',
          revision: 'c3f9dfe9394ce4bc',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-0550c6c79c587d84.js',
          revision: '0550c6c79c587d84',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-793b58b8747b8e83.js',
          revision: '793b58b8747b8e83',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-11535ea5c5b57e1d.js',
          revision: '11535ea5c5b57e1d',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-97ce3bf80903fc4a.js',
          revision: '97ce3bf80903fc4a',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-e5e3e030395bfa8d.js',
          revision: 'e5e3e030395bfa8d',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-91f952682da7fb37.js',
          revision: '91f952682da7fb37',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stock-82e77f4b12ae4f7e.js',
          revision: '82e77f4b12ae4f7e',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-d8eddd228c383da9.js',
          revision: 'd8eddd228c383da9',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-08a065a3c88c4928.js',
          revision: '08a065a3c88c4928',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-e3434cc137b5f16d.js',
          revision: 'e3434cc137b5f16d',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-85cee156edb2ba4e.js',
          revision: '85cee156edb2ba4e',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-9ea5e39c1c0e27ce.js',
          revision: '9ea5e39c1c0e27ce',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-c5d3e1342d2407ee.js',
          revision: 'c5d3e1342d2407ee',
        },
        {
          url: '/_next/static/css/ab8325972a12a46d.css',
          revision: 'ab8325972a12a46d',
        },
        {
          url: '/_next/static/eTFazW_dyD9zFx-yTot0z/_buildManifest.js',
          revision: 'c6c4bb00df8318e57fbb8813a76bf414',
        },
        {
          url: '/_next/static/eTFazW_dyD9zFx-yTot0z/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/media/01.75a04b34.jpg',
          revision: 'e2e5459681f56ad6b604d93113efd941',
        },
        {
          url: '/_next/static/media/01.ca0e57a8.jpg',
          revision: '698493c5a8145b38daaf1985a2074cfe',
        },
        {
          url: '/_next/static/media/02.40c6cd86.jpg',
          revision: '316e49d818e0a3ac9e605f2d547a4e38',
        },
        {
          url: '/_next/static/media/02.a682459e.jpg',
          revision: 'ad98d96e9baa5426ad53d837e1c5084d',
        },
        {
          url: '/_next/static/media/03.88bcecf2.jpg',
          revision: '0a8693796b37b6d3e771ed8fdb6834d8',
        },
        {
          url: '/_next/static/media/03.dcf248f0.jpg',
          revision: 'b19f5f41eac3ad815f85e123fdca3630',
        },
        {
          url: '/_next/static/media/04.6f77c75b.jpg',
          revision: '8663c3a8928c78482dc29e5daf45dcf1',
        },
        {
          url: '/_next/static/media/04.f1c39637.jpg',
          revision: 'e0766f1dc9aa2d203a41c48304e5167d',
        },
        {
          url: '/_next/static/media/05.aae3c2d4.jpg',
          revision: '2e9ee9c34026bb40a1cafdeccb819050',
        },
        {
          url: '/_next/static/media/06.4a307583.jpg',
          revision: '3bbefd03a760cf8115fa42c004579f98',
        },
        {
          url: '/_next/static/media/06.55a37482.jpg',
          revision: '5ddcb22a6a09b0a45fd1e89b965353fe',
        },
        {
          url: '/_next/static/media/10.e59dea74.jpg',
          revision: 'ba0f861222be78790ce6d0a07b905fca',
        },
        {
          url: '/_next/static/media/11.61a34976.jpg',
          revision: '996b38cc95082752bf3328dcc5d1f89f',
        },
        {
          url: '/_next/static/media/12.c51016ac.jpg',
          revision: '5418b4da1dad217465b2d80a9b2aecc5',
        },
        {
          url: '/_next/static/media/16.821638cf.jpg',
          revision: '5487424701e432f9707a60da61230998',
        },
        {
          url: '/_next/static/media/19.eb7bbb0c.jpg',
          revision: '9866784e6caf0d4bd4a333a95bdcc273',
        },
        {
          url: '/_next/static/media/20.0d44df08.jpg',
          revision: '78eeb1908ea6ade3f1cb65298c731266',
        },
        {
          url: '/_next/static/media/26.b19d5c02.jpg',
          revision: 'd169ac56e9e59f9877aebd451d3012b5',
        },
        {
          url: '/_next/static/media/569ce4b8f30dc480-s.p.woff2',
          revision: 'ef6cefb32024deac234e82f932a95cbd',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/data/csv/psychology/hofstede.csv',
          revision: '215430b994fa47cadec6e31d75d908dd',
        },
        {
          url: '/data/csv/usa/congresses.csv',
          revision: '98a524b391d63cec0518440e3de3378c',
        },
        {
          url: '/data/csv/usa/presidents.csv',
          revision: 'd1df4336b622c6999f678696ad52e6fc',
        },
        {
          url: '/data/csv/usa/states.csv',
          revision: '25794a80ef27796f3fe3b2a92211f17a',
        },
        {
          url: '/data/csv/vietnam/licenses.csv',
          revision: '7642d3e30e91cb4975eda1c9b856e497',
        },
        {
          url: '/data/csv/vietnam/provinces.csv',
          revision: 'fae6ac5162438d2b2dc7efd1945cab54',
        },
        { url: '/favicon.ico', revision: 'c30c7d42707a47a3f4591831641e50dc' },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        {
          url: '/fonts/Roboto/Roboto-Italic.ttf',
          revision: '36440249159c331694a15fb0ff048fdc',
        },
        {
          url: '/fonts/Roboto/Roboto-Medium.ttf',
          revision: '6d3a3307e8c63d43bed03d0996d68ab8',
        },
        {
          url: '/fonts/Roboto/Roboto-MediumItalic.ttf',
          revision: '8ee39bf1d04dbbf4df9b2bbaeb0b45e9',
        },
        {
          url: '/fonts/Roboto/Roboto-Regular.ttf',
          revision: '78d5a59fc4e468531e3e2cfbe1a527f4',
        },
        {
          url: '/fonts/Times-New-Roman/Times-New-Roman-Bold-Italic.ttf',
          revision: 'b9d17e72612e334d6dc120f94df5529b',
        },
        {
          url: '/fonts/Times-New-Roman/Times-New-Roman-Bold.ttf',
          revision: 'bed7bbf5e371a8e9254b9cefe900c4e1',
        },
        {
          url: '/fonts/Times-New-Roman/Times-New-Roman-Italic.ttf',
          revision: 'c120acb0ba70534c94975cdd9ab9a67d',
        },
        {
          url: '/fonts/Times-New-Roman/Times-New-Roman-Regular.ttf',
          revision: 'bf0b095558051b2104dda386d038d3c2',
        },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icon.svg', revision: '8ffbdcfd3ca3a757d965a1f689da04a1' },
        {
          url: '/icons/icon-128x128.png',
          revision: '846237d3333fd59200344a203b136e0b',
        },
        {
          url: '/icons/icon-192x192.png',
          revision: 'fda6b8e0d7d02a458f6fdce9ed3b7112',
        },
        {
          url: '/icons/icon-256x256.png',
          revision: '8f8e1abdc867cde87a5c1f51a1d479db',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '1d5798f054908a3762f2ed0978f08d2f',
        },
        { url: '/manifest.json', revision: '57109109e6c33c91346ce2b0e535706b' },
        { url: '/next.js.svg', revision: '985b97a0c700a9bbd4c230e3c139051c' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
        {
          url: '/workers/gif.worker.js',
          revision: 'dae5d85b26ee82df7e25da09b187af8f',
        },
        {
          url: '/workers/stockfish.js',
          revision: '94cb7fc83692d04a5072dc0e11cf2270',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
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
    ));
});
