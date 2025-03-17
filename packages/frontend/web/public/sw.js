if (!self.define) {
  let s,
    e = {};
  const i = (i, c) => (
    (i = new URL(i + '.js', c).href),
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
  self.define = (c, a) => {
    const t =
      s ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (e[t]) return;
    let n = {};
    const g = (s) => i(s, t),
      r = { module: { uri: t }, exports: n, require: g };
    e[t] = Promise.all(c.map((s) => r[s] || g(s))).then((s) => (a(...s), n));
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
          url: '/_next/static/Dlgz5bAeXH3_3ci3sIggI/_buildManifest.js',
          revision: 'b70dff949e328c36d515000467fbaf60',
        },
        {
          url: '/_next/static/Dlgz5bAeXH3_3ci3sIggI/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/1646.94ba75b36b7ac842.js',
          revision: '94ba75b36b7ac842',
        },
        {
          url: '/_next/static/chunks/24-e2e8c50ecc86dbab.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/2515-79de49b7db3f1d9c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/3620-e29bdad7008b36f1.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/4385-5ac14eb5266c9aa5.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/5163ca1c-a1199f4643217b18.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/5962-edcc007ac210e745.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/5b79675f-85ea3c7f2ad93a6a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/6335-c9815eae8de24e1a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/6d1efd94-185dff1e9409bc40.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/7466-581ea2f0ae587a8c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/7700-55e7a1df39745771.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/8863-5ecd7162908a3e06.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/b51d1a98-30971278b38e7bce.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/bf9d8ce5-9f7306c40178035c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/framework-da1c48dc673ca549.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/main-a19e8d07085146fb.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/main-app-0297771a67cc741a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/404-f92401d257eb65c0.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/500-5c3d3df19e1f1499.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/_app-d8074d6686aa5b45.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/_error-8996b75f37243f2f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps-8b33d9708ef03e8a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess-675d46ad0ef09cd8.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/bookmarks-7de577ddc2208178.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/chess960-a68db6611be92835.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/books/openings-67ce154cbf82e32f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/fen2png-109988d712ca21c3.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/converter/pgn2gif-3a5919cff070ed51.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/clock-7fd0bd2eb0caf9f8.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/chess/tools/elo-4c9296db89ea1891.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock-cf1327c874f4e09a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/epoch-409f7f2dba104815.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/timezones-3acb806c79a6a532.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/clock/widgets-2dd220fe45525142.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors-776d439d61f3fb2d.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/hex2rgb-48b00debb693394e.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/colors/widgets-39ee1796ced7dfc3.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/braille-0d2756b6c3ada838.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/code/morse-5a7abad984d11ea1.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv-1bba2bbc66808199.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/html-244ba129d0567355.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/json-84613b135058943e.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/md-6d9da0b2e9d07d00.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/csv/sql-70f03cfdd6430e8d.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json-d97544af833c7d9e.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/csv-edbb8877b76ae4cb.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/xml-d6446cf605b3b1df.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/json/yaml-bd5ffe1d7fff7f2b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml-8fa8744c62af486d.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/json-f2af89f8471e4e7e.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/converter/data/yaml/openapi2postmanv2-5d086862af3392bb.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/manifest.json-bb911076d0684116.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/editor/markdown-5092d2a259240f8c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/gen.ai-bea11a3158c97509.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/qrcode-2f9019060083d6e4.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/generate/uuid-7cdee6019b9e4f91.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/github-750b45a09fd87280.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/cover-4d50710f70f53ab2.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/github/languages-a1605ffcec06b9c0.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/google-f7b73f9d6a88309b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/trends-e89c1b52b91cb6c2.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/google/widgets-4bffa33fc28c32b9.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images-9deec90143a35d2f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/base64-d1f5ec9cf766d2d6.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/png2ico-5255eb943a76110c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/converter/svg2png-49a5095c74ea8c72.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/golden-d8636e782057c55f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/filter/grayscale-2e64fbaef1d5cc5c.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/images/instagram-363a4c8a10637aa4.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/chemistry-f3ed53b9301c9114.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/list/countries-50a9b50d4e3a13b6.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/ocr-5393c4ed6eda2504.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/resolution-78da48e589b6dabd.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/status-b765a5c1e82612cd.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string-c95fe0a3bc64286b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/capitalise-65da3d477567ba2a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/deburr-8980633d58ac371b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/kebabcase-8e01b5cfd281e422.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/lowercase-d879ce1655ac24af.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/snakecase-e9b32cbe871c2950.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/string/uppercase-ebb9226c600aa52f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/telegram/webhook-2b2cefb4fd2350ea.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/apps/words/english-86f365256bffb451.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/index-16681eb3c05bbc3b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/posts-394c393f8864ee9e.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/posts/%5Bid%5D-23ea32559859b640.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets-93a2a3f7d15ce152.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/all-d2e5b0629c3ad706.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/battery-bc2d4463a1faee23.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/browser-275501800fcb8d12.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calculator-298c4c75e902167b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/calendar-11bc46bd38cd1288.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/camera-2ecccf9c80bb8afa.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/compass-cc5351b028a00b45.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/crypto-21b44a101cda4b04.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/devices-83ff5deaf2d0c316.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/files-c50b5be36db97e9b.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/fitness-4f56bf04e359fa9a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/games-486628c245fc97a5.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/health-546ef4b95dc39e04.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/home-899b970ede526aed.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/mail-0b2530f13b3d0db9.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/maps-320b7dd857c4c86d.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/messages-c3ee42e7d8c94d3a.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/music-3012f2f2ad0b7323.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/news-c67e3da10ea778ce.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/notes-1ed80eb590a38221.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/phone-d2796899ab4f0315.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/photos-cdcb8a6ed7d22df3.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/settings-07c7d25c2edc2880.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/sports-e8e7bceafc491933.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/stocks-f8ba4dbcae675749.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/tasks-cf105c4998fc020f.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/translate-95adfc6a5b4ac9d7.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/transportation-9631dba9417edf6d.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/videos-b786f8bdd1337fbe.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/wallet-3dc0dd72c0f4f832.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/pages/widgets/weather-20ffee3bfafc9451.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-ca25dbde007283fc.js',
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
        },
        {
          url: '/_next/static/css/599a6cb87c5bd873.css',
          revision: '599a6cb87c5bd873',
        },
        {
          url: '/_next/static/css/eb1c8d761f2e296e.css',
          revision: 'eb1c8d761f2e296e',
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
          revision: 'Dlgz5bAeXH3_3ci3sIggI',
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
              state: c,
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
