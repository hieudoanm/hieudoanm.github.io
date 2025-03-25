if (!self.define) {
  let s,
    e = {};
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    e[n] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = n), (s.onload = e), document.head.appendChild(s);
        } else (s = n), importScripts(n), e();
      }).then(() => {
        let s = e[n];
        if (!s) throw new Error(`Module ${n} didn’t register its module`);
        return s;
      })
  );
  self.define = (a, t) => {
    const i =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[i]) return;
    let c = {};
    const r = (s) => n(s, i),
      _ = { module: { uri: i }, exports: c, require: r };
    e[i] = Promise.all(a.map((s) => _[s] || r(s))).then((s) => (t(...s), c));
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
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/4546-301b90bd99e0da4a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/529-56f2325259d7002a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/5653b13a-dc4bd1be36a1d0cc.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/6d1efd94-185dff1e9409bc40.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/7649-a95fd8b41ea22ad4.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/8939-68f109cb58cb2742.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/9802-32cda748792d5f03.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/a500f7f1-955ad47a1a9275ea.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/main-3ce84f2a1dfceca7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/main-app-15a8f2e70e502e37.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/404-9329772b734e3cd5.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/500-40c6ab67a7930a2a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/_app-3f051d9ed3937a74.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/_error-e7b69eac595a111a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps-2d44bbd08d9bc397.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-9e11d3d0faf3d6db.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-a7bba1b787996231.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-a90462790973eabb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-38e9ecf6b179aae4.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-544309e9403eb158.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-31a82e8233f62c80.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-72dd101766358acc.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-e9cece53dc1d0cf4.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-5437993185454631.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-d9273c28800aac51.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-1c0560d633286999.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-f294bb20fe8c141d.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-b815dd6b4dc9faf2.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-4bf8bff7d968290d.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-5d13ef712fa39a60.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-8d14df51c89c5927.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-1b6faf65d83a321b.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-808acc2b7cb5cae7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-7bac07cf9620c548.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-a74d0032bc54d3d4.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-2fb53b4f9d02e08f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-9b2ccae064dfc2b5.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-5c6818538ff006c4.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-247f9527c90e4969.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/xml-e194eaeca0ce1e71.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-9ed1d3cd751c6f1d.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml-48917d53e283e12f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-27de37d627e7ff32.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/openapi2postmanv2-f3adfd30cb9b89ab.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-abe4131120c244f1.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-2b291fc47bf385fe.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-47e71340c02d08eb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-81dcd48563384337.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-8c3e5b8cce2177eb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-a4d48fcacea9dfdc.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-db99b17e88d884a7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-0d787764cdf17462.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-7e668d92dd1965d7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-d26d23d398fb0d73.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-4eca9dc3365819be.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-b0e21338d1f4766a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/base64-7c0f8f78930f4616.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-dc164a3cf80682e8.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-253accef3342b09f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-06f8310847857c41.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-5e2f5ffea0aa15f9.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/instagram-a01bff855f5f1726.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-43e539a12c0c1049.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-508dae49a6846ffb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-13bb181200d77e90.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-ff56c534716b7f0f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-61865f96e9b059bb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string-402692cce15eaa9f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/capitalise-d688a817dc39cba9.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/deburr-a154d3288ee0dcd2.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/kebabcase-958b2c635e665332.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/lowercase-709d8c5e2f75a49e.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/snakecase-cb797d1832dec2fa.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/uppercase-3ebeee9e5dc33222.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-a225575cdb66884e.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-efb336d32a1a654f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/index-58fc413bd6bf1948.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/posts-a2d51715f9a8df21.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5Bid%5D-9e5f0d0b36866038.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets-0f175902630da476.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-d7ee81078a4734b7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-9ee71ef12083a57f.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-77342e8d9349220b.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-fb5eaa30247218d2.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-3ed98fdcaa292237.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-f01805ec4cc35352.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-7d5aeae1a3bc25dd.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-6afb465af3c595f9.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-26c770fd126d44f9.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-1dc189d162a6f7a9.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-0b53f96c36fa36c3.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-cbf04a02995ef9bb.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-2b04ca4edc7f2d52.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-070e85fc71413707.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-9dcac7f5ccbcf151.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-dd43a5c6e1d8a46a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-04250132baf6e9e7.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-d7c011e4b58abc99.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-9719648acafd3313.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-903ae5d872c582ef.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-bc40ae8bd3db1ece.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-f44709b1a92e62e5.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-f6dc1ca6f81dee34.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-3400e160f5b750dc.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-fe7f7ce6b8f8f5a8.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-170256a5b0fd775c.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-123155a8e32adfb2.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-8e1597c52d7c627a.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-5c974735f13fd355.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-fbc4b9c73523848e.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-35142ab6ffcda060.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: 'vaK_9OObynKQFB9_hj7ny',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
        },
        {
          url: '/_next/static/css/f3992dae9c855df7.css',
          revision: 'f3992dae9c855df7',
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
          url: '/_next/static/vaK_9OObynKQFB9_hj7ny/_buildManifest.js',
          revision: 'a27349443972ad7fb57e52c4e9234b54',
        },
        {
          url: '/_next/static/vaK_9OObynKQFB9_hj7ny/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: 'vaK_9OObynKQFB9_hj7ny',
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
              event: n,
              state: a,
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
