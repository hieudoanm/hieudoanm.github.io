if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + '.js', i).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, t) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let n = {};
    const o = (e) => a(e, c),
      r = { module: { uri: c }, exports: n, require: o };
    s[c] = Promise.all(i.map((e) => r[e] || o(e))).then((e) => (t(...e), n));
  };
}
define(['./workbox-46b0bab3'], function (e) {
  'use strict';
  importScripts(),
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
          url: '/_next/static/chunks/08a04d0d-ffdb0390f971a898.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/1053-0000c81999eb1bf6.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/2a9b3ee3-d9dfb0b760c98868.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/3192-684be0784c75a50c.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/3206-c61e5abc8a53517c.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/3472-d38c2214fa00af7f.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/434-bc692e64cd63c151.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/6777-62bc00968a4c6eff.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/9731.5958a22ba3799568.js',
          revision: '5958a22ba3799568',
        },
        {
          url: '/_next/static/chunks/9821-6a27737409be9228.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/b5fceb58-1af0cd7335f209fc.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/d2ae891f-bbe19a71cb78a14b.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/f7b21882-83a29fa232474c11.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/framework-3dcfeb55aebac45f.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/main-8b978a832c48195a.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/main-app-d767cbaf02290940.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/404-624028ffeea7cd66.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/500-94260e3cdbd42e4d.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/_app-7f65d7fd90c85579.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/_error-9cac38cc68030835.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/apps-46eeeaca76a21218.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/index-18175ebced92ee16.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/offline-305886f4432d5276.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/posts-042461b6d54d5bfd.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5B...id%5D-0081e9e15b96bb70.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets-08b0470b4adf2b17.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-8d9b831849a5563b.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-507104a59861c629.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-ff7e8156c67b3d4c.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-01f6e2db47a6951a.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/clock-d78968b48b2b8587.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/colors-2b02ebf8bd5fc915.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-6e83be5b91d01571.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-d887b8a89f803469.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-34c87a11ac88b441.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-254dd46e2b1835b5.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-6761c32a62f8ef5d.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-d4fa5a1af5a66594.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-481c3b4be35f0a23.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-03d4ae90e44baae4.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-f0f6b49256b15b19.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-553158865351aa8e.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-1eabefa9a7ea1ed7.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-eb8f0217cee4b745.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-125001c0deb7e4d0.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-489c67929c3ccae2.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-e6aeed11d8c3ca03.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-7c1310354ba1eb71.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-a155f00d4938798e.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stock-4cb815a2ae7b6ca9.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-fba1213c177b322a.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-180ca6f479e40376.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-8a7c4d5a4ae49893.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-d9c07a3793eaf992.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-47adfcde57ecbecc.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-7ffc721f168c2624.js',
          revision: 'v3J3QIFH0oLNx6BkTQCWf',
        },
        {
          url: '/_next/static/css/2b59f740d1cfdfde.css',
          revision: '2b59f740d1cfdfde',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
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
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/7b812efc4471214e-s.p.woff2',
          revision: '04f8fa03d4daafccccc83f77ab478c8f',
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
          url: '/_next/static/media/b0cc75aeb56a47a4-s.woff2',
          revision: '305923ff8b12a63cfc8f7826a60cbd90',
        },
        {
          url: '/_next/static/v3J3QIFH0oLNx6BkTQCWf/_buildManifest.js',
          revision: 'dd1d1d66bc64ae05689cf878384a156e',
        },
        {
          url: '/_next/static/v3J3QIFH0oLNx6BkTQCWf/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          revision: 'edf0167b75fe8916822afadf21e8c9fb',
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
