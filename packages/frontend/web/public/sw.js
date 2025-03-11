if (!self.define) {
  let e,
    s = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
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
  self.define = (a, t) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[i]) return;
    let c = {};
    const r = (e) => n(e, i),
      f = { module: { uri: i }, exports: c, require: r };
    s[i] = Promise.all(a.map((e) => f[e] || r(e))).then((e) => (t(...e), c));
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
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/1782-51965aad52041572.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/3495-91ce6a522a1d0ea1.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/39c732d3-59b550d94aa0eabc.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/5506-dda73b45045b2ce4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/5b79675f-85ea3c7f2ad93a6a.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/6d1efd94-1dae5ceee83775c6.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/7299-4a2962458cd77647.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/992-0dae855ba3a35cab.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/main-app-bf116aaf77db9e14.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/main-fb8d51dd511a75eb.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/404-28338b5bf63d5e2b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/500-100e9df60e4413e2.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/_app-3fdcdbd6d9b3df95.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/_error-548b0f9c0089112c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps-fda301a876576c21.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-ac9163278375b8ec.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-2976d636014d025f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-3d1fbef46accd187.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-c5e7b901c4bf1782.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-32c2e19bd7c13ed0.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-95b2d69181748862.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-ab05d4d9390d5eee.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-4d99902285601b57.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-90bd0b51e3466356.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-5b0eacdb40c1697c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-0d9e9bc6f04d1f3b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-8b46029ee3b8ec05.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-13ae0235abd5ff03.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-0e663a0b174ec6c0.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-a3338dae69e96a82.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-b38002b58035563a.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-d3606a287d7b8c06.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-44c0e5d425e8b458.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-85b18919415da11f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-0e5cfd974955934f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-075b76dba80d0ad3.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-d05ee6166d3601ec.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-7712992d175ab15c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-5503600098dfa8ff.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/xml-2163b3bd02b2906b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-18630715f7e9c653.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml-310a4f8df46cd339.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-6076bc9c308dc004.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/openapi2postmanv2-50c3cfe6ed36e5d8.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-657516bb928f7abd.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-1b49f55ce3c9d2e4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-aa58dfcd24b32fc3.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-ce90aa6ebfc5d0fb.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-59d0766d5638ccb5.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-069076711848f18a.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-c95142e1d4ad5f73.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-bb5ac3305ff5e340.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-e12f55995ab2f609.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-876c23744d8d105f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-afb8c6c1d9b477b4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-06bb9b5cf49d8da0.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/base64-5ac65518721becc4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-c3740f324bbb6218.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-b6c232ff15644ea4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-89dd326c137ff166.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-ae4599dd8e9b53b6.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/instagram-6741e81689bd4037.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-4abc717bbd07afcf.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-78f4fff1e69eef6e.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-0ddc6e6c8e0e9f8c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-b36950c4d62a28c8.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-1e4b516993bb89b6.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-f6c8f2f651031e21.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-0d2c1fe612dc2ac5.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/index-994a4f4d3229719b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets-6f41b8ed42c1beb5.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-ad9eef638f99667e.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-f09fdb04d556c1c1.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-744879cdd917b093.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-49f02b2741fb0f60.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-eaefdcd354b703d6.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-47c0977247559b72.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-9df29df6736a505c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-210996ca20a32d73.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-1f851762d082d46f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-271be457b6cd3d9c.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-accefbbbe9df7480.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-b8376f5264059ebd.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-6b9ce3322b867709.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-8c936f8491963d81.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-9cc19aaeb1978e43.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-164369807e6a40f4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-d37b9dc296110fd5.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-b8fc7d149984993b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-e681df139ec00a28.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-f9bb8ede0e9d8fb9.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-cfdb4c775199af54.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-88fb0657a178c009.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-6d778362c7758cd1.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-e609163873660532.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-15e254f13f5e0fef.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-6015b6754f71f65b.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-a2f3d22e4184c38f.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-c06ec8c72082d63d.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-7826d8e5bccd2294.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-1a55a809bffc7427.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-f708ff738cb3bda4.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
        },
        {
          url: '/_next/static/css/6e5ce3f5762bd56c.css',
          revision: '6e5ce3f5762bd56c',
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
          url: '/_next/static/media/b0cc75aeb56a47a4-s.woff2',
          revision: '305923ff8b12a63cfc8f7826a60cbd90',
        },
        {
          url: '/_next/static/media/instagram.ced1dbe0.svg',
          revision: 'b81c67a29589fddab85121a51ffd832d',
        },
        {
          url: '/_next/static/rnqfmnQ59hMeBYL_HJbfM/_buildManifest.js',
          revision: '548969db45f33736cdb7e6e7d045af3d',
        },
        {
          url: '/_next/static/rnqfmnQ59hMeBYL_HJbfM/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: 'rnqfmnQ59hMeBYL_HJbfM',
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
          url: '/fonts/Roboto-Italic.ttf',
          revision: '36440249159c331694a15fb0ff048fdc',
        },
        {
          url: '/fonts/Roboto-Medium.ttf',
          revision: '6d3a3307e8c63d43bed03d0996d68ab8',
        },
        {
          url: '/fonts/Roboto-MediumItalic.ttf',
          revision: '8ee39bf1d04dbbf4df9b2bbaeb0b45e9',
        },
        {
          url: '/fonts/Roboto-Regular.ttf',
          revision: '78d5a59fc4e468531e3e2cfbe1a527f4',
        },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/icon.svg', revision: '8ffbdcfd3ca3a757d965a1f689da04a1' },
        {
          url: '/icons/icon-128x128.png',
          revision: 'b955f52aa978da0fb3468f5a4ace539c',
        },
        {
          url: '/icons/icon-192x192.png',
          revision: '7e54870ebbd49a79cd3a4b3299bbd6db',
        },
        {
          url: '/icons/icon-256x256.png',
          revision: '0e5649eabe94e1c67b8b3cebe797fff2',
        },
        {
          url: '/icons/icon-512x512.png',
          revision: '7ed4ed21928e268e505b5824f4b51d09',
        },
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
              event: n,
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
    );
});
