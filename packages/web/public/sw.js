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
          url: '/_next/static/b55Q6IZ5WfC-Y71UpUucI/_buildManifest.js',
          revision: '1a60ce18cec280dd8743e22c5855ce3c',
        },
        {
          url: '/_next/static/b55Q6IZ5WfC-Y71UpUucI/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/127-2ee79cbab5b403b7.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/3583b3ae-5153b78400e5b395.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/4097-0ac41be3d5f297b8.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/6560-dc88a3e16fd36a15.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/8202-507e628be471340e.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/8853-71a6f6e5b651607e.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/9942-e692ccf18ef7d7a2.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/eb9cdffe-014fbd2fe54aaa23.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/ff3b2f09-a75b79f05a3ee82d.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/framework-e830122a7b3683f5.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/main-app-5a3e5d996c09f5a8.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/main-b3286b53eb27ce49.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/404-5e51bd75c8449ea8.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/500-a1775a09b34ccbb1.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/_app-8713f3ccf6cd1be6.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/_error-f093db84de2b2427.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/index-a5cd45cff8467327.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/offline-2521a51ca8476322.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/posts-3416e4d5399dd9ab.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5B...id%5D-cb81ab060fdfd389.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets-f7eaca66b3b3b808.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-f6d4df762f1cb805.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-4126a213f297d097.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-8e59294708b086d5.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-a9d827631b39836c.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/clock-c0bb34e79822095a.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/colors-54846798ede12bd4.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-d7a377cd30923d43.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-695f1252c52ed11c.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-be990f2ce055f88a.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-d5715da8ff3b8540.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-c71be486512b0598.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-ed64d954f6bbca88.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-322abe78ba9287aa.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-afe74a97a8c3d211.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-c07a2216c38443c3.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-9c489ded34256c8a.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-b88eb8fdad437984.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-9eeb595917212b79.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-a34f41d23ba39e96.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-438bb2e425aa7604.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-5db0601724d50028.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-0ae02ab9f8f34fe6.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-9ce721a3d86596eb.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stock-858ee1fad05a4dfe.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-c4d23fc8ad1fba6d.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-f4e5440612aff365.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-9966d2e7528ae661.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-8d599bb803c350c6.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-261f4d0dc22e9b70.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-0e96e2d40c6c13bb.js',
          revision: 'b55Q6IZ5WfC-Y71UpUucI',
        },
        {
          url: '/_next/static/css/85610346b465bdd9.css',
          revision: '85610346b465bdd9',
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
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
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
