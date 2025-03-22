if (!self.define) {
  let s,
    e = {};
  const t = (t, n) => (
    (t = new URL(t + '.js', n).href),
    e[t] ||
      new Promise((e) => {
        if ('document' in self) {
          const s = document.createElement('script');
          (s.src = t), (s.onload = e), document.head.appendChild(s);
        } else (s = t), importScripts(t), e();
      }).then(() => {
        let s = e[t];
        if (!s) throw new Error(`Module ${t} didn’t register its module`);
        return s;
      })
  );
  self.define = (n, a) => {
    const i =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[i]) return;
    let c = {};
    const r = (s) => t(s, i),
      u = { module: { uri: i }, exports: c, require: r };
    e[i] = Promise.all(n.map((s) => u[s] || r(s))).then((s) => (a(...s), c));
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
          url: '/_next/static/IHn45RQq-NjX9uSx9wXBt/_buildManifest.js',
          revision: '817f9a3c4c0cf4ccc686afd76ce9e852',
        },
        {
          url: '/_next/static/IHn45RQq-NjX9uSx9wXBt/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1314-5582cba5ae032e4d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/5918-babb8d9baf263d29.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/6811-4229ae37b26d5ea3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/6d1efd94-185dff1e9409bc40.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/7649-a95fd8b41ea22ad4.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/8602-88b6133be15ffa14.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/c8a616d4-8a64c2f7cc0fdb4e.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/cc9e852b-47068afb7e862d6d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/main-8aad74cc669db8f5.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/main-app-544ec5050b8db46b.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/404-d565b866425526ff.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/500-76033d87cfe86df4.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/_app-41b942832c5ff374.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/_error-ff7bee13892d7c32.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps-ff7fe81a6d586ec3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-15f38fa69e7a9c60.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-1d1fa97d7872ad5f.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-101a0ae7e5bdf680.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-041ef58d6d62d6e0.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-e15e4cff53e05db0.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-6c578c897dc53cfc.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-e071826b003818e8.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-fb969af592556639.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-0cc42ae63c7c0c25.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-58cd370c73fe3205.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-87708cb94c2da07b.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-422f6cb4d78b62bb.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-0b1daa360928d6e1.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-03a08b259ac81e88.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-ea99e46d2068ae44.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-4a764256dba65d9e.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-9de0d1ea52b17edb.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-adefdc1a93e25531.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-1ac298fe57db7cfe.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-d34650c3b9992b5e.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-8f9166812f7099d1.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-4f3222ac1dbed363.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-6e83a9c0e5558290.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-e46b490f2331cee8.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/xml-4f5fca7ca1c53c72.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-e84b83eada024700.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml-0b665f0a7398c487.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-1c59b5b31accb8ab.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/openapi2postmanv2-ed91f3ad4f27be35.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-0cf179a82e3b203e.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-61b0e464ff99c183.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-a6c4a04dc8dfa89c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-38064029358571d0.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-f927423a2b47c4d2.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-b5b90ee767d0e60d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-8cc928497a6f62ad.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-7d4e9e20ac59d246.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-e7cd3c48df41eea1.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-605d0e5b6fd0b51d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-f2f822601aae204b.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-05b622285e665b56.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/base64-91274b9966bb95ff.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-c14bbdfd249fb806.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-e5190a47b0d033b3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-3a80d8908e73f868.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-81e9c7770a976875.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/instagram-98f420cef36903c6.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-81f2ec3181ec6909.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-76449499b499437f.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-0c859d7ca0c0e41d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-e48105220478f222.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-d2a761aed689325c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string-766b30076ee13e27.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/capitalise-66a0c7f659ddbc35.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/deburr-b642ae5c85edaf58.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/kebabcase-5c5a5334b2fa09e5.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/lowercase-7997fae1f7494755.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/snakecase-f1ea585270474384.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/uppercase-2b8a2b3e1620e584.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-b287e88c5abd65c1.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-cc46b6a0a68a9a95.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/index-33e5bab14e4a6617.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/posts-a3db33382b76547c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5Bid%5D-b242c55509183c7d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets-23b0f8d243b98768.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-ab96f877253823a4.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-2c4d1cb15b2d0bc1.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-cfadb163bb569fcf.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-5b53dee544ca71c0.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-5790b85a019f89cf.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-26600dfba0bb31de.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-92b377c03ff3fcde.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-b2d55855daea3510.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-93b6338edb84a004.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-ba3c02b3a9c4a8c8.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-561bfe7ff2c00f2c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-4fffdf701136cb84.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-19f76e0a3484922a.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-ff544309022582c3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-7b8cbda1f39597cc.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-b44c3c9dc125614b.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-2b9024b6bdb209cf.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-17417e97e4da28e5.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-9e8eaca3a6024bbf.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-57804f8ed76dd087.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-eeebb5a7fd7b65a3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-d61eb5cd924f53ef.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-7439408c1eda0fc4.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-db6721ef5969d3c6.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-3be815ad514e973a.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-b7d01f36829db19d.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-be80e1dc841c1fe7.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-031f26d877832446.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-c5f894df1a4d1bc3.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-06cb135cc17b4f9c.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-0dc8a04b9a4ed09e.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
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
          url: '/_next/static/wasm/80eae4f554bb5227.wasm',
          revision: 'IHn45RQq-NjX9uSx9wXBt',
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
              event: t,
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
