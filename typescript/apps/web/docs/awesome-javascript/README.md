# JavaScript

## Table of Content

<!-- - [JavaScript](#javascript)
  - [Table of Content](#table-of-content)
  - [Abbreviation](#abbreviation)
  - [Nominations](#nominations)
    - [Operating Systems](#operating-systems)
    - [Browsers](#browsers)
    - [Engines](#engines)
    - [Runtimes](#runtimes)
    - [Packages Managers](#packages-managers)
    - [Monorepos](#monorepos)
    - [Linters](#linters)
    - [Unit Tests](#unit-tests)
    - [E2E Tests](#e2e-tests)
    - [Bundlers](#bundlers)
    - [CSS Components](#css-components)
    - [React Components](#react-components)
    - [Web Frameworks](#web-frameworks)
    - [Meta Frameworks](#meta-frameworks)
    - [Mobile Frameworks](#mobile-frameworks)
    - [Desktop Frameworks](#desktop-frameworks)
    - [HTTP Frameworks](#http-frameworks)
    - [GraphQL Frameworks](#graphql-frameworks)
    - [Back-end Frameworks](#back-end-frameworks)
    - [Object Relational Mapping](#object-relational-mapping)
    - [Relational Databases](#relational-databases)
    - [Messages](#messages)
    - [SaaS - Authentication](#saas---authentication)
    - [SaaS - Email](#saas---email)
    - [SaaS - Payment](#saas---payment)
    - [Serverless](#serverless)
    - [Platform as a Service](#platform-as-a-service)
    - [Back-end as a Service](#back-end-as-a-service)
    - [Infrastructure as a Service](#infrastructure-as-a-service)
  - [Techstack](#techstack)
  - [References](#references) -->

## Abbreviation

- AI : Artificial Intelligence
- AWS : Amazon Web Services
- BaaS : Back-end as a Service
- CI/CD : Continuous Integration / Continuous Delivery
- CLI : Command Line Interface
- CSR : Client-side Rendering
- CSS : Cascading Style Sheets
- E2E : End-to-end
- IaC : Infrastructure as Code
- IaaS : Infrastructure as a Service
- IDE : Integrated Development Environment
- JS : JavaScript
- LLM : Large Language Model
- MVC : Model-View-Controller
- PaaS : Platform as a Service
- ORM : Object Relational Mapping
- OS : Operating System
- RPC : Remote Procedure Call
- SaaS : Software as a Service
- SASS : Syntactically Awesome Style Sheets
- SSG : Static Site Generation
- SSR : Server-Side Rendering
- TS : TypeScript
- UI : User Interface

[⬆️ Back to Table of Content](#table-of-content)

## Nominations

### Operating Systems

| Industry    | Supersector | Sector          | Subsector | Technology         | Open Source | Maintainer      | Language | Recommended |
| ----------- | ----------- | --------------- | --------- | ------------------ | ----------- | --------------- | -------- | ----------- |
| Development | OS          | [Linux][kernel] |           | [Debian][debian]   |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Mint][linuxmint]  |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Ubuntu][ubuntu]   |             |                 |          | Recommended |
| Development | OS          | Unix            |           | [macOS][macos]     |             | [Apple][apple]  |          |             |
| Development | OS          | OS/2            |           | [Windows][windows] |             | [Microsoft][ms] |          |             |

[⬆️ Back to Table of Content](#table-of-content)

### Browsers

| Industry    | Supersector | Sector  | Subsector | Technology           | Open Source | Maintainer           | Language | Recommended |
| ----------- | ----------- | ------- | --------- | -------------------- | ----------- | -------------------- | -------- | ----------- |
| Development | Software    | Browser |           | [Firefox][firefox]   |             | [Mozilla][mozilla]   |          | Recommended |
| Development | Software    | Browser |           | [Safari][Safari]     |             | [Apple][apple]       |          |             |
| Development | Software    | Browser |           | [Chromium][chromium] |             | [Alphabet][alphabet] |          |             |
| Development | Software    | Browser | Chromium  | [Arc][arc]           |             |                      |          |             |
| Development | Software    | Browser | Chromium  | [Brave][brave]       |             |                      |          |             |
| Development | Software    | Browser | Chromium  | [Chrome][chrome]     |             | [Alphabet][alphabet] |          |             |
| Development | Software    | Browser | Chromium  | [Edge][edge]         |             | [Microsoft][ms]      |          |             |
| Development | Software    | Browser | Chromium  | [Opera][opera]       |             |                      |          |             |
| Development | Software    | Browser | Chromium  | [Whale][naver-whale] |             | [Naver][naver]       |          |             |
| Development | Software    | Browser | Chromium  | [Yandex][yandex]     |             |                      |          |             |

[⬆️ Back to Table of Content](#table-of-content)

### Engines

| Industry    | Supersector | Sector | Subsector | Technology                   | Open Source                 | Maintainer           | Language | Recommended |
| ----------- | ----------- | ------ | --------- | ---------------------------- | --------------------------- | -------------------- | -------- | ----------- |
| Development | Engine      |        |           | [Hermes][hermes]             | [GitHub][gh-meta-hermes]    | [Meta][meta]         | C++      |             |
| Development | Engine      |        |           | [JavaScriptCore][jsc]        | [GitHub][gh-javascriptcore] | [Apple][apple]       | C++      |             |
| Development | Engine      |        |           | [QuickJS][quickjs]           | [GitHub][gh-quickjs]        |                      | C        |             |
| Development | Engine      |        |           | [SpiderMonkey][spidermonkey] |                             | [Mozilla][mozilla]   | C++      |             |
| Development | Engine      |        |           | [V8][v8]                     | [GitHub][gh-v8]             | [Alphabet][alphabet] | C++      | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### Runtimes

| Industry    | Supersector | Sector                       | Subsector | Technology                 | Open Source           | Maintainer        | Language   | Recommended |
| ----------- | ----------- | ---------------------------- | --------- | -------------------------- | --------------------- | ----------------- | ---------- | ----------- |
| Development | Runtime     | [JavaScriptCore][jsc]        |           | [Bun][bun]                 | [GitHub][gh-bun]      |                   | [Zig][zig] |             |
| Development | Runtime     | [QuickJS][quickjs]           |           | LLRT (Low Latency Runtime) | [GitHub][gh-llrt]     | [AWS][aws]        | [JS][js]   |             |
| Development | Runtime     | [V8][v8]                     |           | [Deno][deno]               | [GitHub][gh-deno]     |                   | [Rust][rs] |             |
| Development | Runtime     | [V8][v8]                     |           | [Node.js][node.js]         | [GitHub][gh-node]     | [OpenJS][openjsf] | [JS][js]   | Recommended |
| Development | Runtime     | [SpiderMonkey][spidermonkey] |           | WinterJS                   | [GitHub][gh-winterjs] |                   | [JS][js]   |             |

[⬆️ Back to Table of Content](#table-of-content)

### Packages Managers

| Industry    | Supersector       | Sector   | Subsector | Technology       | Open Source       | Maintainer      | Language   | Recommended |
| ----------- | ----------------- | -------- | --------- | ---------------- | ----------------- | --------------- | ---------- | ----------- |
| Development | Development Tools | Packages | Manager   | [npm CLI][npmjs] | [GitHub][github]  | [Microsoft][ms] | [JS][js]   |             |
| Development | Development Tools | Packages | Manager   | [pnpm][pnpm]     | [GitHub][gh-pnpm] |                 | [TS][ts]   |             |
| Development | Development Tools | Packages | Manager   | [yarn][yarn]     | [GitHub][gh-yarn] | [Meta][meta]    | [TS][ts]   | Recommended |
| Development | Development Tools | Packages | Manager   | [Volt][volt]     | [GitHub][gh-volt] |                 | [Rust][rs] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Monorepos

| Industry    | Supersector       | Sector   | Subsector | Technology                         | Open Source               | Maintainer       | Language   | Recommended |
| ----------- | ----------------- | -------- | --------- | ---------------------------------- | ------------------------- | ---------------- | ---------- | ----------- |
| Development | Development Tools | Monorepo |           | [Bit][bit]                         | [GitHub][gh-bit]          |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [NX][nx]                           | [GitHub][gh-nx]           |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [Lerna][lerna]                     | [GitHub][gh-lerna]        |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [pnpm Workspaces][pnpm-workspaces] | [GitHub][gh-pnpm]         |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [Turbo][turbo]                     | [GitHub][gh-vercel-turbo] | [Vercel][vercel] | [Rust][rs] | Recommended |
| Development | Development Tools | Monorepo |           | [Yarn Workspaces][yarn-workspaces] | [GitHub][gh-yarn]         |                  | [TS][ts]   |             |

[⬆️ Back to Table of Content](#table-of-content)

### Linters

| Industry    | Supersector       | Sector  | Subsector | Technology                 | Open Source              | Maintainer        | Language | Recommended |
| ----------- | ----------------- | ------- | --------- | -------------------------- | ------------------------ | ----------------- | -------- | ----------- |
| Development | Development Tools | Linters |           | [ESLint][eslint]           | [GitHub][gh-eslint]      | [OpenJS][openjsf] | [JS][js] | Recommended |
| Development | Development Tools | Linters |           | [JSLint][jslint]           | [GitHub][gh-jslint]      |                   | [JS][js] |             |
| Development | Development Tools | Linters |           | [StandardJS][standardjs]   | [GitHub][gh-standardjs]  |                   | [JS][js] |             |
| Development | Development Tools | Linters |           | [MillionLint][millionlint] | [GitHub][gh-millionlint] |                   | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Unit Tests

| Industry    | Supersector       | Sector  | Subsector | Technology                         | Open Source                  | Maintainer        | Language | Recommended |
| ----------- | ----------------- | ------- | --------- | ---------------------------------- | ---------------------------- | ----------------- | -------- | ----------- |
| Development | Development Tools | Testing | Unit Test | [Jasmine][jasmine]                 | [GitHub][gh-jasmine]         |                   | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Jest][jest]                       | [GitHub][gh-jest]            | [OpenJS][openjsf] | [TS][ts] | Recommended |
| Development | Development Tools | Testing | Unit Test | [Mocha][mocha]                     | [GitHub][gh-mocha]           | [OpenJS][openjsf] | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Testing Library][testing-library] | [GitHub][gh-testing-library] |                   | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Vitest][vitest]                   | [GitHub][gh-vitest]          |                   | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### E2E Tests

| Industry    | Supersector       | Sector  | Subsector | Technology               | Open Source                | Maintainer      | Language     | Recommended |
| ----------- | ----------------- | ------- | --------- | ------------------------ | -------------------------- | --------------- | ------------ | ----------- |
| Development | Development Tools | Testing | E2E Test  | [Cypress][cypress]       | [GitHub][gh-cypress]       |                 | [JS][js]     | Recommended |
| Development | Development Tools | Testing | E2E Test  | [Karma][karma]           | [GitHub][gh-karma]         |                 | [JS][js]     |             |
| Development | Development Tools | Testing | E2E Test  | [Playwright][playwright] | [GitHub][gh-ms-playwright] | [Microsoft][ms] | [TS][ts]     |             |
| Development | Development Tools | Testing | E2E Test  | [Puppeteer][puppeteer]   | [GitHub][gh-puppeteer]     |                 | [TS][ts]     |             |
| Development | Development Tools | Testing | E2E Test  | [Selenium][selenium]     | [GitHub][gh-selenium]      |                 | [Java][java] |             |
| Development | Development Tools | Testing | E2E Test  | [Storybook][storybook]   | [GitHub][gh-storybook]     |                 | [TS][ts]     |             |

[⬆️ Back to Table of Content](#table-of-content)

### Bundlers

| Industry    | Supersector | Sector  | Subsector | Technology         | Open Source          | Maintainer | Language   | Recommended |
| ----------- | ----------- | ------- | --------- | ------------------ | -------------------- | ---------- | ---------- | ----------- |
| Development | Build Tools | Bundler |           | [ESBuild][esbuild] | [GitHub][gh-esbuild] |            | [Go][go]   |             |
| Development | Build Tools | Bundler |           | [Parcel][parceljs] | [GitHub][gh-parcel]  |            | [JS][js]   |             |
| Development | Build Tools | Bundler |           | [Rollup][rollup]   | [GitHub][gh-rollup]  |            | [JS][js]   |             |
| Development | Build Tools | Bundler |           | [Rspack][rspack]   | [GitHub][gh-rspack]  |            | [Rust][rs] |             |
| Development | Build Tools | Bundler |           | [Webpack][webpack] | [GitHub][gh-webpack] |            | [JS][js]   | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### CSS Components

| Industry  | Supersector | Sector     | Subsector                   | Technology                        | Open Source                  | Maintainer | Language     | Recommended |
| --------- | ----------- | ---------- | --------------------------- | --------------------------------- | ---------------------------- | ---------- | ------------ | ----------- |
| Front-end | Styling     | Components | [Tailwind CSS][tailwindcss] | [DaisyUI][daisyui]                | [GitHub][gh-daisy-ui]        |            | CSS          | Recommended |
| Front-end | Styling     | Components | [Tailwind CSS][tailwindcss] | [TailwindUI][tailwind-ui]         | Freemium                     |            |              |             |
| Front-end | Styling     | Components | Toolkit                     | [Bootstrap][bootstrap]            | [GitHub][gh-bootstrap]       |            | [JS][js]     |             |
| Front-end | Styling     | Components | Toolkit                     | [Bulma][bulma]                    | [GitHub][gh-bulma]           |            | [SASS][sass] |             |
| Front-end | Styling     | Components | Toolkit                     | [Materialize CSS][materializecss] | [GitHub][gh-materialize-css] |            | [TS][ts]     |             |
| Front-end | Styling     | Components | Toolkit                     | [shadcn/ui][shadcn]               | [GitHub][gh-shadcn-ui]       |            | [TS][ts]     |             |
| Front-end | Styling     | Components | Toolkit                     | [UIKit][uikit]                    | [GitHub][gh-uikit]           |            | [SASS][sass] |             |

[⬆️ Back to Table of Content](#table-of-content)

### React Components

| Industry  | Supersector | Sector     | Subsector  | Technology               | Open Source             | Maintainer       | Language | Recommended |
| --------- | ----------- | ---------- | ---------- | ------------------------ | ----------------------- | ---------------- | -------- | ----------- |
| Front-end | Styling     | Components | [JSX][jsx] | [Ant Design][ant-design] | [GitHub][gh-ant-design] |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [Chakra UI][chakra-ui]   | [GitHub][gh-chakra-ui]  |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [MUI][mui]               | [GitHub][gh-mui]        |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [NextUI][next-ui]        | [GitHub][gh-next-ui]    | [Vercel][vercel] | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [Theme UI][theme-ui]     | [GitHub][gh-theme-ui]   |                  | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Web Frameworks

| Industry  | Supersector   | Sector         | Subsector | Technology              | Open Source             | Maintainer           | Language | Recommended |
| --------- | ------------- | -------------- | --------- | ----------------------- | ----------------------- | -------------------- | -------- | ----------- |
| Front-end | Web Framework | MVC            |           | [Angular][angular]      | [GitHub][gh-angular]    | [Alphabet][alphabet] | [TS][ts] |             |
| Front-end | Web Framework | MVC            |           | [AngularJS][angularjs]  | [GitHub][gh-angular-js] | [Alphabet][alphabet] | [JS][js] |             |
| Front-end | Web Framework | MVC            |           | [Backbone.js][backbone] | [GitHub][gh-backbone]   |                      | [JS][js] |             |
| Front-end | Web Framework | MVC            |           | [Ember.js][ember]       | [GitHub][gh-ember]      |                      | [JS][js] |             |
| Front-end | Web Framework | MVC            |           | [Svelte][svelte]        | [GitHub][gh-svelte]     | [Vercel][vercel]     | [JS][js] |             |
| Front-end | Web Framework | MVC            |           | [Vue.js][vue]           | [GitHub][gh-vue]        |                      | [TS][ts] |             |
| Front-end | Web Framework | [JSX][jsx]     |           | [React][react]          | [GitHub][gh-meta-react] | [Meta][meta]         | [JS][js] | Recommended |
| Front-end | Web Framework | [JSX][jsx]     |           | [Solid.js][solid]       | [GitHub][gh-solid]      |                      | [TS][ts] |             |
| Front-end | Web Framework | [React][react] |           | [Preact][preact]        | [GitHub][gh-preact]     |                      | [JS][js] |             |
| Front-end | Web Framework | [React][react] |           | [Qwik][qwik]            | [GitHub][gh-qwik]       |                      | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Meta Frameworks

| Industry  | Supersector    | Sector | Subsector        | Technology                | Open Source              | Maintainer       | Language | Recommended |
| --------- | -------------- | ------ | ---------------- | ------------------------- | ------------------------ | ---------------- | -------- | ----------- |
| Front-end | Meta Framework | SSR    | [React][react]   | [Next.js][next.js]        | [GitHub][gh-vercel-next] | [Vercel][vercel] | [JS][js] | Recommended |
| Front-end | Meta Framework | SSR    | [React][react]   | [Remix][remix]            | [GitHub][gh-remix]       |                  | [TS][ts] |             |
| Front-end | Meta Framework | SSR    | [Solid][solid]   | [SolidStart][solid-start] | [GitHub][gh-solid-start] |                  | [TS][ts] |             |
| Front-end | Meta Framework | SSR    | [Svelte][svelte] | [SvelteKit][svelte-kit]   | [GitHub][gh-svelte-kit]  | [Vercel][vercel] | [JS][js] |             |
| Front-end | Meta Framework | SSR    | [Vue][vue]       | [Nuxt][nuxt]              | [GitHub][gh-nuxt]        |                  | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Mobile Frameworks

| Industry  | Supersector      | Sector             | Subsector | Technology                     | Open Source                | Maintainer        | Language | Recommended |
| --------- | ---------------- | ------------------ | --------- | ------------------------------ | -------------------------- | ----------------- | -------- | ----------- |
| Front-end | Mobile Framework |                    |           | [Ionic][ionic]                 | [GitHub][gh-ionic]         |                   | [TS][ts] |             |
| Front-end | Mobile Framework |                    |           | [NativeScript][nativescript]   | [GitHub][gh-nativescript]  | [OpenJS][openjsf] | [TS][ts] |             |
| Front-end | Mobile Framework | [React][react]     |           | [React Native][rn]             | [GitHub][gh-meta-rn]       |                   | C++      |             |
| Front-end | Mobile Framework | [React Native][rn] |           | [Expo][expo]                   | [GitHub][gh-expo]          |                   | [TS][ts] | Recommended |
| Front-end | Mobile Framework | [Svelte][svelte]   |           | [Svelte Native][svelte-native] | [GitHub][gh-svelte-native] |                   | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Desktop Frameworks

| Industry  | Supersector       | Sector   | Subsector | Technology                | Open Source           | Maintainer        | Language   | Recommended |
| --------- | ----------------- | -------- | --------- | ------------------------- | --------------------- | ----------------- | ---------- | ----------- |
| Front-end | Desktop Framework | Chromium |           | [Electron.js][electronjs] | [GitHub][gh-electron] | [OpenJS][openjsf] | C++        |             |
| Front-end | Desktop Framework | WebView  |           | [Tauri][tauri]            | [GitHub][gh-tauri]    |                   | [Rust][rs] | Recommended |
| Front-end | Desktop Framework | WebView  |           | [Wails][wails]            | [GitHub][gh-wails]    |                   | [Go][go]   |             |
| Front-end | Desktop Framework |          |           | [Meteor][meteor]          | [GitHub][gh-meteor]   |                   | [JS][js]   |             |
| Front-end | Desktop Framework |          |           | [Quasar][quasar]          | [GitHub][gh-quasar]   |                   | [JS][js]   |             |

[⬆️ Back to Table of Content](#table-of-content)

### HTTP Frameworks

| Industry | Supersector | Sector | Subsector | Technology              | Open Source          | Maintainer        | Language | Recommended |
| -------- | ----------- | ------ | --------- | ----------------------- | -------------------- | ----------------- | -------- | ----------- |
| Back-end | Framework   | HTTP   |           | [Express.js][expressjs] | [GitHub][gh-express] | [OpenJS][openjsf] | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Fastify][fastify]      | [GitHub][gh-fastify] | [OpenJS][openjsf] | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Hapi][hapi]            | [GitHub][gh-hapi]    |                   | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Koa][koa]              | [GitHub][gh-koa]     |                   | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Nest.js][nest.js]      | [GitHub][gh-nest]    |                   | [TS][ts] | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### GraphQL Frameworks

| Industry | Supersector | Sector             | Subsector | Technology                     | Open Source                | Maintainer       | Language | Recommended |
| -------- | ----------- | ------------------ | --------- | ------------------------------ | -------------------------- | ---------------- | -------- | ----------- |
| Back-end | Framework   | [GraphQL][graphql] |           | [GraphQL][graphql]             | [GitHub][gh-graphql]       | [Meta][meta]     | [TS][ts] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Apollo Server][apollo-server] | [GitHub][gh-apollo-server] | [Apollo][apollo] | [TS][ts] | Recommended |
| Back-end | Framework   | [GraphQL][graphql] |           | [Garph][garph]                 | [GitHub][gh-garph]         |                  | [TS][ts] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Mercurius][mercurius]         | [GitHub][gh-mercurius]     |                  | [JS][js] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Yoga][yoga]                   | [GitHub][gh-yoga]          |                  | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Back-end Frameworks

| Industry | Supersector | Sector    | Subsector | Technology             | Open Source         | Maintainer           | Language | Recommended |
| -------- | ----------- | --------- | --------- | ---------------------- | ------------------- | -------------------- | -------- | ----------- |
| Back-end | Framework   | RPC       |           | [gRPC][grpc]           | [GitHub][gh-grpc]   | [Alphabet][alphabet] | [TS][ts] |             |
| Back-end | Framework   | RPC       |           | [tRPC][trpc]           | [GitHub][gh-trpc]   |                      | [TS][ts] | Recommended |
| Back-end | Framework   | WebSocket |           | [Socket.io][socket.io] | [GitHub][gh-socket] |                      | [TS][ts] | Recommended |
| Back-end | Framework   | WebSocket |           | [SockJS][sockjs]       | [GitHub][gh-sockjs] |                      | [JS][js] |             |
| Back-end | Framework   | WebSocket |           | WS                     | [GitHub][gh-ws]     |                      | [JS][js] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Object Relational Mapping

| Industry | Supersector | Sector | Subsector   | Technology             | Open Source            | Maintainer | Language | Recommended |
| -------- | ----------- | ------ | ----------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| Back-end | Database    | ORM    | SQL & NoSQL | [MikroORM][mikro-orm]  | [GitHub][gh-mikro-orm] |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL & NoSQL | [Prisma][prisma]       | [GitHub][gh-prisma]    |            | [TS][ts] | Recommended |
| Back-end | Database    | ORM    | SQL & NoSQL | [TypeORM][typeorm]     | [GitHub][gh-typeorm]   |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL         | [Drizzle][drizzle]     | [GitHub][gh-drizzle]   |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL         | [Sequelize][sequelize] | [GitHub][gh-sequelize] |            | [JS][js] |             |
| Back-end | Database    | ORM    | NoSQL       | [Mongoose][mongoose]   | [GitHub][gh-mongoose]  |            | [JS][js] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Relational Databases

| Industry | Supersector | Sector     | Subsector | Technology                 | Open Source             | Maintainer | Language | Recommended |
| -------- | ----------- | ---------- | --------- | -------------------------- | ----------------------- | ---------- | -------- | ----------- |
| Back-end | Database    | Relational |           | [CockroachDB][cockroachdb] | [GitHub][gh-cockroach]  |            | [Go][go] |             |
| Back-end | Database    | Relational |           | [MariaDB][mariadb]         | [GitHub][gh-mariadb]    |            | C++      |             |
| Back-end | Database    | Relational |           | [MySQL][mysql]             | [GitHub][gh-mysql]      |            | C++      |             |
| Back-end | Database    | Relational |           | [PostgreSQL][postgresql]   | [GitHub][gh-postgresql] |            | C        | Recommended |
| Back-end | Database    | Relational |           | [SQLite][sqlite]           | [GitHub][gh-sqlite]     |            | C        |             |

[⬆️ Back to Table of Content](#table-of-content)

### Messages

| Industry | Supersector | Sector              | Subsector | Technology                  | Open Source                  | Maintainer       | Language     | Recommended |
| -------- | ----------- | ------------------- | --------- | --------------------------- | ---------------------------- | ---------------- | ------------ | ----------- |
| Back-end | Messages    | Broker              |           | [ActiveMQ][apache-activemq] | [GitHub][gh-apache-activemq] | [Apache][apache] | [Java][java] |             |
| Back-end | Messages    | Broker              |           | [Kafka][apache-kafka]       | [GitHub][gh-apache-kafka]    | [Apache][apache] | [Java][java] | Recommended |
| Back-end | Messages    | Broker              |           | [RabbitMQ][rabbitmq]        | [GitHub][gh-rabbitmq]        |                  | Starlark     |             |
| Back-end | Messages    | Publish / Subscribe |           | [MQTT][mqtt]                |                              |                  |              |             |
| Back-end | Messages    | Publish / Subscribe |           | [NATS][nats]                | [GitHub][gh-nats]            |                  | [Go][go]     |             |

[⬆️ Back to Table of Content](#table-of-content)

### SaaS - Authentication

| Industry | Supersector | Sector | Subsector      | Technology           | Open Source           | Maintainer | Language     | Recommended |
| -------- | ----------- | ------ | -------------- | -------------------- | --------------------- | ---------- | ------------ | ----------- |
| DevOps   | Application | SaaS   | Authentication | [Auth0][auth0]       | [GitHub][gh-auth0]    |            | [TS][ts]     | Recommended |
| DevOps   | Application | SaaS   | Authentication | [Clerk][clerk]       | [GitHub][gh-clerk]    |            | [TS][ts]     |             |
| DevOps   | Application | SaaS   | Authentication | [Keycloak][keycloak] | [GitHub][gh-keycloak] |            | [Java][java] |             |
| DevOps   | Application | SaaS   | Authentication | [OneLogin][onelogin] | [GitHub][gh-onelogin] |            | [TS][ts]     |             |
| DevOps   | Application | SaaS   | Authentication | [OSSO][osso]         | [GitHub][gh-osso]     |            | [TS][ts]     |             |
| DevOps   | Application | SaaS   | Authentication | [Zitadel][zitadel]   | [GitHub][gh-zitadel]  |            | [Go][go]     |             |

[⬆️ Back to Table of Content](#table-of-content)

### SaaS - Email

| Industry | Supersector | Sector | Subsector | Technology             | Open Source            | Maintainer | Language | Recommended |
| -------- | ----------- | ------ | --------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| DevOps   | Application | SaaS   | Email     | [SendGrid][sendgrid]   | [GitHub][gh-sendgrid]  |            | [JS][js] | Recommended |
| DevOps   | Application | SaaS   | Email     | [Mailgun][mailgun]     | [GitHub][gh-mailgun]   |            | [Go][go] |             |
| DevOps   | Application | SaaS   | Email     | [Postmark][postmark]   | [GitHub][gh-postmark]  |            | [TS][ts] |             |
| DevOps   | Application | SaaS   | Email     | [MailChimp][mailchimp] | [GitHub][gh-mailchimp] |            | [JS][js] |             |
| DevOps   | Application | SaaS   | Email     | [Resend][resend]       | [GitHub][gh-resend]    |            | [TS][ts] |             |

### SaaS - Payment

| Industry | Supersector | Sector | Subsector | Technology             | Open Source            | Maintainer | Language | Recommended |
| -------- | ----------- | ------ | --------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| DevOps   | Application | SaaS   | Payment   | [Braintree][braintree] | [GitHub][gh-braintree] |            | [JS][js] |             |
| DevOps   | Application | SaaS   | Payment   | [Paddle][paddle]       | [GitHub][gh-paddle]    |            | [TS][ts] |             |
| DevOps   | Application | SaaS   | Payment   | [Paypal][paypal]       | [GitHub][gh-paypal]    |            | [TS][ts] |             |
| DevOps   | Application | SaaS   | Payment   | [Square][square]       | [GitHub][gh-square]    |            | [TS][ts] |             |
| DevOps   | Application | SaaS   | Payment   | [Stripe][stripe]       | [GitHub][gh-stripe]    |            | [TS][ts] |             |

[⬆️ Back to Table of Content](#table-of-content)

### Serverless

| Industry | Supersector | Sector     | Subsector | Technology                               | Open Source          | Maintainer               | Language | Recommended |
| -------- | ----------- | ---------- | --------- | ---------------------------------------- | -------------------- | ------------------------ | -------- | ----------- |
| DevOps   | Application | Serverless |           | [Cloudflare Workers][cloudflare-workers] |                      | [Cloudflare][cloudflare] |          |             |
| DevOps   | Application | Serverless |           | [Deno Deploy][deno-deploy]               |                      |                          |          |             |
| DevOps   | Application | Serverless |           | [Fly][fly]                               | [GitHub][gh-fly]     | [Fly][fly]               |          |             |
| DevOps   | Application | Serverless |           | [Netlify][netlify]                       | [GitHub][gh-netlify] | [Netlify][netlify]       |          |             |
| DevOps   | Application | Serverless |           | [Vercel][vercel]                         | [GitHub][gh-vercel]  | [Vercel][vercel]         |          | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### Platform as a Service

| Industry | Supersector | Sector | Subsector | Technology                      | Open Source             | Maintainer             | Language | Recommended |
| -------- | ----------- | ------ | --------- | ------------------------------- | ----------------------- | ---------------------- | -------- | ----------- |
| DevOps   | Application | PaaS   |           | [App Engine][google-app-engine] | [GitHub][gh-app-engine] | [Alphabet][alphabet]   | [TS][ts] |             |
| DevOps   | Application | PaaS   |           | [Heroku][heroku]                | [GitHub][gh-heroku]     | [Heroku][heroku]       |          |             |
| DevOps   | Application | PaaS   |           | [OpenShift][openshift]          | [GitHub][gh-openshift]  | [OpenShift][openshift] |          |             |
| DevOps   | Application | PaaS   |           | [Railway][railway]              | [GitHub][gh-railway]    | [Railway][railway]     |          |             |
| DevOps   | Application | PaaS   |           | [Render][render]                | [GitHub][gh-render]     | [Render][render]       |          | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### Back-end as a Service

| Industry | Supersector | Sector | Subsector | Technology               | Open Source             | Maintainer           | Language | Recommended |
| -------- | ----------- | ------ | --------- | ------------------------ | ----------------------- | -------------------- | -------- | ----------- |
| DevOps   | Application | BaaS   |           | [AppWrite][appwrite]     | [GitHub][gh-appwrite]   |                      | [TS][ts] |             |
| DevOps   | Application | BaaS   |           | [Firebase][firebase]     | [GitHub][gh-firebase]   | [Alphabet][alphabet] | [TS][ts] |             |
| DevOps   | Application | BaaS   |           | [NHost][nhost]           | [GitHub][gh-nhost]      |                      | [TS][ts] |             |
| DevOps   | Application | BaaS   |           | [PocketBase][pocketbase] | [GitHub][gh-pocketbase] |                      | [Go][go] |             |
| DevOps   | Application | BaaS   |           | [SupaBase][supabase]     | [GitHub][gh-supabase]   |                      | [TS][ts] | Recommended |

[⬆️ Back to Table of Content](#table-of-content)

### Infrastructure as a Service

| Industry | Supersector | Sector | Subsector | Technology                     | Open Source                | Maintainer           | Language | Recommended |
| -------- | ----------- | ------ | --------- | ------------------------------ | -------------------------- | -------------------- | -------- | ----------- |
| DevOps   | Application | IaaS   |           | [Azure][ms-azure]              | [GitHub][gh-azure]         | [Microsoft][ms]      |          |             |
| DevOps   | Application | IaaS   |           | [AWS][aws]                     | [GitHub][gh-aws]           | [Amazon][amazon]     |          | Recommended |
| DevOps   | Application | IaaS   |           | [Digital Ocean][digital-ocean] | [GitHub][gh-digital-ocean] |                      |          |             |
| DevOps   | Application | IaaS   |           | [Google Cloud][google-cloud]   | [GitHub][gh-google-cloud]  | [Alphabet][alphabet] |          |             |
| DevOps   | Application | IaaS   |           | [IBM Cloud][ibm-cloud]         | [GitHub][gh-ibm-cloud]     |                      |          |             |

[⬆️ Back to Table of Content](#table-of-content)

## Techstack

| Industry    | Supersector           | Sector                       | Subsector                   | Technology                               | Open Source                    | Maintainer               | Language         | Recommended |
| ----------- | --------------------- | ---------------------------- | --------------------------- | ---------------------------------------- | ------------------------------ | ------------------------ | ---------------- | ----------- |
| Development | OS                    | [Linux][kernel]              |                             | [Debian][debian]                         |                                |                          |                  |             |
| Development | OS                    | [Linux][kernel]              |                             | [Mint][linuxmint]                        |                                |                          |                  |             |
| Development | OS                    | [Linux][kernel]              |                             | [Ubuntu][ubuntu]                         |                                |                          |                  |             |
| Development | OS                    | Unix                         |                             | [macOS][macos]                           |                                | [Apple][apple]           |                  |             |
| Development | OS                    | OS/2                         |                             | [Windows][windows]                       |                                | [Microsoft][ms]          |                  |             |
| Development | Software              | [Browsers](#browsers)        |                             | [Firefox][firefox]                       |                                | [Mozilla][mozilla]       |                  | Recommended |
| Development | Software              | [Browsers](#browsers)        |                             | [Safari][Safari]                         |                                | [Apple][apple]           |                  |             |
| Development | Software              | [Browsers](#browsers)        |                             | [Chromium][chromium]                     |                                | [Alphabet][alphabet]     |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Arc][arc]                               |                                |                          |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Brave][brave]                           |                                |                          |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Chrome][chrome]                         |                                | [Alphabet][alphabet]     |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Edge][edge]                             |                                | [Microsoft][ms]          |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Opera][opera]                           |                                |                          |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Whale][naver-whale]                     |                                | [Naver][naver]           |                  |             |
| Development | Software              | [Browsers](#browsers)        | Chromium                    | [Yandex][yandex]                         |                                |                          |                  |             |
| Development | Software              | Messaging                    |                             | [Slack][slack]                           |                                |                          |                  |             |
| Development | Software              | API Testing                  |                             | [Insomnia][insomnia]                     | [GitHub][gh-insomnia]          | [Kong][kong]             | [JS][js]         |             |
| Development | Software              | API Testing                  |                             | [Postman][postman]                       | [GitHub][gh-postman]           |                          |                  |             |
| Development | Software              | API Testing                  |                             | [Swagger][swagger]                       | [GitHub][gh-swagger]           |                          | [JS][js]         |             |
| Development | Software              | API Testing                  |                             | [Thunder][thunder]                       | [GitHub][gh-thunder]           |                          |                  |             |
| Development | Software              | Version Control              |                             | [BitKeeper][bitkeeper]                   |                                |                          |                  |             |
| Development | Software              | Version Control              |                             | [Git][git]                               |                                |                          |                  |             |
| Development | Software              | Version Control              |                             | [Mercurial][mercurial]                   |                                |                          |                  |             |
| Development | Software              | Version Control              |                             | [Helix Core][perforce-helix-core]        |                                | [Perforce][perforce]     |                  |             |
| Development | Software              | Version Control              |                             | [SVN][apache-svn]                        |                                | [Apache][apache]         |                  |             |
| Development | Language              | Programming                  |                             | [JavaScript][ecmascript]                 |                                |                          |                  |             |
| Development | Language              | Programming                  |                             | [TypeScript][ts]                         | [GitHub][gh-ms-typescript]     | [Microsoft][ms]          | [TS][ts]         | Recommended |
| Development | [Engines](#engines)   |                              |                             | [Hermes][hermes]                         | [GitHub][gh-meta-hermes]       | [Meta][meta]             | C++              |             |
| Development | [Engines](#engines)   |                              |                             | [JavaScriptCore][jsc]                    | [GitHub][gh-javascriptcore]    | [Apple][apple]           | C++              |             |
| Development | [Engines](#engines)   |                              |                             | [QuickJS][quickjs]                       | [GitHub][gh-quickjs]           |                          | C                |             |
| Development | [Engines](#engines)   |                              |                             | [SpiderMonkey][spidermonkey]             |                                | [Mozilla][mozilla]       | C++              |             |
| Development | [Engines](#engines)   |                              |                             | [V8][v8]                                 | [GitHub][gh-v8]                | [Alphabet][alphabet]     | C++              | Recommended |
| Development | [Runtimes](#runtimes) | [JavaScriptCore][jsc]        |                             | [Bun][bun]                               | [GitHub][gh-bun]               |                          | [Zig][zig]       |             |
| Development | [Runtimes](#runtimes) | [QuickJS][quickjs]           |                             | LLRT (Low Latency Runtime)               | [GitHub][gh-llrt]              | [AWS][aws]               | [JS][js]         |             |
| Development | [Runtimes](#runtimes) | [V8][v8]                     |                             | [Deno][deno]                             | [GitHub][gh-deno]              |                          | [Rust][rs]       |             |
| Development | [Runtimes](#runtimes) | [V8][v8]                     |                             | [Node.js][node.js]                       | [GitHub][gh-node]              | [OpenJS][openjsf]        | [JS][js]         | Recommended |
| Development | [Runtimes](#runtimes) | [SpiderMonkey][spidermonkey] |                             | WinterJS                                 | [GitHub][gh-winterjs]          |                          | [JS][js]         |             |
| Development | Runtime Management    | [Node.js][node.js]           |                             | NVM (Node Version Management)            | [GitHub][gh-nvm]               |                          | Shell            | Recommended |
| Development | Development Tools     | Packages                     | Registry                    | [npm Registry][npmjs]                    | [GitHub][gh-npm]               | [Microsoft][ms]          | [JS][js]         | Recommended |
| Development | Development Tools     | Packages                     | Registry                    | [JSR][jsr]                               | [GitHub][gh-jsr]               |                          | [Rust][rs]       |             |
| Development | Development Tools     | Packages                     | Registry                    | [GitHub Packages][github-packages]       | [GitHub][github]               |                          |                  |             |
| Development | Development Tools     | Packages                     | Manager                     | [npm CLI][npmjs]                         | [GitHub][gh-npm-cli]           | [Microsoft][ms]          | [JS][js]         |             |
| Development | Development Tools     | Packages                     | Manager                     | [pnpm][pnpm]                             | [GitHub][gh-pnpm]              |                          | [TS][ts]         |             |
| Development | Development Tools     | Packages                     | Manager                     | [Yarn][yarn]                             | [GitHub][gh-yarn]              | [Meta][meta]             | [TS][ts]         | Recommended |
| Development | Development Tools     | Packages                     | Manager                     | [Volt][volt]                             | [GitHub][gh-volt]              |                          | [Rust][rs]       |             |
| Development | Development Tools     | Packages                     | Security                    | [Snyk][snyk]                             | [GitHub][gh-snyk]              |                          | [TS][ts]         | Recommended |
| Development | Development Tools     | Packages                     | Updates                     | [Renovate][renovate]                     | [GitHub][gh-renovate]          |                          | [TS][ts]         |             |
| Development | Development Tools     | Git Hooks                    |                             | [Husky][husky]                           | [GitHub][gh-husky]             |                          | [JS][js]         |             |
| Development | Development Tools     | Monorepo                     |                             | [Bit][bit]                               | [GitHub][gh-bit]               |                          | [TS][ts]         |             |
| Development | Development Tools     | Monorepo                     |                             | [NX][nx]                                 | [GitHub][gh-nx]                |                          | [TS][ts]         |             |
| Development | Development Tools     | Monorepo                     |                             | [Lerna][lerna]                           | [GitHub][gh-lerna]             |                          | [TS][ts]         |             |
| Development | Development Tools     | Monorepo                     |                             | [pnpm Workspaces][pnpm-workspaces]       | [GitHub][gh-pnpm]              |                          | [TS][ts]         |             |
| Development | Development Tools     | Monorepo                     |                             | [Turbo][turbo]                           | [GitHub][gh-vercel-turbo]      | [Vercel][vercel]         | [Rust][rs]       | Recommended |
| Development | Development Tools     | Monorepo                     |                             | [Yarn Workspaces][yarn-workspaces]       | [GitHub][gh-yarn]              |                          | [TS][ts]         |             |
| Development | Development Tools     | Toolchain                    |                             | [Biome][biome]                           | [GitHub][gh-biome]             |                          | [Rust][rs]       |             |
| Development | Development Tools     | Toolchain                    |                             | [OXC][oxc]                               | [GitHub][gh-oxc]               |                          | [Rust][rs]       |             |
| Development | Development Tools     | [Linters](#linters)          |                             | [ESLint][eslint]                         | [GitHub][gh-eslint]            | [OpenJS][openjsf]        | [JS][js]         | Recommended |
| Development | Development Tools     | [Linters](#linters)          |                             | [JSLint][jslint]                         | [GitHub][gh-jslint]            |                          | [JS][js]         |             |
| Development | Development Tools     | [Linters](#linters)          |                             | [StandardJS][standardjs]                 | [GitHub][gh-standardjs]        |                          | [JS][js]         |             |
| Development | Development Tools     | [Linters](#linters)          |                             | [MillionLint][millionlint]               | [GitHub][gh-millionlint]       |                          | [TS][ts]         |             |
| Development | Development Tools     | Formatter                    |                             | [DPrint][dprint]                         | [GitHub][gh-dprint]            |                          | [Rust][rs]       |             |
| Development | Development Tools     | Formatter                    |                             | [Prettier][prettier]                     | [GitHub][gh-prettier]          |                          | [JS][js]         | Recommended |
| Development | Development Tools     | Testing                      | Unit Test                   | [Jasmine][jasmine]                       | [GitHub][gh-jasmine]           |                          | [JS][js]         |             |
| Development | Development Tools     | Testing                      | Unit Test                   | [Jest][jest]                             | [GitHub][gh-jest]              | [OpenJS][openjsf]        | [TS][ts]         | Recommended |
| Development | Development Tools     | Testing                      | Unit Test                   | [Mocha][mocha]                           | [GitHub][gh-mocha]             | [OpenJS][openjsf]        | [JS][js]         |             |
| Development | Development Tools     | Testing                      | Unit Test                   | [Testing Library][testing-library]       | [GitHub][gh-testing-library]   |                          | [JS][js]         |             |
| Development | Development Tools     | Testing                      | Unit Test                   | [Vitest][vitest]                         | [GitHub][gh-vitest]            |                          | [TS][ts]         |             |
| Development | Development Tools     | Testing                      | E2E Test                    | [Cypress][cypress]                       | [GitHub][gh-cypress]           |                          | [JS][js]         | Recommended |
| Development | Development Tools     | Testing                      | E2E Test                    | [Karma][karma]                           | [GitHub][gh-karma]             |                          | [JS][js]         |             |
| Development | Development Tools     | Testing                      | E2E Test                    | [Playwright][playwright]                 | [GitHub][gh-ms-playwright]     | [Microsoft][ms]          | [TS][ts]         |             |
| Development | Development Tools     | Testing                      | E2E Test                    | [Puppeteer][puppeteer]                   | [GitHub][gh-puppeteer]         |                          | [TS][ts]         |             |
| Development | Development Tools     | Testing                      | E2E Test                    | [Selenium][selenium]                     | [GitHub][gh-selenium]          |                          | [Java][java]     |             |
| Development | Development Tools     | Testing                      | E2E Test                    | [Storybook][storybook]                   | [GitHub][gh-storybook]         |                          | [TS][ts]         |             |
| Development | Build Tools           | Bundler                      |                             | [ESBuild][esbuild]                       | [GitHub][gh-esbuild]           |                          | [Go][go]         |             |
| Development | Build Tools           | Bundler                      |                             | [Parcel][parceljs]                       | [GitHub][gh-parcel]            |                          | [JS][js]         |             |
| Development | Build Tools           | Bundler                      |                             | [Rollup][rollup]                         | [GitHub][gh-rollup]            |                          | [JS][js]         |             |
| Development | Build Tools           | Bundler                      |                             | [Rspack][rspack]                         | [GitHub][gh-rspack]            |                          | [Rust][rs]       |             |
| Development | Build Tools           | Bundler                      |                             | [Webpack][webpack]                       | [GitHub][gh-webpack]           |                          | [JS][js]         | Recommended |
| Development | Build Tools           | Compiler                     |                             | [Babel][babel]                           | [GitHub][gh-babel]             |                          | [TS][ts]         | Recommended |
| Development | Build Tools           | Compiler                     |                             | [SWC][swc]                               | [GitHub][gh-swc]               |                          | [Rust][rs]       |             |
| Front-end   | Tooling               |                              |                             | [Vite][vite]                             | [GitHub][gh-vite]              |                          | [TS][ts]         |             |
| Front-end   | Styling               | CSS                          | Preprocessor                | [PostCSS][postcss]                       | [GitHub][gh-postcss]           |                          | [TS][ts]         |             |
| Front-end   | Styling               | CSS                          | Preprocessor                | [SASS][sass]                             | [GitHub][gh-sass]              |                          | [TS][ts]         |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                   | [StyleX][stylex]                         | [GitHub][gh-meta-stylex]       | [Meta][meta]             | [JS][js]         |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                   | [emotion][emotion]                       | [GitHub][gh-emotion]           |                          | [JS][js]         |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                   | [styled-components][sc]                  | [GitHub][gh-styled-components] |                          | [TS][ts]         |             |
| Front-end   | Styling               | CSS                          | Utility                     | [Tailwind CSS][tailwindcss]              | [GitHub][gh-tailwind-css]      |                          | [TS][ts]         | Recommended |
| Front-end   | Styling               | CSS                          | Utility                     | [NativeWind][nativewind]                 | [GitHub][gh-nativewind]        |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | [Tailwind CSS][tailwindcss] | [DaisyUI][daisyui]                       | [GitHub][gh-daisy-ui]          |                          | CSS              | Recommended |
| Front-end   | Styling               | Components                   | [Tailwind CSS][tailwindcss] | [TailwindUI][tailwind-ui]                | Freemium                       |                          |                  |             |
| Front-end   | Styling               | Components                   | Toolkit                     | [Bootstrap][bootstrap]                   | [GitHub][gh-bootstrap]         |                          | [JS][js]         |             |
| Front-end   | Styling               | Components                   | Toolkit                     | [Bulma][bulma]                           | [GitHub][gh-bulma]             |                          | [SASS][sass]     |             |
| Front-end   | Styling               | Components                   | Toolkit                     | [Materialize CSS][materializecss]        | [GitHub][gh-materialize-css]   |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | Toolkit                     | [shadcn/ui][shadcn]                      | [GitHub][gh-shadcn-ui]         |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | Toolkit                     | [UIKit][uikit]                           | [GitHub][gh-uikit]             |                          | [SASS][sass]     |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                  | [Ant Design][ant-design]                 | [GitHub][gh-ant-design]        |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                  | [Chakra UI][chakra-ui]                   | [GitHub][gh-chakra-ui]         |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                  | [MUI][mui]                               | [GitHub][gh-mui]               |                          | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                  | [NextUI][next-ui]                        | [GitHub][gh-next-ui]           | [Vercel][vercel]         | [TS][ts]         |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                  | [Theme UI][theme-ui]                     | [GitHub][gh-theme-ui]          |                          | [TS][ts]         |             |
| Front-end   | Chart                 |                              |                             | [Chart.js][chart.js]                     | [GitHub][gh-chart-js]          |                          | [JS][js]         |             |
| Front-end   | Chart                 |                              |                             | [Chartist][chartist]                     | [GitHub][gh-chartist]          |                          | [TS][ts]         |             |
| Front-end   | Chart                 |                              |                             | [D3.js][d3]                              | [GitHub][gh-d3]                |                          | [JS][js]         |             |
| Front-end   | Chart                 |                              |                             | [Google Chart][google-chart]             | [GitHub][gh-google-chart]      | [Alphabet][alphabet]     | [JS][js]         |             |
| Front-end   | Chart                 |                              |                             | [HighCharts][highcharts]                 | [GitHub][gh-highcharts]        |                          | [TS][ts]         |             |
| Front-end   | Chart                 |                              |                             | [Plotly.js][plotly.js]                   | [GitHub][gh-plotly]            |                          | [JS][js]         |             |
| Front-end   | Chart                 | [JSX][jsx]                   |                             | [Recharts][recharts]                     | [GitHub][gh-recharts]          |                          | [TS][ts]         |             |
| Front-end   | Chart                 | [JSX][jsx]                   |                             | [TanStack Chart][tanstack-charts]        | [GitHub][gh-tanstack-chart]    |                          | [TS][ts]         | Recommended |
| Front-end   | Query                 |                              |                             | [Apollo Client][apollo-client]           | [GitHub][gh-apollo-client]     | [Apollo][apollo]         | [TS][ts]         |             |
| Front-end   | Query                 |                              |                             | [Axios][axios]                           | [GitHub][gh-axios]             |                          | [JS][js]         |             |
| Front-end   | Query                 |                              |                             | [SWR][swr]                               | [GitHub][gh-vercel-swr]        |                          | [TS][ts]         |             |
| Front-end   | Query                 | [JSX][jsx]                   |                             | [TanStack Query][tanstack-query]         | [GitHub][gh-tanstack-query]    |                          | [TS][ts]         |             |
| Front-end   | Web                   | Table                        |                             | [TanStack Table][tanstack-table]         | [GitHub][gh-tanstack-table]    | [TanStack][tanstack]     | [TS][ts]         |             |
| Front-end   | Web                   | State Management             |                             | [Redux][redux]                           | [GitHub][gh-redux]             |                          | [TS][ts]         |             |
| Front-end   | Web                   | State Management             |                             | [XState][xstate]                         | [GitHub][gh-xstate]            |                          | [TS][ts]         |             |
| Front-end   | Web                   | State Management             |                             | [Jotai][jotai]                           | [GitHub][gh-jotai]             | [Poimandres][pmndrs]     | [TS][ts]         |             |
| Front-end   | Web                   | State Management             |                             | [Zustand][zustand]                       | [GitHub][gh-zustand]           | [Poimandres][pmndrs]     | [TS][ts]         | Recommended |
| Front-end   | Web                   | [WebGL][webgl]               |                             | [three.js][three.js]                     | [GitHub][gh-three]             |                          | [JS][js]         |             |
| Front-end   | Web                   | DOM                          |                             | [jQuery][jquery]                         | [GitHub][gh-jquery]            | [OpenJS][openjsf]        | [JS][js]         |             |
| Front-end   | Web                   | Components                   |                             | [Lit][lit]                               | [GitHub][gh-lit]               |                          | [TS][ts]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [Angular][angular]                       | [GitHub][gh-angular]           | [Alphabet][alphabet]     | [TS][ts]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [AngularJS][angularjs]                   | [GitHub][gh-angular-js]        | [Alphabet][alphabet]     | [JS][js]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [Backbone.js][backbone]                  | [GitHub][gh-backbone]          |                          | [JS][js]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [Ember.js][ember]                        | [GitHub][gh-ember]             |                          | [JS][js]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [Svelte][svelte]                         | [GitHub][gh-svelte]            | [Vercel][vercel]         | [JS][js]         |             |
| Front-end   | Web Framework         | MVC                          |                             | [Vue.js][vue]                            | [GitHub][gh-vue]               |                          | [TS][ts]         |             |
| Front-end   | Web Framework         | [JSX][jsx]                   |                             | [React][react]                           | [GitHub][gh-meta-react]        | [Meta][meta]             | [JS][js]         | Recommended |
| Front-end   | Web Framework         | [JSX][jsx]                   |                             | [Solid.js][solid]                        | [GitHub][gh-solid]             |                          | [TS][ts]         |             |
| Front-end   | Web Framework         | [React][react]               |                             | [Preact][preact]                         | [GitHub][gh-preact]            |                          | [JS][js]         |             |
| Front-end   | Web Framework         | [React][react]               |                             | [Qwik][qwik]                             | [GitHub][gh-qwik]              |                          | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSR                          | [React][react]              | [Next.js][next.js]                       | [GitHub][gh-vercel-next]       | [Vercel][vercel]         | [JS][js]         | Recommended |
| Front-end   | Meta Framework        | SSR                          | [React][react]              | [Remix][remix]                           | [GitHub][gh-remix]             |                          | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSR                          | [Solid][solid]              | [SolidStart][solid-start]                | [GitHub][gh-solid-start]       |                          | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSR                          | [Svelte][svelte]            | [SvelteKit][svelte-kit]                  | [GitHub][gh-svelte-kit]        | [Vercel][vercel]         | [JS][js]         |             |
| Front-end   | Meta Framework        | SSR                          | [Vue][vue]                  | [Nuxt][nuxt]                             | [GitHub][gh-nuxt]              |                          | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]              | [Astro][astro]                           | [GitHub][gh-astro]             |                          | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]              | [Docusaurus][docusaurus]                 | [GitHub][gh-meta-docusaurus]   | [Meta][meta]             | [TS][ts]         |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]              | [Docsify][docsify]                       | [GitHub][gh-docsify]           |                          | [JS][js]         |             |
| Front-end   | Meta Framework        | SSG                          | [React][react]              | [Gatsby.js][gatsbyjs]                    | [GitHub][gh-gatsby]            | [Netlify][netlify]       | [TS][ts]         |             |
| Front-end   | Mobile Framework      |                              |                             | [Ionic][ionic]                           | [GitHub][gh-ionic]             |                          | [TS][ts]         |             |
| Front-end   | Mobile Framework      |                              |                             | [NativeScript][nativescript]             | [GitHub][gh-nativescript]      | [OpenJS][openjsf]        | [TS][ts]         |             |
| Front-end   | Mobile Framework      | [React][react]               |                             | [React Native][rn]                       | [GitHub][gh-meta-rn]           |                          | C++              |             |
| Front-end   | Mobile Framework      | [React Native][rn]           |                             | [Expo][expo]                             | [GitHub][gh-expo]              |                          | [TS][ts]         | Recommended |
| Front-end   | Mobile Framework      | [Svelte][svelte]             |                             | [Svelte Native][svelte-native]           | [GitHub][gh-svelte-native]     |                          | [TS][ts]         |             |
| Front-end   | Desktop Framework     | Chromium                     |                             | [Electron.js][electronjs]                | [GitHub][gh-electron]          | [OpenJS][openjsf]        | C++              |             |
| Front-end   | Desktop Framework     | WebView                      |                             | [Tauri][tauri]                           | [GitHub][gh-tauri]             |                          | [Rust][rs]       | Recommended |
| Front-end   | Desktop Framework     | WebView                      |                             | [Wails][wails]                           | [GitHub][gh-wails]             |                          | [Go][go]         |             |
| Front-end   | Desktop Framework     |                              |                             | [Meteor][meteor]                         | [GitHub][gh-meteor]            |                          | [JS][js]         |             |
| Front-end   | Desktop Framework     |                              |                             | [Quasar][quasar]                         | [GitHub][gh-quasar]            |                          | [JS][js]         |             |
| Front-end   | Library               | Logging                      |                             | [Pino][pino]                             | [GitHub][gh-pino]              |                          | [JS][js]         | Recommended |
| Front-end   | Library               | Logging                      |                             | Winston                                  | [GitHub][gh-winstonjs]         |                          | [JS][js]         |             |
| Front-end   | Library               | Logging                      |                             | npmlog                                   | [GitHub][gh-npmlog]            |                          | [JS][js]         |             |
| Front-end   | Library               | Authentication               |                             | [JWT][jwt]                               | [GitHub][gh-jwt]               |                          | [JS][js]         |             |
| Front-end   | Library               | Authentication               |                             | [NextAuth][next-auth]                    | [GitHub][gh-next-auth]         |                          | [TS][ts]         |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                             | [GraphQL][graphql]                       | [GitHub][gh-graphql]           | [Meta][meta]             | [TS][ts]         |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                             | [Apollo Server][apollo-server]           | [GitHub][gh-apollo-server]     | [Apollo][apollo]         | [TS][ts]         | Recommended |
| Back-end    | Framework             | [GraphQL][graphql]           |                             | [Yoga][yoga]                             | [GitHub][gh-yoga]              |                          | [TS][ts]         |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                             | [Mercurius][mercurius]                   | [GitHub][gh-mercurius]         |                          | [JS][js]         |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                             | [Garph][garph]                           | [GitHub][gh-garph]             |                          | [TS][ts]         |             |
| Back-end    | Framework             | HTTP                         |                             | [Express.js][expressjs]                  | [GitHub][gh-express]           | [OpenJS][openjsf]        | [JS][js]         |             |
| Back-end    | Framework             | HTTP                         |                             | [Koa][koa]                               | [GitHub][gh-koa]               |                          | [JS][js]         |             |
| Back-end    | Framework             | HTTP                         |                             | [Nest.js][nest.js]                       | [GitHub][gh-nest]              |                          | [TS][ts]         |             |
| Back-end    | Framework             | HTTP                         |                             | [hapi][hapi]                             | [GitHub][gh-hapi]              |                          | [JS][js]         |             |
| Back-end    | Framework             | HTTP                         |                             | [Fastify][fastify]                       | [GitHub][gh-fastify]           | [OpenJS][openjsf]        | [JS][js]         |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]     | [Helmet][helmet]                         | [GitHub][gh-helmet]            |                          | [TS][ts]         |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]     | [CORS][cors]                             | [GitHub][gh-cors]              |                          | [JS][js]         |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]     | [tsoa][tsoa]                             | [GitHub][gh-tsoa]              |                          | [TS][ts]         |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]     | [Passport][passport]                     | [GitHub][gh-passport]          |                          | [JS][js]         |             |
| Back-end    | Framework             | RPC                          |                             | [gRPC][grpc]                             | [GitHub][gh-grpc]              | [Alphabet][alphabet]     | [TS][ts]         |             |
| Back-end    | Framework             | RPC                          |                             | [tRPC][trpc]                             | [GitHub][gh-trpc]              |                          | [TS][ts]         | Recommended |
| Back-end    | Framework             | WebSocket                    |                             | [Socket.io][socket.io]                   | [GitHub][gh-socket]            |                          | [TS][ts]         | Recommended |
| Back-end    | Framework             | WebSocket                    |                             | [SockJS][sockjs]                         | [GitHub][gh-sockjs]            |                          | [JS][js]         |             |
| Back-end    | Framework             | WebSocket                    |                             | WS                                       | [GitHub][gh-ws]                |                          | [JS][js]         |             |
| Back-end    | Messages              | Broker                       |                             | [ActiveMQ][apache-activemq]              | [GitHub][gh-apache-activemq]   | [Apache][apache]         | [Java][java]     |             |
| Back-end    | Messages              | Broker                       |                             | [Kafka][apache-kafka]                    | [GitHub][gh-apache-kafka]      | [Apache][apache]         | [Java][java]     | Recommended |
| Back-end    | Messages              | Broker                       |                             | [RabbitMQ][rabbitmq]                     | [GitHub][gh-rabbitmq]          |                          | Starlark         |             |
| Back-end    | Messages              | Publish / Subscribe          |                             | [MQTT][mqtt]                             |                                |                          |                  |             |
| Back-end    | Messages              | Publish / Subscribe          |                             | [NATS][nats]                             | [GitHub][gh-nats]              |                          | [Go][go]         |             |
| Back-end    | Database              | Key-Value                    |                             | [Redis][redis]                           | [GitHub][gh-redis]             |                          | C                | Recommended |
| Back-end    | Database              | Key-Value                    |                             | [Memcached][memcached]                   | [GitHub][gh-memcached]         |                          | C                |             |
| Back-end    | Database              | Key-Value                    |                             | [Valkey][valkey]                         | [GitHub][gh-valkey]            |                          | C                |             |
| Back-end    | Database              | Wide Column                  |                             | [Cassandra][apache-cassandra]            |                                |                          |                  |             |
| Back-end    | Database              | Wide Column                  |                             | [HBase][apache-hbase]                    |                                |                          |                  |             |
| Back-end    | Database              | Documental                   |                             | [CouchDB][apache-couchdb]                | [GitHub][gh-apache-couchdb]    | [Apache][apache]         | [Erlang][erlang] |             |
| Back-end    | Database              | Documental                   |                             | [MongoDB][mongodb]                       | [GitHub][gh-mongodb]           |                          | C++              |             |
| Back-end    | Database              | Relational                   |                             | [PostgreSQL][postgresql]                 | [GitHub][gh-postgresql]        |                          | C                | Recommended |
| Back-end    | Database              | Relational                   |                             | [CockroachDB][cockroachdb]               | [GitHub][gh-cockroach]         |                          | [Go][go]         |             |
| Back-end    | Database              | Relational                   |                             | [MySQL][mysql]                           | [GitHub][gh-mysql]             |                          | C++              |             |
| Back-end    | Database              | Relational                   |                             | [SQLite][sqlite]                         | [GitHub][gh-sqlite]            |                          | C                |             |
| Back-end    | Database              | Relational                   |                             | [MariaDB][mariadb]                       | [GitHub][gh-mariadb]           |                          | C++              |             |
| Back-end    | Database              | Graph                        |                             | [DGraph][dgraph]                         |                                |                          |                  |             |
| Back-end    | Database              | Graph                        |                             | [neo4j][neo4j]                           |                                |                          |                  |             |
| Back-end    | Database              | Search Engine                |                             | [ElasticSearch][elasticsearch]           |                                |                          |                  |             |
| Back-end    | Database              | Search Engine                |                             | [Solr][apache-solr]                      |                                | [Apache][apache]         |                  |             |
| Back-end    | Database              | Multi Model                  |                             | [Fauna][fauna]                           |                                |                          |                  |             |
| Back-end    | Database              | ORM                          | SQL & NoSQL                 | [MikroORM][mikro-orm]                    | [GitHub][gh-mikro-orm]         |                          | [TS][ts]         |             |
| Back-end    | Database              | ORM                          | SQL & NoSQL                 | [Prisma][prisma]                         | [GitHub][gh-prisma]            |                          | [TS][ts]         | Recommended |
| Back-end    | Database              | ORM                          | SQL & NoSQL                 | [TypeORM][typeorm]                       | [GitHub][gh-typeorm]           |                          | [TS][ts]         |             |
| Back-end    | Database              | ORM                          | SQL                         | [Drizzle][drizzle]                       | [GitHub][gh-drizzle]           |                          | [TS][ts]         |             |
| Back-end    | Database              | ORM                          | SQL                         | [Sequelize][sequelize]                   | [GitHub][gh-sequelize]         |                          | [JS][js]         |             |
| Back-end    | Database              | ORM                          | NoSQL                       | [Mongoose][mongoose]                     | [GitHub][gh-mongoose]          |                          | [JS][js]         |             |
| AI          | Library               | Mathematics                  |                             | [Math.js][math.js]                       | [GitHub][gh-math]              |                          | [JS][js]         |             |
| AI          | Library               | Machine Learning             |                             | [ml5][ml5]                               | [GitHub][gh-ml5]               |                          | [JS][js]         |             |
| AI          | Library               | Machine Learning             |                             | [TensorFlow.js][tensorflow.js]           | [GitHub][gh-tensorflow]        |                          | [TS][ts]         | Recommended |
| AI          | Deep Learning         | Neural Network               |                             | [Brain.js][brain.js]                     | [GitHub][gh-brain]             |                          | [TS][ts]         |             |
| AI          | Deep Learning         | Neural Network               |                             | [Mind.js][mind.js]                       | [GitHub][gh-mind]              |                          | [JS][js]         |             |
| AI          | Deep Learning         | Neural Network               |                             | [Synaptic.js][synaptic.js]               | [GitHub][gh-synaptic]          |                          | [JS][js]         |             |
| AI          | LLM                   |                              |                             | [LangChain][langchain]                   |                                |                          |                  |             |
| AI          | Models                |                              |                             | [HuggingFace][huggingface]               |                                | [Apache][apache]         |                  |             |
| DevOps      | Server                |                              |                             | [HTTP][apache-httpd]                     |                                |                          |                  |             |
| DevOps      | Server                |                              |                             | [nginx][nginx]                           |                                |                          |                  |             |
| DevOps      | Version Control       | System                       | [Git][git]                  | [BitBucket][bitbucket]                   |                                |                          |                  |             |
| DevOps      | Version Control       | System                       | [Git][git]                  | [GitHub][github]                         |                                |                          |                  |             |
| DevOps      | Version Control       | System                       | [Git][git]                  | [GitLab][gitlab]                         |                                |                          |                  |             |
| DevOps      | Version Control       | System                       | [Git][git]                  | [Launchpad][launchpad]                   |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [CircleCI][circleci]                     |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [GitHub Actions][github-actions]         |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [GitLab CI][gitlab-ci]                   |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [Harness][harness]                       |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [Jenkins][jenkins]                       |                                |                          |                  |             |
| DevOps      | CI/CD                 |                              |                             | [Travis][travis-ci]                      |                                |                          |                  |             |
| DevOps      | Application           | Container                    |                             | [Docker][docker]                         | [GitHub][gh-docker]            |                          |                  |             |
| DevOps      | Application           | Container Orchestration      |                             | [Kubernetes][kubernetes]                 | [GitHub][gh-kubernetes]        |                          | [Go][go]         |             |
| DevOps      | Application           | Secrets                      |                             | [Vault][vault]                           | [GitHub][gh-vault]             | [HashiCorp][hashicorp]   |                  |             |
| DevOps      | Application           | IaC                          |                             | [Terraform][terraform]                   | [GitHub][gh-terraform]         | [HashiCorp][hashicorp]   |                  |             |
| DevOps      | Application           | Serverless                   |                             | [Cloudflare Workers][cloudflare-workers] |                                | [Cloudflare][cloudflare] |                  |             |
| DevOps      | Application           | Serverless                   |                             | [Deno Deploy][deno-deploy]               |                                |                          |                  |             |
| DevOps      | Application           | Serverless                   |                             | [Fly][fly]                               | [GitHub][gh-fly]               | [Fly][fly]               |                  |             |
| DevOps      | Application           | Serverless                   |                             | [Netlify][netlify]                       | [GitHub][gh-netlify]           | [Netlify][netlify]       |                  |             |
| DevOps      | Application           | Serverless                   |                             | [Vercel][vercel]                         | [GitHub][gh-vercel]            | [Vercel][vercel]         |                  | Recommended |
| DevOps      | Application           | SaaS                         | Authentication              | [Auth0][auth0]                           | [GitHub][gh-auth0]             |                          | [TS][ts]         | Recommended |
| DevOps      | Application           | SaaS                         | Authentication              | [Clerk][clerk]                           | [GitHub][gh-clerk]             |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Authentication              | [Keycloak][keycloak]                     | [GitHub][gh-keycloak]          |                          | [Java][java]     |             |
| DevOps      | Application           | SaaS                         | Authentication              | [OneLogin][onelogin]                     | [GitHub][gh-onelogin]          |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Authentication              | [OSSO][osso]                             | [GitHub][gh-osso]              |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Authentication              | [Zitadel][zitadel]                       | [GitHub][gh-zitadel]           |                          | [Go][go]         |             |
| DevOps      | Application           | SaaS                         | Email                       | [SendGrid][sendgrid]                     | [GitHub][gh-sendgrid]          |                          | [JS][js]         | Recommended |
| DevOps      | Application           | SaaS                         | Email                       | [Mailgun][mailgun]                       | [GitHub][gh-mailgun]           |                          | [Go][go]         |             |
| DevOps      | Application           | SaaS                         | Email                       | [Postmark][postmark]                     | [GitHub][gh-postmark]          |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Email                       | [MailChimp][mailchimp]                   | [GitHub][gh-mailchimp]         |                          | [JS][js]         |             |
| DevOps      | Application           | SaaS                         | Email                       | [Resend][resend]                         | [GitHub][gh-resend]            |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Payment                     | [Braintree][braintree]                   | [GitHub][gh-braintree]         |                          | [JS][js]         |             |
| DevOps      | Application           | SaaS                         | Payment                     | [Paddle][paddle]                         | [GitHub][gh-paddle]            |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Payment                     | [Paypal][paypal]                         | [GitHub][gh-paypal]            |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Payment                     | [Square][square]                         | [GitHub][gh-square]            |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Payment                     | [Stripe][stripe]                         | [GitHub][gh-stripe]            |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Monitor                     | [Grafana][grafana]                       | [GitHub][gh-grafana]           |                          | [TS][ts]         |             |
| DevOps      | Application           | SaaS                         | Monitor                     | [Splunk][splunk]                         | [GitHub][gh-splunk]            |                          | [Python][python] |             |
| DevOps      | Application           | PaaS                         |                             | [App Engine][google-app-engine]          | [GitHub][gh-app-engine]        | [Alphabet][alphabet]     | [TS][ts]         |             |
| DevOps      | Application           | PaaS                         |                             | [Heroku][heroku]                         | [GitHub][gh-heroku]            | [Heroku][heroku]         |                  |             |
| DevOps      | Application           | PaaS                         |                             | [OpenShift][openshift]                   | [GitHub][gh-openshift]         | [OpenShift][openshift]   |                  |             |
| DevOps      | Application           | PaaS                         |                             | [Railway][railway]                       | [GitHub][gh-railway]           | [Railway][railway]       |                  |             |
| DevOps      | Application           | PaaS                         |                             | [Render][render]                         | [GitHub][gh-render]            | [Render][render]         |                  | Recommended |
| DevOps      | Application           | BaaS                         |                             | [AppWrite][appwrite]                     | [GitHub][gh-appwrite]          |                          | [TS][ts]         |             |
| DevOps      | Application           | BaaS                         |                             | [Firebase][firebase]                     | [GitHub][gh-firebase]          | [Alphabet][alphabet]     | [TS][ts]         |             |
| DevOps      | Application           | BaaS                         |                             | [NHost][nhost]                           | [GitHub][gh-nhost]             |                          | [TS][ts]         |             |
| DevOps      | Application           | BaaS                         |                             | [PocketBase][pocketbase]                 | [GitHub][gh-pocketbase]        |                          | [Go][go]         |             |
| DevOps      | Application           | BaaS                         |                             | [SupaBase][supabase]                     | [GitHub][gh-supabase]          |                          | [TS][ts]         | Recommended |
| DevOps      | Application           | IaaS                         |                             | [AWS][aws]                               | [GitHub][gh-aws]               | [Amazon][amazon]         |                  | Recommended |
| DevOps      | Application           | IaaS                         |                             | [Azure][ms-azure]                        | [GitHub][gh-azure]             | [Microsoft][ms]          |                  |             |
| DevOps      | Application           | IaaS                         |                             | [Google Cloud][google-cloud]             | [GitHub][gh-google-cloud]      | [Alphabet][alphabet]     |                  |             |
| DevOps      | Application           | IaaS                         |                             | [Digital Ocean][digital-ocean]           | [GitHub][gh-digital-ocean]     |                          |                  |             |
| DevOps      | Application           | IaaS                         |                             | [IBM Cloud][ibm-cloud]                   | [GitHub][gh-ibm-cloud]         |                          |                  |             |
| DevOps      | DaaS                  | Serverless                   | PostgreSQL                  | [Neon][neon]                             | [GitHub][gh-neon]              |                          | [Rust][rs]       |             |
| DevOps      | DaaS                  | Serverless                   | MySQL                       | [PlanetScale][planetscale]               | [GitHub][gh-planetscale]       |                          | [Go][go]         |             |

[⬆️ Back to Table of Content](#table-of-content)

## References

1. [Awesome](https://github.com/topics/awesome)
2. [Awesome JS](https://awesomejs.dev)
3. [Best of JS](https://bestofjs.org)
4. [Coding with Lewis](https://lewismenelaws.com)
5. [Fireship](https://fireship.io)
6. [Free for Dev](https://free-for.dev)
7. [JavaScript Rising Stars](https://risingstars.js.org)
8. [Mozilla Developer](https://developer.mozilla.org)
9. [Roadmap](https://roadmap.sh)
10. [State of JS](https://stateofjs.com)
11. [Theo Browne - T3](https://t3.gg)
12. [W3Schools](https://www.w3schools.com)
13. [YouTube](https://www.youtube.com)

[⬆️ Back to Table of Content](#table-of-content)

[alphabet]: https://abc.xyz
[amazon]: https://www.amazon.com
[angular]: https://angular.io
[angularjs]: https://angularjs.org
[ant-design]: https://ant.design
[apache]: https://apache.org
[apache-activemq]: https://activemq.apache.org
[apache-cassandra]: https://cassandra.apache.org
[apache-couchdb]: https://couchdb.apache.org
[apache-hbase]: https://hbase.apache.org
[apache-httpd]: https://httpd.apache.org
[apache-kafka]: https://kafka.apache.org
[apache-solr]: https://solr.apache.org
[apache-svn]: https://subversion.apache.org
[apollo]: https://www.apollographql.com
[apollo-client]: https://www.apollographql.com/docs/react
[apollo-server]: https://www.apollographql.com/docs/apollo-server
[apple]: https://www.apple.com
[appwrite]: https://appwrite.io
[arc]: https://arc.net
[astro]: https://astro.build
[auth0]: https://auth0.com
[axios]: https://axios-http.com
[aws]: https://aws.amazon.com
[babel]: https://babeljs.io
[backbone]: https://backbonejs.org
[biome]: https://biomejs.dev
[bit]: https://bit.dev
[bitbucket]: https://bitbucket.org
[bitkeeper]: http://www.bitkeeper.org
[bootstrap]: https://getbootstrap.com
[brain.js]: https://brain.js.org
[braintree]: https://www.braintreepayments.com
[brave]: https://brave.com
[bulma]: https://bulma.io
[bun]: https://bun.sh
[chakra-ui]: https://chakra-ui.com
[chart.js]: https://www.chartjs.org
[chartist]: https://chartist.dev
[chrome]: https://www.google.com/chrome
[chromium]: https://www.chromium.org
[clerk]: https://clerk.com
[cloudflare]: https://cloudflare.com
[cloudflare-workers]: https://workers.cloudflare.com
[cockroachdb]: https://www.cockroachlabs.com
[cors]: https://expressjs.com/en/resources/middleware/cors.html
[circleci]: https://circleci.com
[cypress]: https://www.cypress.io
[d3]: https://d3js.org
[daisyui]: https://daisyui.com
[debian]: https://www.debian.org
[deno]: https://deno.com
[deno-deploy]: https://deno.com/deploy
[dgraph]: https://dgraph.io
[digital-ocean]: https://www.digitalocean.com
[docker]: http://docker.com
[docsify]: https://docsify.js.org
[docusaurus]: https://docusaurus.io
[dprint]: https://dprint.dev
[drizzle]: https://orm.drizzle.team
[ecmascript]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[edge]: https://www.microsoft.com/en-us/edge
[elasticsearch]: https://www.elastic.co/elasticsearch
[electronjs]: https://www.electronjs.org
[emotion]: https://emotion.sh
[ember]: https://emberjs.com
[erlang]: https://www.erlang.org
[esbuild]: https://esbuild.github.io
[eslint]: https://eslint.org
[expo]: https://expo.dev
[expressjs]: https://expressjs.com
[fastify]: https://www.fastify.io
[fauna]: https://fauna.com
[firebase]: https://firebase.google.com
[firefox]: https://www.mozilla.org/en-US/firefox
[fly]: https://fly.io
[garph]: https://garph.dev
[gatsbyjs]: https://gatsbyjs.org
[git]: https://git-scm.com
[github]: https://github.com
[github-actions]: https://github.com/features/actions
[github-packages]: https://github.com/features/packages
[gitlab]: https://gitlab.com
[gitlab-ci]: https://docs.gitlab.com/ee/ci
[go]: https://go.dev
[google-app-engine]: https://cloud.google.com/appengine
[google-chart]: https://developers.google.com/chart
[google-cloud]: https://cloud.google.com
[grafana]: https://grafana.com
[graphql]: https://graphql.org
[grpc]: https://grpc.io
[hapi]: https://hapi.dev
[harness]: https://www.harness.io
[hashicorp]: https://www.hashicorp.com
[helmet]: https://helmetjs.github.io
[hermes]: https://hermesengine.dev
[heroku]: https://www.heroku.com
[highcharts]: https://www.highcharts.com
[huggingface]: https://huggingface.co
[husky]: https://typicode.github.io/husky
[ibm-cloud]: https://www.ibm.com/cloud
[insomnia]: https://insomnia.rest
[ionic]: https://ionicframework.com
[jasmine]: https://jasmine.github.io
[java]: https://www.java.com
[jest]: https://jestjs.io
[jenkins]: https://www.jenkins.io
[jotai]: https://jotai.org
[jquery]: https://jquery.com
[js]: https://www.javascript.com
[jsc]: https://developer.apple.com/documentation/javascriptcore
[jslint]: https://www.jslint.com
[jsr]: https://jsr.i
[json]: https://www.json.org
[jsx]: https://facebook.github.io/jsx
[jwt]: https://jwt.io
[karma]: https://karma-runner.github.io
[kernel]: https://www.kernel.org
[keycloak]: https://www.keycloak.org
[koa]: https://koajs.com
[kong]: https://konghq.com
[kubernetes]: https://kubernetes.io
[langchain]: https://www.langchain.com
[launchpad]: https://launchpad.net
[lerna]: https://lerna.js.org
[linuxmint]: https://linuxmint.com
[lit]: https://lit.dev
[macos]: https://www.apple.com/macos
[mailchimp]: https://mailchimp.com
[mailgun]: https://www.mailgun.com
[mariadb]: https://mariadb.org
[markdown]: https://daringfireball.net/projects/markdown
[materializecss]: https://materializecss.com
[math.js]: https://mathjs.org
[memcached]: https://memcached.org
[mercurial]: https://www.mercurial-scm.org
[mercurius]: https://mercurius.dev
[meta]: https://developers.facebook.com
[meteor]: https://www.meteor.com
[ml5]: https://ml5js.org
[mocha]: https://mochajs.org
[mongodb]: https://www.mongodb.com
[mongoose]: https://mongoosejs.com
[ms]: https://www.microsoft.com
[ms-azure]: https://azure.microsoft.com
[mikro-orm]: https://mikro-orm.io
[mind.js]: http://stevenmiller888.github.io/mindjs.net
[millionlint]: https://million.dev/lint
[mozilla]: https://www.mozilla.org
[mqtt]: https://mqtt.org
[mui]: https://mui.com
[mysql]: https://www.mysql.com
[nativescript]: https://nativescript.org
[nativewind]: https://www.nativewind.dev
[nats]: https://nats.io
[naver]: https://naver.com
[naver-whale]: https://whale.naver.com
[neo4j]: https://neo4j.com
[neon]: https://neon.tech
[netlify]: https://netlify.com
[nest.js]: https://nestjs.com
[next-auth]: https://next-auth.js.org
[next.js]: https://nextjs.org
[next-ui]: https://nextui.org
[nginx]: https://www.nginx.com
[nhost]: https://nhost.io
[node.js]: https://nodejs.org
[npmjs]: https://www.npmjs.com
[nuxt]: https://nuxtjs.org
[nx]: https://nx.dev
[onelogin]: https://developers.onelogin.com
[openjsf]: https://openjsf.org
[openshift]: https://www.redhat.com/en/technologies/cloud-computing/openshift
[opera]: https://www.opera.com
[osso]: https://ossoapp.com
[oxc]: https://oxc-project.github.io
[paddle]: https://www.paddle.com
[parceljs]: https://parceljs.org
[passport]: https://www.passportjs.org
[paypal]: https://developer.paypal.com
[perforce]: https://www.perforce.com
[perforce-helix-core]: https://www.perforce.com/products/helix-core
[pino]: https://getpino.io
[planetscale]: https://planetscale.com
[playwright]: https://playwright.dev
[plotly.js]: https://plotly.com/javascript/
[pmndrs]: https://pmnd.rs
[pnpm]: https://pnpm.io
[pnpm-workspaces]: https://pnpm.io/workspaces
[pocketbase]: https://pocketbase.io
[postcss]: https://postcss.org
[postman]: https://www.postman.com
[postmark]: https://postmarkapp.com
[postgresql]: https://postgresql.org
[puppeteer]: https://pptr.dev
[preact]: https://preactjs.com
[prettier]: https://prettier.io
[prisma]: https://www.prisma.io
[python]: https://www.python.org
[quasar]: https://quasar.dev
[quickjs]: https://bellard.org/quickjs
[qwik]: https://qwik.dev
[rabbitmq]: https://www.rabbitmq.com
[railway]: https://railway.app
[react]: https://react.dev
[resend]: https://resend.com
[rn]: https://reactnative.dev
[recharts]: https://recharts.org
[redux]: https://redux.js.org
[remix]: https://remix.run
[redis]: https://redis.io
[renovate]: https://renovatebot.com
[render]: https://render.com
[rollup]: https://rollupjs.org
[rs]: https://www.rust-lang.org
[rspack]: https://www.rspack.dev
[safari]: https://www.apple.com/safari
[sass]: https://sass-lang.com
[sc]: https://styled-components.com
[selenium]: https://www.selenium.dev
[sendgrid]: https://sendgrid.com
[sequelize]: https://sequelize.org
[slack]: https://slack.com
[standardjs]: https://standardjs.com
[svelte]: https://svelte.dev
[svelte-native]: https://svelte-native.technology
[svelte-kit]: https://kit.svelte.dev
[shadcn]: https://ui.shadcn.com
[solid]: https://www.solidjs.com
[solid-start]: https://start.solidjs.com
[socket.io]: https://socket.io
[sockjs]: https://sockjs.org
[spidermonkey]: https://spidermonkey.dev
[splunk]: https://www.splunk.com
[square]: https://developer.squareup.com
[storybook]: https://storybook.js.org
[stylex]: https://stylexjs.com
[supabase]: https://supabase.com
[synaptic.js]: http://caza.la/synaptic
[snyk]: https://snyk.io
[sonar]: https://www.sonarsource.com
[sqlite]: https://www.sqlite.org
[stripe]: https://stripe.com
[swc]: https://swc.rs
[swr]: https://swr.vercel.app
[swagger]: https://swagger.io
[tanstack]: https://tanstack.com
[tanstack-charts]: https://react-charts.tanstack.com
[tanstack-query]: https://tanstack.com/query/latest
[tanstack-table]: https://tanstack.com/table/latest
[tailwindcss]: https://tailwindcss.com
[tailwind-ui]: https://tailwindui.com
[tauri]: https://tauri.app
[tensorflow.js]: https://www.tensorflow.org/js
[terraform]: https://www.terraform.io
[testing-library]: https://testing-library.com
[theme-ui]: https://theme-ui.com
[three.js]: https://threejs.org
[thunder]: https://www.thunderclient.com
[travis-ci]: https://www.travis-ci.com
[trpc]: https://trpc.io
[ts]: https://www.typescriptlang.org
[tsoa]: https://tsoa-community.github.io/docs/
[turbo]: https://turbo.build
[typeorm]: https://typeorm.io
[ubuntu]: https://ubuntu.com
[uikit]: https://getuikit.com
[v8]: https://v8.dev
[valkey]: https://valkey.io
[vault]: https://www.vaultproject.io
[vercel]: https://vercel.com
[vite]: https://vitejs.dev
[vitest]: https://vitest.dev
[volt]: https://voltpkg.com
[vue]: https://vuejs.org
[wails]: https://wails.io
[webgl]: https://get.webgl.org
[webpack]: https://webpack.js.org
[windows]: https://www.microsoft.com/en-us/windows
[xstate]: https://stately.ai/docs
[yarn]: https://yarnpkg.com
[yandex]: https://browser.yandex.com
[yarn-workspaces]: https://yarnpkg.com/features/workspaces
[yoga]: https://the-guild.dev/graphql/yoga-server
[zig]: https://ziglang.org
[zitadel]: https://zitadel.com
[zustand]: https://zustand-demo.pmnd.rs
[gh-babel]: https://github.com/babel/babel
[gh-biome]: https://github.com/biomejs/biome
[gh-bun]: https://github.com/oven-sh/bun
[gh-deno]: https://github.com/denoland/deno
[gh-dprint]: https://github.com/dprint/dprint
[gh-eslint]: https://github.com/eslint/eslint
[gh-firebase]: https://github.com/firebase
[gh-jasmine]: https://github.com/jasmine/jasmine
[gh-javascriptcore]: https://github.com/apple-opensource/JavaScriptCore
[gh-jest]: https://github.com/jestjs/jest
[gh-llrt]: https://github.com/awslabs/llrt
[gh-mocha]: https://github.com/mochajs/mocha
[gh-node]: https://github.com/nodejs/node
[gh-npm]: https://github.com/npm
[gh-pnpm]: https://github.com/pnpm
[gh-parcel]: https://github.com/parcel-bundler/parcel
[gh-pocketbase]: https://github.com/pocketbase/pocketbase
[gh-prettier]: https://github.com/prettier/prettier
[gh-quickjs]: https://github.com/bellard/quickjs
[gh-supabase]: https://github.com/supabase/supabase
[gh-testing-library]: https://github.com/testing-library
[gh-v8]: https://github.com/v8/v8
[gh-vitest]: https://github.com/vitest-dev/vitest
[gh-wails]: https://github.com/wailsapp/wails
[gh-winstonjs]: https://github.com/winstonjs
[gh-yarn]: https://github.com/yarnpkg
[gh-husky]: https://github.com/typicode/husky
[gh-pino]: https://github.com/pinojs/pino
[gh-jwt]: https://github.com/auth0/node-jsonwebtoken
[gh-tensorflow]: https://github.com/tensorflow/tfjs
[gh-tauri]: https://github.com/tauri-apps/tauri
[gh-three]: https://github.com/mrdoob/three.js
[gh-expo]: https://github.com/expo/expo
[gh-brain]: https://github.com/BrainJS/brain.js
[gh-prisma]: https://github.com/prisma/prisma
[gh-tanstack-chart]: https://github.com/tanstack/chart
[gh-tanstack-query]: https://github.com/tanstack/query
[gh-tanstack-table]: https://github.com/tanstack/table
[gh-trpc]: https://github.com/trpc/trpc
[gh-cypress]: https://github.com/cypress-io/cypress
[gh-karma]: https://github.com/karma-runner/karma
[gh-ms-playwright]: https://github.com/microsoft/playwright
[gh-ms-typescript]: https://github.com/microsoft/typescript
[gh-puppeteer]: https://github.com/puppeteer/puppeteer
[gh-selenium]: https://github.com/SeleniumHQ/selenium
[gh-esbuild]: https://github.com/evanw/esbuild
[gh-rollup]: https://github.com/rollup/rollup
[gh-lerna]: https://github.com/lerna/lerna
[gh-webpack]: https://github.com/webpack/webpack
[gh-nx]: https://github.com/nrwl/nx
[gh-vite]: https://github.com/vitejs/vite
[gh-electron]: https://github.com/electron/electron
[gh-nativewind]: https://github.com/marklawlor/nativewind
[gh-ionic]: https://github.com/ionic-team/ionic-framework
[gh-nativescript]: https://github.com/NativeScript/NativeScript
[gh-bootstrap]: https://github.com/twbs/bootstrap
[gh-bulma]: https://github.com/jgthms/bulma
[gh-daisy-ui]: https://github.com/saadeghi/daisyui
[gh-materialize-css]: https://github.com/materializecss/materialize
[gh-tailwind-css]: https://github.com/tailwindlabs/tailwindcss
[gh-uikit]: https://github.com/uikit/uikit
[gh-ant-design]: https://github.com/ant-design/ant-design
[gh-chakra-ui]: https://github.com/chakra-ui/chakra-ui
[gh-mui]: https://github.com/mui/material-ui
[gh-next-ui]: https://github.com/nextui-org/nextui
[gh-shadcn-ui]: https://github.com/shadcn-ui/ui
[gh-storybook]: https://github.com/storybookjs/storybook
[gh-theme-ui]: https://github.com/system-ui/theme-ui
[gh-chart-js]: https://github.com/chartjs/Chart.js
[gh-d3]: https://github.com/d3/d3
[gh-google-chart]: https://github.com
[gh-plotly]: https://github.com/plotly/plotly.js
[gh-axios]: https://github.com/axios/axios
[gh-angular]: https://github.com/angular/angular
[gh-angular-js]: https://github.com/angular/angular.js
[gh-backbone]: https://github.com/jashkenas/backbone
[gh-ember]: https://github.com/emberjs/ember.js
[gh-jquery]: https://github.com/jquery/jquery
[gh-svelte]: https://github.com/sveltejs/svelte
[gh-vue]: https://github.com/vuejs
[gh-solid]: https://github.com/solidjs/solid
[gh-nuxt]: https://github.com/nuxt/nuxt
[gh-svelte-kit]: https://github.com/sveltejs/kit
[gh-remix]: https://github.com/remix-run/remix
[gh-solid-start]: https://github.com/solidjs/solid-start
[gh-astro]: https://github.com/withastro/astro
[gh-docsify]: https://github.com/docsifyjs/docsify
[gh-gatsby]: https://github.com/gatsbyjs/gatsby
[gh-apollo-client]: https://github.com/apollographql/apollo-client
[gh-apollo-server]: https://github.com/apollographql/apollo-server
[gh-socket]: https://github.com/socketio/socket.io
[gh-express]: https://github.com/expressjs/express
[gh-nest]: https://github.com/nestjs/nest
[gh-hapi]: https://github.com/hapijs/hapi
[gh-fastify]: https://github.com/fastify/fastify
[gh-grpc]: https://github.com/grpc/grpc-node
[gh-drizzle]: https://github.com/drizzle-team/drizzle-orm
[gh-sequelize]: https://github.com/sequelize/sequelize
[gh-typeorm]: https://github.com/typeorm/typeorm
[gh-mikro-orm]: https://github.com/mikro-orm/mikro-orm
[gh-mongoose]: https://github.com/Automattic/mongoose
[gh-math]: https://github.com/josdejong/mathjs
[gh-ml5]: https://github.com/ml5js/ml5-library
[gh-mind]: https://github.com/stevenmiller888/mind
[gh-synaptic]: https://github.com/cazala/synaptic
[gh-netlify]: https://github.com/netlify
[gh-recharts]: https://github.com/recharts/recharts
[gh-nvm]: https://github.com/nvm-sh/nvm
[gh-yoga]: https://github.com/dotansimha/graphql-yoga
[gh-mercurius]: https://github.com/mercurius-js/mercurius
[gh-render]: https://github.com/renderinc
[gh-lit]: https://github.com/lit/lit
[gh-preact]: https://github.com/preactjs/preact
[gh-qwik]: https://github.com/BuilderIO/qwik
[gh-meta-docusaurus]: https://github.com/facebook/docusaurus
[gh-meta-hermes]: https://github.com/facebook/hermes
[gh-meta-react]: https://github.com/facebook/react
[gh-meta-rn]: https://github.com/facebook/react-native
[gh-meta-stylex]: https://github.com/facebook/stylex
[gh-styled-components]: https://github.com/styled-components/styled-components
[gh-emotion]: https://github.com/emotion-js/emotion
[gh-graphql]: https://github.com/graphql/graphql-spec
[gh-renovate]: https://github.com/renovatebot/renovate
[gh-snyk]: https://github.com/snyk
[gh-fly]: https://github.com/superfly
[gh-next-auth]: https://github.com/nextauthjs/next-auth
[gh-neon]: https://github.com/neondatabase/neon
[gh-jotai]: https://github.com/pmndrs/jotai
[gh-zustand]: https://github.com/pmndrs/zustand
[gh-xstate]: https://github.com/statelyai/xstate
[gh-redux]: https://github.com/reduxjs/redux
[gh-vercel]: https://github.com/vercel
[gh-vercel-next]: https://github.com/vercel/next.js
[gh-vercel-swr]: https://github.com/vercel/swr
[gh-vercel-turbo]: https://github.com/vercel/turbo
[gh-jsr]: https://github.com/jsr-io/jsr
[gh-volt]: https://github.com/dimensionhq/volt
[gh-docker]: https://github.com/docker
[gh-vault]: https://github.com/hashicorp/vault
[gh-terraform]: https://github.com/hashicorp/terraform
[gh-postgresql]: https://github.com/postgres/postgres
[gh-kubernetes]: https://github.com/kubernetes/kubernetes
[gh-aws]: https://github.com/aws
[gh-redis]: https://github.com/redis/redis
[gh-apache-activemq]: https://github.com/apache/activemq
[gh-apache-couchdb]: https://github.com/apache/couchdb
[gh-apache-kafka]: https://github.com/apache/kafka
[gh-rabbitmq]: https://github.com/rabbitmq
[gh-memcached]: https://github.com/memcached/memcached
[gh-sass]: https://github.com/sass/sass
[gh-postcss]: https://github.com/postcss/postcss
[gh-mongodb]: https://github.com/mongodb/mongo
[gh-cockroach]: https://github.com/cockroachdb/cockroach
[gh-mysql]: https://github.com/mysql/mysql-server
[gh-sqlite]: https://github.com/sqlite/sqlite
[gh-heroku]: https://github.com/heroku
[gh-winterjs]: https://github.com/wasmerio/winterjs
[gh-rspack]: https://github.com/web-infra-dev/rspack
[gh-nhost]: https://github.com/nhost/nhost
[gh-appwrite]: https://github.com/appwrite/appwrite
[gh-azure]: https://github.com/Azure
[gh-google-cloud]: https://github.com/GoogleCloudPlatform
[gh-digital-ocean]: https://github.com/digitalocean
[gh-ibm-cloud]: https://github.com/IBM-Cloud
[gh-railway]: https://github.com/railwayapp
[gh-mariadb]: https://github.com/MariaDB/server
[gh-planetscale]: https://github.com/planetscale
[gh-svelte-native]: https://github.com/halfnelson/svelte-native
[gh-meteor]: https://github.com/meteor/meteor
[gh-quasar]: https://github.com/quasarframework/quasar
[gh-nats]: https://github.com/nats-io/nats-server
[gh-braintree]: https://github.com/braintree/braintree-web
[gh-paddle]: https://github.com/PaddleHQ/paddle-node-sdk
[gh-paypal]: https://github.com/paypal/paypal-js
[gh-square]: https://github.com/square/web-sdk
[gh-stripe]: https://github.com/stripe/stripe-js
[gh-auth0]: https://github.com/auth0
[gh-keycloak]: https://github.com/keycloak
[gh-onelogin]: https://github.com/onelogin
[gh-osso]: https://github.com/enterprise-oss/osso
[gh-zitadel]: https://github.com/zitadel/zitadel
[gh-thunder]: https://github.com/thunderclient/thunder-client-support
[gh-postman]: https://github.com/postmanlabs
[gh-insomnia]: https://github.com/Kong/insomnia
[gh-swagger]: https://github.com/swagger-api
[gh-bit]: https://github.com/teambit/bit
[gh-oxc]: https://github.com/oxc-project/oxc
[gh-npm-cli]: https://github.com/npm/cli
[gh-swc]: https://github.com/swc-project/swc
[gh-koa]: https://github.com/koajs/koa
[gh-openshift]: https://github.com/openshift
[gh-garph]: https://github.com/stepci/garph
[gh-ws]: https://github.com/websockets/ws
[gh-sockjs]: https://github.com/sockjs
[gh-app-engine]: https://github.com/GoogleCloudPlatform/appengine-cloud-demo-portal
[gh-jslint]: https://github.com/jslint-org/jslint
[gh-standardjs]: https://github.com/standard/standard
[gh-millionlint]: https://github.com/aidenybai/million
[gh-mailgun]: https://github.com/mailgun
[gh-sendgrid]: https://github.com/sendgrid/sendgrid-nodejs
[gh-postmark]: https://github.com/ActiveCampaign/postmark.js
[gh-mailchimp]: https://github.com/mailchimp
[gh-clerk]: https://github.com/clerk/javascript
[gh-resend]: https://github.com/resend
[gh-chartist]: https://github.com/chartist-js/chartist
[gh-highcharts]: https://github.com/highcharts/highcharts
[gh-helmet]: https://github.com/helmetjs/helmet
[gh-cors]: https://github.com/expressjs/cors
[gh-tsoa]: https://github.com/lukeautry/tsoa
[gh-passport]: https://github.com/jaredhanson/passport
[gh-grafana]: https://github.com/grafana/grafana
[gh-splunk]: https://github.com/splunk
[gh-npmlog]: https://github.com/npm/npmlog
[gh-valkey]: https://github.com/valkey-io/valkey
