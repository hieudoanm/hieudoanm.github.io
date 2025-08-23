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
      r = { module: { uri: t }, exports: n, require: d };
    s[t] = Promise.all(c.map((e) => r[e] || d(e))).then((e) => (i(...e), n));
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
          url: '/_next/static/chunks/1967-b7ed32628d01218c.js',
          revision: 'b7ed32628d01218c',
        },
        {
          url: '/_next/static/chunks/2103-08b6cfbe92911611.js',
          revision: '08b6cfbe92911611',
        },
        {
          url: '/_next/static/chunks/3974-d54fa8ad2dbdf6c3.js',
          revision: 'd54fa8ad2dbdf6c3',
        },
        {
          url: '/_next/static/chunks/4508-5e8ac261de294c3d.js',
          revision: '5e8ac261de294c3d',
        },
        {
          url: '/_next/static/chunks/4d21ccdd-be93c27276187c1f.js',
          revision: 'be93c27276187c1f',
        },
        {
          url: '/_next/static/chunks/5daa62e0-453a77a10a2a51e2.js',
          revision: '453a77a10a2a51e2',
        },
        {
          url: '/_next/static/chunks/7123-96ea4a6f2f5af849.js',
          revision: '96ea4a6f2f5af849',
        },
        {
          url: '/_next/static/chunks/9606-f48cce67061d448f.js',
          revision: 'f48cce67061d448f',
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
          url: '/_next/static/chunks/main-app-76ee08681e7b224e.js',
          revision: '76ee08681e7b224e',
        },
        {
          url: '/_next/static/chunks/main-b8a40a0a9888ccb8.js',
          revision: 'b8a40a0a9888ccb8',
        },
        {
          url: '/_next/static/chunks/pages/404-3d1563bf33a1db10.js',
          revision: '3d1563bf33a1db10',
        },
        {
          url: '/_next/static/chunks/pages/500-e84b3cd92b37771a.js',
          revision: 'e84b3cd92b37771a',
        },
        {
          url: '/_next/static/chunks/pages/_app-04d0fca57599a291.js',
          revision: '04d0fca57599a291',
        },
        {
          url: '/_next/static/chunks/pages/_error-aa098c3d84ab464f.js',
          revision: 'aa098c3d84ab464f',
        },
        {
          url: '/_next/static/chunks/pages/index-1078678789193d9a.js',
          revision: '1078678789193d9a',
        },
        {
          url: '/_next/static/chunks/pages/offline-528574ddad5ed9ae.js',
          revision: '528574ddad5ed9ae',
        },
        {
          url: '/_next/static/chunks/pages/posts-9e1fd63429a13ce3.js',
          revision: '9e1fd63429a13ce3',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5B...id%5D-d260914d805380ac.js',
          revision: 'd260914d805380ac',
        },
        {
          url: '/_next/static/chunks/pages/store-f4d18137b5d626cf.js',
          revision: 'f4d18137b5d626cf',
        },
        {
          url: '/_next/static/chunks/pages/widgets-69898b0d762f1cec.js',
          revision: '69898b0d762f1cec',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-d04bbebfaedec346.js',
          revision: 'd04bbebfaedec346',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-6a79e609d53bb556.js',
          revision: '6a79e609d53bb556',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-97fc48dba6c77168.js',
          revision: '97fc48dba6c77168',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-2c3ccf1a42c124ab.js',
          revision: '2c3ccf1a42c124ab',
        },
        {
          url: '/_next/static/chunks/pages/widgets/clock-72f9bdb1b618e845.js',
          revision: '72f9bdb1b618e845',
        },
        {
          url: '/_next/static/chunks/pages/widgets/colors-0b8fa63d1cd7f3a3.js',
          revision: '0b8fa63d1cd7f3a3',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-6e2768fa9ff79518.js',
          revision: '6e2768fa9ff79518',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-96edc4d879245ffc.js',
          revision: '96edc4d879245ffc',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-c698c586842e4325.js',
          revision: 'c698c586842e4325',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-9819d08d874f9892.js',
          revision: '9819d08d874f9892',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-6e51c13c263ce2b0.js',
          revision: '6e51c13c263ce2b0',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-8a5a7f9c6b87e440.js',
          revision: '8a5a7f9c6b87e440',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-81ebfebc2bb3953a.js',
          revision: '81ebfebc2bb3953a',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-c41e46888d3b10bc.js',
          revision: 'c41e46888d3b10bc',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-2c84cb9f22e03eca.js',
          revision: '2c84cb9f22e03eca',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-a70242386b57d02c.js',
          revision: 'a70242386b57d02c',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-00dee8b8796e02e4.js',
          revision: '00dee8b8796e02e4',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-97ec07c24f36c5bf.js',
          revision: '97ec07c24f36c5bf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-0fe8be15617f2be8.js',
          revision: '0fe8be15617f2be8',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-c56118846357beb6.js',
          revision: 'c56118846357beb6',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-a96746985ee0a6c8.js',
          revision: 'a96746985ee0a6c8',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-dc0fa6edd73bdef3.js',
          revision: 'dc0fa6edd73bdef3',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-50113f0d09874e04.js',
          revision: '50113f0d09874e04',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stock-2f4a088f66dc41e5.js',
          revision: '2f4a088f66dc41e5',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-25cc3360575db1ec.js',
          revision: '25cc3360575db1ec',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-6bef0abcc3814774.js',
          revision: '6bef0abcc3814774',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-39527da5910e9caf.js',
          revision: '39527da5910e9caf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-9c4b89e835292f01.js',
          revision: '9c4b89e835292f01',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-c70248dba7e4cca0.js',
          revision: 'c70248dba7e4cca0',
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
          url: '/_next/static/css/91ff4731e6903fc9.css',
          revision: '91ff4731e6903fc9',
        },
        {
          url: '/_next/static/eWGxjTzlNbW50an3Gg18z/_buildManifest.js',
          revision: 'fa54024dea238cf89924abeefcbc0196',
        },
        {
          url: '/_next/static/eWGxjTzlNbW50an3Gg18z/_ssgManifest.js',
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
