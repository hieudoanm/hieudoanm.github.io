export const INITIAL_CSV: string = `header1,header2,header3,header4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4
value1,value2,value3,value4`;

export const INITIAL_MARKDOWN: string = `# Markdown Cheat Sheet

Thanks for visiting [The Markdown Guide](https://www.markdownguide.org)!

This Markdown cheat sheet provides a quick overview of all the Markdown syntax elements. It can't cover every edge case, so if you need more information about any of these elements, refer to the reference guides for [basic syntax](https://www.markdownguide.org/basic-syntax/) and [extended syntax](https://www.markdownguide.org/extended-syntax/).

## Basic Syntax

These are the elements outlined in John Gruber’s original design document. All Markdown applications support these elements.

### Heading

# H1
## H2
### H3

### Bold

**bold text**

### Italic

*italicized text*

### Blockquote

> blockquote

### Ordered List

1. First item
2. Second item
3. Third item

### Unordered List

- First item
- Second item
- Third item

### Code

\`code\`

### Horizontal Rule

---

### Link

[Markdown Guide](https://www.markdownguide.org)

### Image

![alt text](https://www.markdownguide.org/assets/images/tux.png)

## Extended Syntax

These elements extend the basic syntax by adding additional features. Not all Markdown applications support these elements.

### Table

| Syntax | Description |
| ----------- | ----------- |
| Header | Title |
| Paragraph | Text |

### Fenced Code Block

\`\`\`
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
\`\`\`

### Footnote

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.

### Heading ID

### My Great Heading {#custom-id}

### Definition List

term
: definition

### Strikethrough

~~The world is flat.~~

### Task List

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

### Emoji

That is so funny! :joy:

(See also [Copying and Pasting Emoji](https://www.markdownguide.org/extended-syntax/#copying-and-pasting-emoji))

### Highlight

I need to highlight these ==very important words==.

### Subscript

H~2~O

### Superscript

X^2^`;

export const INITIAL_STRING: string =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse in.';

export const INITIAL_STRING_150: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel porta velit, at accumsan odio. Donec vitae blandit ante. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eu magna sed lorem aliquet cursus. Sed consectetur sed diam nec porta. Duis placerat ligula quis nisi facilisis, in viverra risus interdum. Pellentesque blandit condimentum ex sit amet feugiat. Curabitur porttitor efficitur nisl, sed placerat eros dignissim in. Maecenas facilisis sapien in porta rutrum.

Integer pharetra nisi in est imperdiet, nec tincidunt metus hendrerit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi nec metus eu risus tempus tempus. Etiam facilisis magna at sem volutpat, id varius metus luctus. Vivamus dignissim eros sem, sed facilisis mi porta vel. Nunc vel sem ligula. Aliquam a aliquet mauris. Vestibulum vitae urna at nisl aliquam viverra. Phasellus id orci nec dolor pulvinar maximus tempor in sem. Praesent ac pellentesque felis, non eleifend est.
`;

export const INTIIAL_YAML = `openapi: 3.0.4
info:
  title: Sample API
  description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
  version: 0.1.9

servers:
  - url: http://api.example.com/v1
    description: Optional server description, e.g. Main (production) server
  - url: http://staging-api.example.com
    description: Optional server description, e.g. Internal staging server for testing

paths:
  /users:
    get:
      summary: Returns a list of users.
      description: Optional extended description in CommonMark or HTML.
      responses:
        "200": # status code
          description: A JSON array of user names
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string
`;

export const INITIAL_MANIFEST_EXTENSION = {
  browser_specific_settings: {
    gecko: {
      id: 'addon@example.com',
      strict_min_version: '42.0',
    },
  },
  background: {
    scripts: ['jquery.js', 'my-background.js'],
  },
  browser_action: {
    default_icon: {
      '19': 'button/geo-19.png',
      '38': 'button/geo-38.png',
    },
    default_title: 'Whereami?',
    default_popup: 'popup/geo.html',
  },
  commands: {
    'toggle-feature': {
      suggested_key: {
        default: 'Ctrl+Shift+Y',
        linux: 'Ctrl+Shift+U',
      },
      description: "Send a 'toggle-feature' event",
    },
  },
  content_security_policy:
    "script-src 'self' https://example.com; object-src 'self'",
  content_scripts: [
    {
      exclude_matches: ['*://developer.mozilla.org/*'],
      matches: ['*://*.mozilla.org/*'],
      js: ['borderify.js'],
    },
  ],
  default_locale: 'en',
  description: '…',
  icons: {
    '48': 'icon.png',
    '96': 'icon@2x.png',
  },
  manifest_version: 2,
  name: '…',
  page_action: {
    default_icon: {
      '19': 'button/geo-19.png',
      '38': 'button/geo-38.png',
    },
    default_title: 'Whereami?',
    default_popup: 'popup/geo.html',
  },
  permissions: ['webNavigation'],
  version: '0.1',
  user_scripts: {
    api_script: 'apiscript.js',
  },
  web_accessible_resources: ['images/my-image.png'],
};

export const INITIAL_MANIFEST_PWA = {
  short_name: 'MDN',
  name: 'MDN Web Docs',
  icons: [
    {
      src: '/favicon-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/favicon-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
  start_url: '.',
  display: 'standalone',
  theme_color: '#000000',
  background_color: '#ffffff',
};

export const INTITAL_FEN: string =
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const INITIAL_PGN: string = `[Event "Norway Chess 2017"]
[Site "Stavanger"]
[Date "2017.06.08"]
[Round "3.1"]
[White "Carlsen, Magnus"]
[Black "Nakamura, Hikaru"]
[Result "1/2-1/2"]
[ECO "B90"]
[WhiteElo "2832"]
[BlackElo "2785"]
[PlyCount "80"]
[EventDate "2017.??.??"]
[Whiteclock "0:50:59"]
[Blackclock "0:09:35"]
[Link "https://www.chess.com/news/view/norway-carlsen-nakamura-clash-ends-in-draw-1116"]

