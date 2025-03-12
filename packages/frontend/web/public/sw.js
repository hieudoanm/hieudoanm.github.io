if (!self.define) {
  let s,
    e = {};
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    e[a] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = a), (s.onload = e), document.head.appendChild(s);
        } else (s = a), importScripts(a), e();
      }).then(() => {
        let s = e[a];
        if (!s) throw new Error(`Module ${a} didn’t register its module`);
        return s;
      })
  );
  self.define = (t, i) => {
    const c =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[c]) return;
    let n = {};
    const o = (s) => a(s, c),
      r = { module: { uri: c }, exports: n, require: o };
    e[c] = Promise.all(t.map((s) => r[s] || o(s))).then((s) => (i(...s), n));
  };
}
define(['./workbox-46b0bab3'], function (s) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
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
          url: '/_next/static/YojBMPsU0X3BYg9Tf7T_1/_buildManifest.js',
          revision: '44084c0cf9efde320097384f46640125',
        },
        {
          url: '/_next/static/YojBMPsU0X3BYg9Tf7T_1/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/3620-e29bdad7008b36f1.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/4385-5ac14eb5266c9aa5.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/5b79675f-85ea3c7f2ad93a6a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/6d1efd94-1dae5ceee83775c6.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/7466-3cf034eadaebb5d1.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/8863-5c61941ce1c2c120.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/9142-4a21b18146bbb6ee.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/b51d1a98-30971278b38e7bce.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/main-a19e8d07085146fb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/main-app-0297771a67cc741a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/404-f92401d257eb65c0.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/500-5c3d3df19e1f1499.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/_app-c862b78daec3d437.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/_error-8996b75f37243f2f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps-a04b6335b4b50195.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-a2a18e1f094ccecb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-f2eb8fe1303e7e5f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-a3c7996d510793e7.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-7e9a941291bea1bb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-24376cb7e0de2803.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-a4f49fcf350a2066.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-0a2d9ad6c160b9f7.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-4c9296db89ea1891.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-4e69bf8c31e920fa.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-409f7f2dba104815.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-3acb806c79a6a532.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-2dd220fe45525142.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-459737c6736b1d6d.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-48b00debb693394e.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-c3ce025f6ebc2216.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-0d2756b6c3ada838.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-5a7abad984d11ea1.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-f04a26b384638e68.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-244ba129d0567355.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-84613b135058943e.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-6d9da0b2e9d07d00.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-70f03cfdd6430e8d.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-3a7b5afa1b1f46d4.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-edbb8877b76ae4cb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/xml-d6446cf605b3b1df.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-bd5ffe1d7fff7f2b.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml-91bd6ea77803604a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-f2af89f8471e4e7e.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/openapi2postmanv2-5d086862af3392bb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-0314fbd4a2eb4aff.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-5092d2a259240f8c.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-bea11a3158c97509.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-2f9019060083d6e4.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-d29999f534c43166.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-44a663d0f71cfb04.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-4d50710f70f53ab2.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-d37db9a4fd5af0cb.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-791030281202dd50.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-ce969c1595822b08.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-76169774c397d921.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-7fb9fb14f5bb2b33.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/base64-d1f5ec9cf766d2d6.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-5255eb943a76110c.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-49a5095c74ea8c72.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-d8636e782057c55f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-2e64fbaef1d5cc5c.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/instagram-bee66c42d53e9b37.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-f3ed53b9301c9114.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-50a9b50d4e3a13b6.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-5393c4ed6eda2504.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-78da48e589b6dabd.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-c7f265f8732ae6e1.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-49d3492bbe65b5d2.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-9596e2297d9a620f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/index-f86b57dd0a5b5e85.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets-67c9be79a8afc42b.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-865a486cd9b31803.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-6ed268e0344db276.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-cecfbf69cd8c98a9.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-63c68f3406cd5f93.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-44ceb916651907e5.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-3ee24fd12857ea25.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-00e565716f1f4969.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-21b44a101cda4b04.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-6e61f30b65e3f85b.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-9fb0a1114dc6d10b.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-4f56bf04e359fa9a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-0bc1581c1adc4d45.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-2cf6c6811276f891.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-267e5e1da976669a.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-6c4a1467ba27aa90.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-4d4362dbe3c11294.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-7ec9731862da9780.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-bd0edd1644d252e0.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-c67e3da10ea778ce.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-d5ddfe172b439931.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-6ad0572d61bad77f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-cdcb8a6ed7d22df3.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-2f097738d3945a29.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-e8e7bceafc491933.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-f8ba4dbcae675749.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-cf105c4998fc020f.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-a435eecac0901cae.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-04f40859568ff538.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-5799f83a1ca5b0f3.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-3f816717c10cdfb3.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-7a2a84b0c13c0dbc.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
        },
        {
          url: '/_next/static/css/73e48d209dd433ca.css',
          revision: '73e48d209dd433ca',
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
          url: '/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: 'YojBMPsU0X3BYg9Tf7T_1',
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
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      '/',
      new s.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: e,
              event: a,
              state: t,
            }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: e.headers,
                  })
                : e,
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
        const e = s.pathname;
        return !e.startsWith('/api/auth/') && !!e.startsWith('/api/');
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
