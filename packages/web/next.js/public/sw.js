if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + '.js', a).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = i), (e.onload = s), document.head.appendChild(e));
        } else ((e = i), importScripts(i), s());
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, c) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let n = {};
    const r = (e) => i(e, t),
      d = { module: { uri: t }, exports: n, require: r };
    s[t] = Promise.all(a.map((e) => d[e] || r(e))).then((e) => (c(...e), n));
  };
}
define(['./workbox-46b0bab3'], function (e) {
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
          url: '/_next/static/chunks/1412-e2de9d2fe32e1573.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/2a9b3ee3-d9dfb0b760c98868.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/3236-063b0ed852d11fae.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/3472-d38c2214fa00af7f.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/3885-d613114616fc28f3.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/3cae6196-33a78c623120ffef.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/4856-8b8b8299000786e1.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/5946-90399682ffd40030.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/6777-482af4ade0321993.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/9731.5958a22ba3799568.js',
          revision: '5958a22ba3799568',
        },
        {
          url: '/_next/static/chunks/b5fceb58-fe86d5fae07d06e8.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/d2ae891f-bbe19a71cb78a14b.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/framework-d51622b99d089c58.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/main-4ce0732c2c450a35.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/main-app-e4327ba33550e19a.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/404-9d9cee3926029a1f.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/500-d479147cf3c558ab.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/_app-4841648e18672181.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/_error-c58847e5d2ebc35f.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/apps-694cafd57438a8cd.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/index-7da291e8bf8d4b48.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/offline-a6bb553c4838cb14.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/posts-b7440c32438cab66.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5B...id%5D-243feb552efa2773.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets-7e3cd25f0d7cf32a.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-162ff8ceb8497a3b.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-188225ade35a5403.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-ed34770479a2e225.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-9970dbef322e7247.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/clock-b7b69f42ceac5792.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/colors-5e4d479907a60451.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-8d4388d4a9aca1a3.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-a5f383b03681487a.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-9d59f690bc9912a2.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-9573fcdc7f5a399b.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-73c0f54ee8aa22b2.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-f3e95adf40e13392.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-40d4a59ceab7471b.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-120f8394b19b63bf.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-e93362be648ac012.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-e8b3d26e672e8db6.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-564fe34aeee93b12.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-1a60f078576f42af.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-3a51f040d52580e6.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-800432823536b7d0.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-1aa0e3f736e942c5.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-4a5b56b1682e8759.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-33636df42849134b.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stock-6790e8a70a0de6ef.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-9d31f271abdcd982.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-8ccecb7783922dd2.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-7a96b438eec7e326.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-75ddb42995cf4dc9.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-8af6810094a4f742.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-7ffc721f168c2624.js',
          revision: 'vGRUeBOTYYRjwcV72BRuE',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
        },
        {
          url: '/_next/static/css/c0570543e76eb174.css',
          revision: 'c0570543e76eb174',
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
          url: '/_next/static/vGRUeBOTYYRjwcV72BRuE/_buildManifest.js',
          revision: '0e9b317ec5a007c5e616a4875bf13dae',
        },
        {
          url: '/_next/static/vGRUeBOTYYRjwcV72BRuE/_ssgManifest.js',
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
              event: i,
              state: a,
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
