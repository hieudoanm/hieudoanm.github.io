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

export const INITIAL_TELEGRAM_WEBHOOK = {
  token: '',
  webhook: '',
};
