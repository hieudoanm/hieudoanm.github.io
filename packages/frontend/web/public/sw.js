if (!self.define) {
  let n,
    s = {};
  const e = (e, t) => (
    (e = new URL(e + '.js', t).href),
    s[e] ||
      new Promise((s) => {
        if ('document' in self) {
          const n = document.createElement('script');
          (n.src = e), (n.onload = s), document.head.appendChild(n);
        } else (n = e), importScripts(e), s();
      }).then(() => {
        let n = s[e];
        if (!n) throw new Error(`Module ${e} didn’t register its module`);
        return n;
      })
  );
  self.define = (t, i) => {
    const c =
      n ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let a = {};
    const o = (n) => e(n, c),
      r = { module: { uri: c }, exports: a, require: o };
    s[c] = Promise.all(t.map((n) => r[n] || o(n))).then((n) => (i(...n), a));
  };
}
define(['./workbox-46b0bab3'], function (n) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    n.clientsClaim(),
    n.precacheAndRoute(
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
          url: '/nothing/_next/static/51P59yKtxRio06Dnc4jXD/_buildManifest.js',
          revision: '6257ed3c4af95fdb14dddee0fadece11',
        },
        {
          url: '/nothing/_next/static/51P59yKtxRio06Dnc4jXD/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/nothing/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/nothing/_next/static/chunks/1782-68b4034db863f82c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/3495-b01e6002d3800b90.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/39c732d3-59b550d94aa0eabc.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/5506-3661ccc81f46c6ba.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/6d1efd94-68f65a841f4bdba7.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/8897-92c68d8d10b43a71.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/992-4b92f6276b954f32.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/d7f847cb-e4eba5bf8a09df3c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/main-7a06ab2bd0eefb0c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/main-app-696435575ca801fa.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/404-28338b5bf63d5e2b.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/500-100e9df60e4413e2.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_app-1b73296f0a604db0.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/_error-548b0f9c0089112c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps-6ec630d0964c4084.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess-d00a0e0871f8a96e.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/bookmarks-4c3af25d56f0f77c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/books/chess960-e942a6723c7bcc62.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/books/openings-5ee2ea5644ed9f86.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/fen2png-e54a39b12c344e87.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/converter/pgn2gif-ce1f25efa92989b4.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/clock-73c93b44a3b336f2.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/chess/tools/elo-c46ae34e6f1148d8.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/clock-9e444c0f16776563.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/clock/epoch-bcc305909e64a160.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/clock/timezones-81a2ecbdbce1baa9.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/clock/widgets-fd8a4f9b9dd2270e.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/colors-7cb65d75109be4bd.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/colors/hex2rgb-612003487a5a8971.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/colors/widgets-893e458b2b09a821.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/braille-be7ac4bfc4540900.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/code/morse-1ff3cbcada14703c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv-af64b1cb7af35210.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/html-d737ae90eff216cd.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/json-b19be3594483d404.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/md-9af882e872e33a0b.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/csv/sql-f4e5e0a24f885edf.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json-e8cd51168451b957.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/csv-3824ae750df6a98d.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/json/yaml-00d64b07e13ea7b1.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/converter/data/yaml/json-9cf6b7316ed418f6.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/manifest.json-46db29b4d5718f54.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/editor/markdown-1b49f55ce3c9d2e4.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/gen.ai-aa58dfcd24b32fc3.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/qrcode-af3ca1d31148ea67.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/generate/uuid-c444184dbd72249b.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github-ff94d2482d9756ff.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/cover-33b29706f052d165.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/github/languages-a87c3e2da6458e0c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/google-29509cc7525873c9.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/google/trends-2a1ec3b4e90049dc.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/google/widgets-bd9ca26bae82777f.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images-f46af23371d75dcf.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/converter/png2ico-2a89133c8c643875.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/converter/svg2png-37f177d08abf97f0.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/filter/golden-a7d4e62d05b742d5.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/images/filter/grayscale-8ab55dade66c41ff.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/instagram-02e13dd5e0b773ac.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/chemistry-4abc717bbd07afcf.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/list/countries-c746143e1252de63.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/ocr-0ddc6e6c8e0e9f8c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/resolution-104d2218e80e0329.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/status-2fcbfa38a19069e1.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/telegram/webhook-fc46bbf7776e9cfe.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/apps/words/english-3e08848078bdb201.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/index-8795844391d27742.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets-54278f6a020f731a.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/all-14c9a4d767733a49.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/battery-a51c1ad6a7512503.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/browser-3b1d908d5a9c5834.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calculator-80e9a72aca76466b.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/calendar-58330b5d6520a329.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/camera-f3e8d0275942a677.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/compass-63589a5c6722630e.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/crypto-82b9e27de759fda6.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/devices-71fc4fc687593e15.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/files-36239e5f181364de.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/fitness-7fb8694ed0cfb36c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/games-f5c8029e3cd0320d.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/health-0171e6c56fd417cd.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/home-0a4b24f7ba755250.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/mail-10a9cb1948c6446c.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/maps-eb6bf44afe19be9f.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/messages-da05a8eddea1c1af.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/music-c1c8eecd6ea69885.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/news-baab22adcde59fa0.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/notes-f2254a4fc5515c18.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/phone-7370b9d7c0a58d6f.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/photos-782d28392e36125f.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/settings-8dd9811f64b831e4.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/sports-124d1e82fed79cb7.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/stocks-047770c9d32bd1ea.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/tasks-0914681d47f1bf28.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/translate-f77fbc743d0df7e8.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/transportation-eecc677ac5c3d214.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/videos-d54fcf26e36e9bac.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/wallet-4bccca60f7fed470.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/pages/widgets/weather-73d9d656d2168bda.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/nothing/_next/static/chunks/webpack-4f5575b795a65899.js',
          revision: '51P59yKtxRio06Dnc4jXD',
        },
        {
          url: '/nothing/_next/static/css/4626ac33cee69978.css',
          revision: '4626ac33cee69978',
        },
        {
          url: '/nothing/_next/static/css/5f808c7bd20cfe21.css',
          revision: '5f808c7bd20cfe21',
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
          url: '/nothing/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: '51P59yKtxRio06Dnc4jXD',
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
          url: '/nothing/fonts/Roboto-Italic.ttf',
          revision: '36440249159c331694a15fb0ff048fdc',
        },
        {
          url: '/nothing/fonts/Roboto-Medium.ttf',
          revision: '6d3a3307e8c63d43bed03d0996d68ab8',
        },
        {
          url: '/nothing/fonts/Roboto-MediumItalic.ttf',
          revision: '8ee39bf1d04dbbf4df9b2bbaeb0b45e9',
        },
        {
          url: '/nothing/fonts/Roboto-Regular.ttf',
          revision: '78d5a59fc4e468531e3e2cfbe1a527f4',
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
        {
          url: '/nothing/workers/gif.worker.js',
          revision: 'dae5d85b26ee82df7e25da09b187af8f',
        },
        {
          url: '/nothing/workers/stockfish.js',
          revision: 'edf0167b75fe8916822afadf21e8c9fb',
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    n.cleanupOutdatedCaches(),
    n.registerRoute(
      '/nothing',
      new n.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: n,
              response: s,
              event: e,
              state: t,
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
    n.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new n.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new n.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new n.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new n.RangeRequestsPlugin(),
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:mp4)$/i,
      new n.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new n.RangeRequestsPlugin(),
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:js)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:css|less)$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new n.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new n.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => {
        if (!(self.origin === n.origin)) return !1;
        const s = n.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new n.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => {
        if (!(self.origin === n.origin)) return !1;
        return !n.pathname.startsWith('/api/');
      },
      new n.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    n.registerRoute(
      ({ url: n }) => !(self.origin === n.origin),
      new n.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new n.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