1. e4 c5 2. Nf3 ({Last year in Bilbao Carlsen used the move order} 2. Ne2 d6 3.
Nbc3 a6 4. g3 g6 5. Bg2 Bg7 6. d4 cxd4 7. Nxd4 {and eventually Nakaura would win
his first ever classical game against him.}) 2... d6 3. d4 cxd4 4. Nxd4 Nf6 5.
Nc3 a6 6. h3 g6 7. g3 {Nakamura expected this.} 7... Nc6 8. Be3 Bg7 9. Bg2 O-O
10. O-O Nd7 11. b3 {Carlsen said he was "ashamed" of this move as he "didn't
grasp Hikaru's idea at all."} 11... Nxd4 12. Bxd4 Bxd4 13. Qxd4 b6 14. Nd5 Bb7
15. c4 e5 16. Qe3 (16. Qd2) 16... b5 ({Also possible was} 16... Bxd5 17. cxd5 a5
18. Rac1 Nc5 19. a3 a4 20. b4 Nb3 21. Rc6 Nd4 22. Rfc1 {and now} 22... b5 {is
safer than taking the exchange.}) 17. Rac1 bxc4 18. Rxc4 Bxd5 19. exd5 a5 20.
Rfc1 Nc5 {is the same.} 21. a3 f5 {"What he did was insanely risky."
(Carlsen)} ({The world champ expected} 21... a4) 22. b4 axb4 23. axb4 Nd7 (23...
f4 {doesn't work because of} 24. gxf4 exf4 25. Qf3) 24. Rc6 {"Perhaps not such
a good practical choice," said Carlsen.} ({He regretted that he didn't play}
24. b5 {with the idea} 24... Nc5 25. Rxc5 dxc5 26. Qxe5 Re8 27. Qf4) 24... f4
25. gxf4 exf4 26. Qe6+ Rf7 27. Qxd6 ({Carlsen "didn't see anything better" but
Nakamura was a bit concerned about} 27. Rc7 {and rightly so. The engine says}
27... Ra1 $1 {is the only move for an equal position} ({although} 27... f3 28.
Bxf3 Qg5+ 29. Bg2 Qf4 {doesn't look bad either.})) 27... Qg5 28. Kh1 $6 {Carlsen
said he started to miss things here.} ({A slightly better try was} 28. Rc8+ Rxc8
29. Rxc8+ Kg7 {and only then} 30. Kh1 (30. h4 Qg4 $1 (30... Qxh4 31. Rc7))) 28...
f3 29. Bf1 Nf6 {Here Nakamura started to get "really optimistic."} 30. Qe6 Kg7
{Carlsen "completely missed" this move.} ({He was fixated at} 30... Re8 31.
Rc8 Kg7 32. Rxe8 Qxc1 33. Qe1 Qxe1 34. Rxe1) 31. Rc7 $6 ({Here a better try was}
31. d6 Re8 32. Qb3 {and now Black's best try is probably} (32. Qc4 Re4 33. Qc2
Rg4 $1 34. Rc5 $1 Rg1+ 35. Kh2 Rg2+ 36. Kh1 {is a draw}) 32... Re2 {with a mess.})
31... Rxc7 32. Rxc7+ Kh6 33. Qe1 Ra2 34. Re7 Ng4 {Forcing the draw.} ({After the
game Carlsen asked Nakamura why he didn't play} 34... Nxd5 {but the American
player didn't see much of an advantage after} 35. Re5 Qd2 36. Qxd2+ Rxd2 37. b5)
35. hxg4 Qh4+ 36. Kg1 Qxg4+ 37. Kh1 Qh4+ 38. Kg1 Qg4+ 39. Kh1 Qh4+ 40. Kg1 Qg4+
1/2-1/2`;
