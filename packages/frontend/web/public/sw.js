if (!self.define) {
  let s,
    e = {};
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    e[i] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = i), (s.onload = e), document.head.appendChild(s);
        } else (s = i), importScripts(i), e();
      }).then(() => {
        let s = e[i];
        if (!s) throw new Error(`Module ${i} didn’t register its module`);
        return s;
      })
  );
  self.define = (n, a) => {
    const t =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[t]) return;
    let c = {};
    const o = (s) => i(s, t),
      r = { module: { uri: t }, exports: c, require: o };
    e[t] = Promise.all(n.map((s) => r[s] || o(s))).then((s) => (a(...s), c));
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
          url: '/_next/static/8HX3dOh3I271oXhInivHg/_buildManifest.js',
          revision: '948300081e63e7a4f8ec750f4e1f7d0f',
        },
        {
          url: '/_next/static/8HX3dOh3I271oXhInivHg/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/5b79675f-85ea3c7f2ad93a6a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/6d1efd94-1dae5ceee83775c6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/7299-4a2962458cd77647.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/730-5f352de3c8061ff8.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/754ddc71-040ff61c58d6b8fd.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/7614-18520bf77b96549c.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/8173-4a5a717b62b24a85.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/8750-a2e2a63129bc3160.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/main-7e98dbc095b9b8b8.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/main-app-c5a40f94132b8b74.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/404-f3aa27287a70b896.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/500-9e5c338e13f7e88d.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/_app-384f49c7525c03ec.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/_error-1e63c7d8353359ab.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps-74d509399b2d7433.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-3252aae598072168.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-99e279d1a176789c.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-59984d8fb083c112.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-398c2300fdea5590.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-3ec83d5cbd9759ae.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-c18affc49e176cbe.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-ef31f9741032893b.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-658f6f3486e3b565.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-978f391ece59c1b2.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-51e918235547aeb5.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-d3c9562db0159556.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-e3d9dc78c6f6175d.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-0c634eb59c30ffcc.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-9d531af9a8eb9344.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-23336825193258cb.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-1f74e717cba0b02d.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-acfeace32bcaa0c5.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-ae17ea25c61c9687.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-cd5a504135568d72.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-7597c0aedb8b416b.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-f5ad6b8b2fde15b7.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-bf46ba23818940ca.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-1400f73996a1ff17.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-9089c320454a08c5.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-bbaf6aa4e09b172b.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-1a9ebf7a42661998.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-02406a4dab21e399.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-1f33e43de661df11.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-ef6246fa4ac3aa7a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-556ca29766d468ee.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-7c5788ff585b0886.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-4e903dfab184b19a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-8e833bb05c2ec529.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-88857ec7f815def5.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-443fa1eac82ccaca.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-fe885ea3f0ae776f.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-3d670dc746f7e099.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-7a6cd14dfa9d1f10.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-67bbd551c226b9fc.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-9343c80713f72f79.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-358c8221a4ee9484.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-71c989047c7bb61a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/instagram-a019c9e970ceb4c2.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-4fc53a9ad9f0cf9f.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-98e4ea1e4170034a.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-675e2b1ed0edacd6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-c079acc360bf4cc2.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-40bea082d6e7c9fc.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-f4e35d24ab05b147.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-65b0f5f2cb3aca13.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/index-36922d512ae6085e.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets-209367b89b4819c6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-ab1a113f18f72564.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-64af72e3c4737f07.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-5161842c1348512f.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-07831245ae15ed86.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-cd5f84808d0592ca.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-53205f06f8605809.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-d44cbaf7ce7f0590.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-74c94e47828d65f1.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-55b8de57e3d2fccc.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-55d082bc8272d069.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-285535b51b693093.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-5fada77b535f4661.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-e82fe5ed1d475cdd.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-43b8d5541030ec04.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-db8e6ed13ecf43c3.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-64a4b2f6a6fd8bc6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-38898a31d6f00421.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-daa689497ac2d06e.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-07ad4e76e117e088.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-a2d03cb6951ac436.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-270c340d9a865cb6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-0405efddd939037b.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-822f2dfba89278d9.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-a712fb66b7706dfc.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-c3b68deed0a60ea3.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-01e552ffc2c58126.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-60e753fded91f25d.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-1ed33484a985e22f.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-4dc712cddb92ec93.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-c4f2775f0d89a093.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-ffed08aeb4408fb6.js',
          revision: '8HX3dOh3I271oXhInivHg',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: '8HX3dOh3I271oXhInivHg',
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
          url: '/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: '8HX3dOh3I271oXhInivHg',
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
              event: i,
              state: n,
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
