---
name: 'Next.js TechStack'
title: 'Next.js TechStack'
date: '2025-05-11'
---

## Table of Content

- [Table of Content](#table-of-content)
- [Techstack](#techstack)
  - [Development](#development)
    - [`@next-stack/cli`](#next-stackcli)
    - [`@next-stack/test`](#next-stacktest)
    - [`@next-stack/devops`](#next-stackdevops)
  - [Full-stack](#full-stack)
    - [`@next-stack/ui`](#next-stackui)
      - [Components](#components)
    - [`@next-stack/auth`](#next-stackauth)
    - [`@next-stack/server`](#next-stackserver)
  - [Database](#database)
    - [`@next-stack/cache`](#next-stackcache)
    - [`@next-stack/orm`](#next-stackorm)
    - [`@next-stack/search`](#next-stacksearch)
  - [SaaS (Software as a Service)](#saas-software-as-a-service)
    - [`@next-stack/email`](#next-stackemail)
    - [`@next-stack/flags`](#next-stackflags)
    - [`@next-stack/pay`](#next-stackpay)
  - [Other](#other)
    - [`@next-stack/adobe`](#next-stackadobe)
    - [`@next-stack/ai`](#next-stackai)
    - [`@next-stack/browser`](#next-stackbrowser)
    - [`@next-stack/blockchain`](#next-stackblockchain)
    - [`@next-stack/messages`](#next-stackmessages)
    - [`@next-stack/other`](#next-stackother)
- [Ecosystem](#ecosystem)
- [Inspired By](#inspired-by)
  - [JavaScript / TypeScript](#javascript--typescript)
  - [PHP](#php)

## Techstack

### Development

#### `@next-stack/cli`

- [Create T3 App](https://create.t3.gg/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

#### `@next-stack/test`

- **unit**
  - [Jest](https://jestjs.io/)
  - [Vitest](https://vitest.dev/)
- **e2e**
  - [Cypress](https://www.cypress.io/)
  - [Playwright](https://playwright.dev/)

#### `@next-stack/devops`

- Hosting
  - [Vercel](https://vercel.com)
  - [Netlify](https://www.netlify.com/)
- Services
  - [Supabase](https://supabase.com/)
  - [PocketBase](https://pocketbase.io/)

### Full-stack

#### `@next-stack/ui`

- [TailwindCSS](https://tailwindcss.com/)
  - [DaisyUI](https://daisyui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack](https://tanstack.com/)
  - [Charts](https://react-charts.tanstack.com/)
  - [Form](https://tanstack.com/form/latest)
  - [Ranger](https://tanstack.com/ranger/latest)
  - [Table](https://tanstack.com/table/latest)
  - [Virtual](https://tanstack.com/virtual/latest)

##### Components

| Group      | Component |
| ---------- | --------- |
| Form       | Button    |
| Form       | Input     |
| Form       | Textarea  |
| Form       | Select    |
| Form       | Checkbox  |
| Form       | Radio     |
| Form       | Toggle    |
| Form       | Label     |
| Typography | h1        |
| Typography | h2        |
| Typography | h3        |
| Typography | h4        |
| Typography | h5        |
| Typography | h6        |
| Typography | p         |

#### `@next-stack/auth`

- Inspired By
  - [Auth0](https://auth0.com/)
  - [Auth.js](https://authjs.dev/)
  - [BetterAuth](https://www.better-auth.com/)
  - [Clerk](https://clerk.com/)
- Single Sign-on (SSO)
  - [Google](https://www.google.com/)
  - [Facebook](https://www.facebook.com/)
  - [X](https://www.x.com/)
- [OAuth](https://oauth.net/)

#### `@next-stack/server`

- [GraphQL](https://graphql.org/)
- [tRPC](https://trpc.io/)
- [ws](https://github.com/websockets/ws)

### Database

#### `@next-stack/cache`

1. [Memcached](https://memcached.org/)
2. [Redis](https://redis.io/)

#### `@next-stack/orm`

1. [Drizzle](https://orm.drizzle.team/)
2. [Prisma](https://www.prisma.io/)
3. [TypeORM](https://typeorm.io/)

#### `@next-stack/search`

1. [ElasticSearch](https://www.elastic.co/elasticsearch)

### SaaS (Software as a Service)

#### `@next-stack/email`

1. [MailChimp](https://www.mailchimp.com/)
2. [MailGun](https://www.mailgun.com/)
3. [SendGrid](https://sendgrid.com/)

#### `@next-stack/flags`

1. [Flagsmith](https://www.flagsmith.com/)
2. [LaunchDarkly](https://launchdarkly.com/)

#### `@next-stack/pay`

1. [Klarna](https://www.klarna.com/)
2. [Paddle](https://www.paddle.com/)
3. [Stripe](https://stripe.com/)
   1. [Lemon Squeezy](https://www.lemonsqueezy.com/)
4. [Paypal](https://www.paypal.com/)

### Other

#### `@next-stack/adobe`

- Creative Cloud
- Illustrator
- Photoshop
- Lightroom

#### `@next-stack/ai`

1. [OpenAI](https://openai.com/)
2. [Deepseek](https://www.deepseek.com/)
3. [Perplexity](https://www.perplexity.ai/)
4. [Claude](https://claude.ai/)
5. [Gemini](https://gemini.google.com/)

#### `@next-stack/browser`

| #   | Group    | Browser                  | Open Source | Maintainer           | Language | Recommended |
| --- | -------- | ------------------------ | ----------- | -------------------- | -------- | ----------- |
| 1   | Gecko    | [Firefox][firefox]       |             | [Mozilla][mozilla]   |          | Recommended |
| 2   | Gecko    | [Tor][tor]               |             |                      |          |             |
| 3   | WebKit   | [DuckDuckGo][duckduckgo] |             |                      |          |             |
| 4   | WebKit   | [Safari][Safari]         |             | [Apple][apple]       |          |             |
| 5   | Chromium | [Chromium][chromium]     |             | [Alphabet][alphabet] |          |             |
| 6   | Chromium | [Arc][arc]               |             |                      |          |             |
| 7   | Chromium | [Brave][brave]           |             |                      |          |             |
| 8   | Chromium | [Chrome][chrome]         |             | [Alphabet][alphabet] |          |             |
| 9   | Chromium | [Edge][edge]             |             | [Microsoft][ms]      |          |             |
| 10  | Chromium | [Opera][opera]           |             |                      |          |             |
| 11  | Chromium | [Whale][naver-whale]     |             | [Naver][naver]       |          |             |
| 12  | Chromium | [Vivaldi][vivaldi]       |             |                      |          |             |
| 13  | Chromium | [Yandex][yandex]         |             |                      |          |             |

#### `@next-stack/blockchain`

1. [Bitcoin](https://bitcoin.org/)
2. [Ethereum](https://ethereum.org/en/)
3. [Solana](https://solana.com/)
4. [Monero](https://www.getmonero.org/)
5. [Polygon](https://polygon.technology/)

#### `@next-stack/messages`

1. [Discord](https://discord.com/)
2. [Signal](https://signal.org/)
3. [Slack](https://slack.com/)
4. [WhatsApp](https://www.whatsapp.com/)

#### `@next-stack/other`

1. [1.1.1.1](https://one.one.one.one/)
2. Spotify

## Ecosystem

| #   | Type         | Google                            | Microsoft  | Best    |
| --- | ------------ | --------------------------------- | ---------- | ------- |
| 1   | AI           | Gemini                            | Copilot    | ChatGPT |
| 2   | Calendar     | _Calendar_                        | _Calendar_ |         |
| 3   | Email        | Gmail                             | Outlook    |         |
| 4   | Document     | Docs                              | Words      |         |
| 5   | Table        | Sheets                            | Excel      |         |
| 6   | Presentation | Slides                            | PowerPoint |         |
| 7   | Storage      | [Drive](https://drive.google.com) | OneDrive   | Dropbox |
| 8   | Video        | Meet                              | Teams      | Zoom    |
| 9   | Messaging    | Chat                              | Teams      | Slack   |
| 10  | Notes        | Keep                              | OneNote    |         |

## Inspired By

### JavaScript / TypeScript

1. [Create T3 App](https://create.t3.gg/)
2. [Nest.js](https://nestjs.com/)
3. [TanStack](https://tanstack.com/)

### PHP

1. [Laravel](https://laravel.com/)

[alphabet]: https://abc.xyz
[apple]: https://www.apple.com
[mozilla]: https://www.mozilla.org
[arc]: https://arc.net
[brave]: https://brave.com
[chrome]: https://www.google.com/chrome
[chromium]: https://www.chromium.org
[duckduckgo]: https://duckduckgo.com/
[edge]: https://www.microsoft.com/en-us/edge
[firefox]: https://www.mozilla.org/en-US/firefox
[ms]: https://www.microsoft.com
[naver]: https://naver.com
[naver-whale]: https://whale.naver.com
[opera]: https://www.opera.com
[safari]: https://www.apple.com/safari
[tor]: https://www.torproject.org/
[vivaldi]: https://vivaldi.com/
[yandex]: https://browser.yandex.com
