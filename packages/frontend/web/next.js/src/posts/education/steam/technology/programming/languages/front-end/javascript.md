---
title: 'JavaScript'
date: '2025-05-01'
---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Abbreviation](#abbreviation)
- [Nominations](#nominations)
  - [Operating Systems](#operating-systems)
  - [Engines](#engines)
  - [Runtimes](#runtimes)
  - [Packages Managers](#packages-managers)
  - [Monorepos](#monorepos)
  - [Linters](#linters)
  - [Test](#test)
    - [Unit Test](#unit-test)
    - [E2E Test](#e2e-test)
  - [Bundlers](#bundlers)
  - [CSS Components](#css-components)
  - [React Components](#react-components)
  - [Web Frameworks](#web-frameworks)
  - [Meta Frameworks](#meta-frameworks)
  - [Native](#native)
    - [Mobile Frameworks](#mobile-frameworks)
    - [Desktop Frameworks](#desktop-frameworks)
  - [HTTP Frameworks](#http-frameworks)
  - [GraphQL Frameworks](#graphql-frameworks)
  - [Back-end Frameworks](#back-end-frameworks)
  - [Object Relational Mapping](#object-relational-mapping)
  - [Messages](#messages)
- [Techstack](#techstack)
- [References](#references)

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

[⬆️ Back to Table of Contents](#table-of-contents)

## Nominations

### Operating Systems

| Industry    | Supersector | Sector          | Subsector | Technology                           | Open Source | Maintainer      | Language | Recommended |
| ----------- | ----------- | --------------- | --------- | ------------------------------------ | ----------- | --------------- | -------- | ----------- |
| Development | OS          | [Linux][kernel] |           | [Alpine](https://alpinelinux.org/)   |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Arch](https://archlinux.org/)       |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Debian][debian]                     |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Fedora](https://fedoraproject.org/) |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Kali](https://www.kali.org/)        |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Mint][linuxmint]                    |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | RHEL (Red Hat Enterprise Linux)      |             |                 |          |             |
| Development | OS          | [Linux][kernel] |           | [Ubuntu][ubuntu]                     |             |                 |          | Recommended |
| Development | OS          | Unix            |           | [macOS][macos]                       |             | [Apple][apple]  |          |             |
| Development | OS          | OS/2            |           | [Windows][windows]                   |             | [Microsoft][ms] |          |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Engines

| Industry    | Supersector | Sector | Subsector | Technology                   | Open Source                 | Maintainer           | Language | Recommended |
| ----------- | ----------- | ------ | --------- | ---------------------------- | --------------------------- | -------------------- | -------- | ----------- |
| Development | Engine      |        |           | [Hermes][hermes]             | [GitHub][gh-meta-hermes]    | [Meta][meta]         | C++      |             |
| Development | Engine      |        |           | [JavaScriptCore][jsc]        | [GitHub][gh-javascriptcore] | [Apple][apple]       | C++      |             |
| Development | Engine      |        |           | [QuickJS][quickjs]           | [GitHub][gh-quickjs]        |                      | C        |             |
| Development | Engine      |        |           | [SpiderMonkey][spidermonkey] |                             | [Mozilla][mozilla]   | C++      |             |
| Development | Engine      |        |           | [V8][v8]                     | [GitHub][gh-v8]             | [Alphabet][alphabet] | C++      | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

### Runtimes

| Industry    | Supersector | Sector                       | Subsector | Technology                 | Open Source           | Maintainer        | Language   | Recommended |
| ----------- | ----------- | ---------------------------- | --------- | -------------------------- | --------------------- | ----------------- | ---------- | ----------- |
| Development | Runtime     | [JavaScriptCore][jsc]        |           | [Bun][bun]                 | [GitHub][gh-bun]      |                   | [Zig][zig] |             |
| Development | Runtime     | [QuickJS][quickjs]           |           | LLRT (Low Latency Runtime) | [GitHub][gh-llrt]     | [AWS][aws]        | [JS][js]   |             |
| Development | Runtime     | [V8][v8]                     |           | [Deno][deno]               | [GitHub][gh-deno]     |                   | [Rust][rs] |             |
| Development | Runtime     | [V8][v8]                     |           | [Node.js][node.js]         | [GitHub][gh-node]     | [OpenJS][openjsf] | [JS][js]   | Recommended |
| Development | Runtime     | [SpiderMonkey][spidermonkey] |           | WinterJS                   | [GitHub][gh-winterjs] |                   | [JS][js]   |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Packages Managers

| Industry    | Supersector       | Sector   | Subsector | Technology       | Open Source       | Maintainer      | Language   | Recommended |
| ----------- | ----------------- | -------- | --------- | ---------------- | ----------------- | --------------- | ---------- | ----------- |
| Development | Development Tools | Packages | Manager   | [npm CLI][npmjs] | [GitHub][github]  | [Microsoft][ms] | [JS][js]   |             |
| Development | Development Tools | Packages | Manager   | [pnpm][pnpm]     | [GitHub][gh-pnpm] |                 | [TS][ts]   |             |
| Development | Development Tools | Packages | Manager   | [yarn][yarn]     | [GitHub][gh-yarn] | [Meta][meta]    | [TS][ts]   | Recommended |
| Development | Development Tools | Packages | Manager   | [Volt][volt]     | [GitHub][gh-volt] |                 | [Rust][rs] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Monorepos

| Industry    | Supersector       | Sector   | Subsector | Technology                         | Open Source               | Maintainer       | Language   | Recommended |
| ----------- | ----------------- | -------- | --------- | ---------------------------------- | ------------------------- | ---------------- | ---------- | ----------- |
| Development | Development Tools | Monorepo |           | [Bit][bit]                         | [GitHub][gh-bit]          |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [NX][nx]                           | [GitHub][gh-nx]           |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [Lerna][lerna]                     | [GitHub][gh-lerna]        |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [pnpm Workspaces][pnpm-workspaces] | [GitHub][gh-pnpm]         |                  | [TS][ts]   |             |
| Development | Development Tools | Monorepo |           | [Turbo][turbo]                     | [GitHub][gh-vercel-turbo] | [Vercel][vercel] | [Rust][rs] | Recommended |
| Development | Development Tools | Monorepo |           | [Yarn Workspaces][yarn-workspaces] | [GitHub][gh-yarn]         |                  | [TS][ts]   |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Linters

| Industry    | Supersector       | Sector  | Subsector | Technology                 | Open Source              | Maintainer        | Language | Recommended |
| ----------- | ----------------- | ------- | --------- | -------------------------- | ------------------------ | ----------------- | -------- | ----------- |
| Development | Development Tools | Linters |           | [ESLint][eslint]           | [GitHub][gh-eslint]      | [OpenJS][openjsf] | [JS][js] | Recommended |
| Development | Development Tools | Linters |           | [JSLint][jslint]           | [GitHub][gh-jslint]      |                   | [JS][js] |             |
| Development | Development Tools | Linters |           | [StandardJS][standardjs]   | [GitHub][gh-standardjs]  |                   | [JS][js] |             |
| Development | Development Tools | Linters |           | [MillionLint][millionlint] | [GitHub][gh-millionlint] |                   | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Test

#### Unit Test

| Industry    | Supersector       | Sector  | Subsector | Technology                         | Open Source                  | Maintainer        | Language | Recommended |
| ----------- | ----------------- | ------- | --------- | ---------------------------------- | ---------------------------- | ----------------- | -------- | ----------- |
| Development | Development Tools | Testing | Unit Test | [Jasmine][jasmine]                 | [GitHub][gh-jasmine]         |                   | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Jest][jest]                       | [GitHub][gh-jest]            | [OpenJS][openjsf] | [TS][ts] | Recommended |
| Development | Development Tools | Testing | Unit Test | [Mocha][mocha]                     | [GitHub][gh-mocha]           | [OpenJS][openjsf] | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Testing Library][testing-library] | [GitHub][gh-testing-library] |                   | [JS][js] |             |
| Development | Development Tools | Testing | Unit Test | [Vitest][vitest]                   | [GitHub][gh-vitest]          |                   | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

#### E2E Test

| Industry    | Supersector       | Sector  | Subsector | Technology               | Open Source                | Maintainer      | Language     | Recommended |
| ----------- | ----------------- | ------- | --------- | ------------------------ | -------------------------- | --------------- | ------------ | ----------- |
| Development | Development Tools | Testing | E2E Test  | [Cypress][cypress]       | [GitHub][gh-cypress]       |                 | [JS][js]     | Recommended |
| Development | Development Tools | Testing | E2E Test  | [Karma][karma]           | [GitHub][gh-karma]         |                 | [JS][js]     |             |
| Development | Development Tools | Testing | E2E Test  | [Playwright][playwright] | [GitHub][gh-ms-playwright] | [Microsoft][ms] | [TS][ts]     |             |
| Development | Development Tools | Testing | E2E Test  | [Puppeteer][puppeteer]   | [GitHub][gh-puppeteer]     |                 | [TS][ts]     |             |
| Development | Development Tools | Testing | E2E Test  | [Selenium][selenium]     | [GitHub][gh-selenium]      |                 | [Java][java] |             |
| Development | Development Tools | Testing | E2E Test  | [Storybook][storybook]   | [GitHub][gh-storybook]     |                 | [TS][ts]     |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Bundlers

| Industry    | Supersector | Sector  | Subsector | Technology         | Open Source          | Maintainer | Language   | Recommended |
| ----------- | ----------- | ------- | --------- | ------------------ | -------------------- | ---------- | ---------- | ----------- |
| Development | Build Tools | Bundler |           | [ESBuild][esbuild] | [GitHub][gh-esbuild] |            | [Go][go]   |             |
| Development | Build Tools | Bundler |           | [Parcel][parceljs] | [GitHub][gh-parcel]  |            | [JS][js]   |             |
| Development | Build Tools | Bundler |           | [Rollup][rollup]   | [GitHub][gh-rollup]  |            | [JS][js]   |             |
| Development | Build Tools | Bundler |           | [Rspack][rspack]   | [GitHub][gh-rspack]  |            | [Rust][rs] |             |
| Development | Build Tools | Bundler |           | [Webpack][webpack] | [GitHub][gh-webpack] |            | [JS][js]   | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

### CSS Components

| Industry  | Supersector | Sector     | Subsector                  | Technology                        | Open Source                  | Maintainer | Language     | Recommended |
| --------- | ----------- | ---------- | -------------------------- | --------------------------------- | ---------------------------- | ---------- | ------------ | ----------- |
| Front-end | Styling     | Components | [TailwindCSS][tailwindcss] | [DaisyUI][daisyui]                | [GitHub][gh-daisy-ui]        |            | CSS          | Recommended |
| Front-end | Styling     | Components | [TailwindCSS][tailwindcss] | [TailwindUI][tailwind-ui]         | Freemium                     |            |              |             |
| Front-end | Styling     | Components | Toolkit                    | [Bootstrap][bootstrap]            | [GitHub][gh-bootstrap]       |            | [JS][js]     |             |
| Front-end | Styling     | Components | Toolkit                    | [Bulma][bulma]                    | [GitHub][gh-bulma]           |            | [SASS][sass] |             |
| Front-end | Styling     | Components | Toolkit                    | [Materialize CSS][materializecss] | [GitHub][gh-materialize-css] |            | [TS][ts]     |             |
| Front-end | Styling     | Components | Toolkit                    | [shadcn/ui][shadcn]               | [GitHub][gh-shadcn-ui]       |            | [TS][ts]     |             |
| Front-end | Styling     | Components | Toolkit                    | [UIKit][uikit]                    | [GitHub][gh-uikit]           |            | [SASS][sass] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### React Components

| Industry  | Supersector | Sector     | Subsector  | Technology               | Open Source             | Maintainer       | Language | Recommended |
| --------- | ----------- | ---------- | ---------- | ------------------------ | ----------------------- | ---------------- | -------- | ----------- |
| Front-end | Styling     | Components | [JSX][jsx] | [Ant Design][ant-design] | [GitHub][gh-ant-design] |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [Chakra UI][chakra-ui]   | [GitHub][gh-chakra-ui]  |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [MUI][mui]               | [GitHub][gh-mui]        |                  | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [NextUI][next-ui]        | [GitHub][gh-next-ui]    | [Vercel][vercel] | [TS][ts] |             |
| Front-end | Styling     | Components | [JSX][jsx] | [Theme UI][theme-ui]     | [GitHub][gh-theme-ui]   |                  | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Web Frameworks

| #   | Industry  | Supersector   | Sector         | Subsector | Technology              | Open Source             | Maintainer           | Language | Recommended |
| --- | --------- | ------------- | -------------- | --------- | ----------------------- | ----------------------- | -------------------- | -------- | ----------- |
| 01  | Front-end | Web Framework | MVC            |           | [Angular][angular]      | [GitHub][gh-angular]    | [Alphabet][alphabet] | [TS][ts] |             |
| 02  | Front-end | Web Framework | MVC            |           | [AngularJS][angularjs]  | [GitHub][gh-angular-js] | [Alphabet][alphabet] | [JS][js] |             |
| 03  | Front-end | Web Framework | MVC            |           | [Backbone.js][backbone] | [GitHub][gh-backbone]   |                      | [JS][js] |             |
| 04  | Front-end | Web Framework | MVC            |           | [Ember.js][ember]       | [GitHub][gh-ember]      |                      | [JS][js] |             |
| 05  | Front-end | Web Framework | MVC            |           | [Svelte.js][svelte]     | [GitHub][gh-svelte]     | [Vercel][vercel]     | [JS][js] |             |
| 06  | Front-end | Web Framework | MVC            |           | [Vue.js][vue]           | [GitHub][gh-vue]        |                      | [TS][ts] |             |
| 07  | Front-end | Web Framework | [JSX][jsx]     |           | [React][react]          | [GitHub][gh-meta-react] | [Meta][meta]         | [JS][js] | Recommended |
| 08  | Front-end | Web Framework | [JSX][jsx]     |           | [Solid.js][solid]       | [GitHub][gh-solid]      |                      | [TS][ts] |             |
| 09  | Front-end | Web Framework | [React][react] |           | [Preact][preact]        | [GitHub][gh-preact]     |                      | [JS][js] |             |
| 10  | Front-end | Web Framework | [React][react] |           | [Qwik][qwik]            | [GitHub][gh-qwik]       |                      | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Meta Frameworks

| #   | Industry  | Supersector    | Sector | Subsector           | Technology                | Open Source              | Maintainer       | Language | Recommended |
| --- | --------- | -------------- | ------ | ------------------- | ------------------------- | ------------------------ | ---------------- | -------- | ----------- |
| 1   | Front-end | Meta Framework | SSR    | [React][react]      | [Next.js][next.js]        | [GitHub][gh-vercel-next] | [Vercel][vercel] | [JS][js] | Recommended |
| 2   | Front-end | Meta Framework | SSR    | [React][react]      | [Remix][remix]            | [GitHub][gh-remix]       |                  | [TS][ts] |             |
| 3   | Front-end | Meta Framework | SSR    | [Solid.js][solid]   | [SolidStart][solid-start] | [GitHub][gh-solid-start] |                  | [TS][ts] |             |
| 4   | Front-end | Meta Framework | SSR    | [Svelte.js][svelte] | [SvelteKit][svelte-kit]   | [GitHub][gh-svelte-kit]  | [Vercel][vercel] | [JS][js] |             |
| 5   | Front-end | Meta Framework | SSR    | [Vue][vue]          | [Nuxt][nuxt]              | [GitHub][gh-nuxt]        |                  | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Native

#### Mobile Frameworks

| #   | Industry  | Supersector      | Sector              | Subsector | Technology                     | Open Source                | Maintainer             | Language | Recommended |
| --- | --------- | ---------------- | ------------------- | --------- | ------------------------------ | -------------------------- | ---------------------- | -------- | ----------- |
| 1   | Front-end | Mobile Framework |                     |           | [Ionic][ionic]                 | [GitHub][gh-ionic]         |                        | [TS][ts] |             |
| 2   | Front-end | Mobile Framework |                     |           | [NativeScript][nativescript]   | [GitHub][gh-nativescript]  | [OpenJS][openjsf]      | [TS][ts] |             |
| 3   | Front-end | Mobile Framework |                     |           | [Lynx](https://lynxjs.org/)    |                            | [ByteDance][bytedance] |          |             |
| 4   | Front-end | Mobile Framework | [React][react]      |           | [React Native][rn]             | [GitHub][gh-meta-rn]       |                        | C++      |             |
| 5   | Front-end | Mobile Framework | [React Native][rn]  |           | [Expo][expo]                   | [GitHub][gh-expo]          |                        | [TS][ts] | Recommended |
| 6   | Front-end | Mobile Framework | [Svelte.js][svelte] |           | [Svelte Native][svelte-native] | [GitHub][gh-svelte-native] |                        | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

#### Desktop Frameworks

| Industry  | Supersector       | Sector   | Subsector | Technology                | Open Source           | Maintainer        | Language   | Recommended |
| --------- | ----------------- | -------- | --------- | ------------------------- | --------------------- | ----------------- | ---------- | ----------- |
| Front-end | Desktop Framework | Chromium |           | [Electron.js][electronjs] | [GitHub][gh-electron] | [OpenJS][openjsf] | C++        |             |
| Front-end | Desktop Framework | WebView  |           | [Tauri][tauri]            | [GitHub][gh-tauri]    |                   | [Rust][rs] | Recommended |
| Front-end | Desktop Framework | WebView  |           | [Wails][wails]            | [GitHub][gh-wails]    |                   | [Go][go]   |             |
| Front-end | Desktop Framework |          |           | [Meteor][meteor]          | [GitHub][gh-meteor]   |                   | [JS][js]   |             |
| Front-end | Desktop Framework |          |           | [Quasar][quasar]          | [GitHub][gh-quasar]   |                   | [JS][js]   |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### HTTP Frameworks

| Industry | Supersector | Sector | Subsector | Technology              | Open Source          | Maintainer        | Language | Recommended |
| -------- | ----------- | ------ | --------- | ----------------------- | -------------------- | ----------------- | -------- | ----------- |
| Back-end | Framework   | HTTP   |           | [Express.js][expressjs] | [GitHub][gh-express] | [OpenJS][openjsf] | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Fastify][fastify]      | [GitHub][gh-fastify] | [OpenJS][openjsf] | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Hapi][hapi]            | [GitHub][gh-hapi]    |                   | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Koa][koa]              | [GitHub][gh-koa]     |                   | [JS][js] |             |
| Back-end | Framework   | HTTP   |           | [Nest.js][nest.js]      | [GitHub][gh-nest]    |                   | [TS][ts] | Recommended |

[⬆️ Back to Table of Contents](#table-of-contents)

### GraphQL Frameworks

| Industry | Supersector | Sector             | Subsector | Technology                     | Open Source                | Maintainer       | Language | Recommended |
| -------- | ----------- | ------------------ | --------- | ------------------------------ | -------------------------- | ---------------- | -------- | ----------- |
| Back-end | Framework   | [GraphQL][graphql] |           | [GraphQL][graphql]             | [GitHub][gh-graphql]       | [Meta][meta]     | [TS][ts] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Apollo Server][apollo-server] | [GitHub][gh-apollo-server] | [Apollo][apollo] | [TS][ts] | Recommended |
| Back-end | Framework   | [GraphQL][graphql] |           | [Garph][garph]                 | [GitHub][gh-garph]         |                  | [TS][ts] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Mercurius][mercurius]         | [GitHub][gh-mercurius]     |                  | [JS][js] |             |
| Back-end | Framework   | [GraphQL][graphql] |           | [Yoga][yoga]                   | [GitHub][gh-yoga]          |                  | [TS][ts] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Back-end Frameworks

| Industry | Supersector | Sector    | Subsector | Technology             | Open Source         | Maintainer           | Language | Recommended |
| -------- | ----------- | --------- | --------- | ---------------------- | ------------------- | -------------------- | -------- | ----------- |
| Back-end | Framework   | RPC       |           | [gRPC][grpc]           | [GitHub][gh-grpc]   | [Alphabet][alphabet] | [TS][ts] |             |
| Back-end | Framework   | RPC       |           | [tRPC][trpc]           | [GitHub][gh-trpc]   |                      | [TS][ts] | Recommended |
| Back-end | Framework   | WebSocket |           | [Socket.io][socket.io] | [GitHub][gh-socket] |                      | [TS][ts] | Recommended |
| Back-end | Framework   | WebSocket |           | [SockJS][sockjs]       | [GitHub][gh-sockjs] |                      | [JS][js] |             |
| Back-end | Framework   | WebSocket |           | WS                     | [GitHub][gh-ws]     |                      | [JS][js] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Object Relational Mapping

| Industry | Supersector | Sector | Subsector   | Technology             | Open Source            | Maintainer | Language | Recommended |
| -------- | ----------- | ------ | ----------- | ---------------------- | ---------------------- | ---------- | -------- | ----------- |
| Back-end | Database    | ORM    | SQL & NoSQL | [MikroORM][mikro-orm]  | [GitHub][gh-mikro-orm] |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL & NoSQL | [Prisma][prisma]       | [GitHub][gh-prisma]    |            | [TS][ts] | Recommended |
| Back-end | Database    | ORM    | SQL & NoSQL | [TypeORM][typeorm]     | [GitHub][gh-typeorm]   |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL         | [Drizzle][drizzle]     | [GitHub][gh-drizzle]   |            | [TS][ts] |             |
| Back-end | Database    | ORM    | SQL         | [Sequelize][sequelize] | [GitHub][gh-sequelize] |            | [JS][js] |             |
| Back-end | Database    | ORM    | NoSQL       | [Mongoose][mongoose]   | [GitHub][gh-mongoose]  |            | [JS][js] |             |

[⬆️ Back to Table of Contents](#table-of-contents)

### Messages

| Industry | Supersector | Sector              | Subsector | Technology                  | Open Source                  | Maintainer       | Language     | Recommended |
| -------- | ----------- | ------------------- | --------- | --------------------------- | ---------------------------- | ---------------- | ------------ | ----------- |
| Back-end | Messages    | Broker              |           | [ActiveMQ][apache-activemq] | [GitHub][gh-apache-activemq] | [Apache][apache] | [Java][java] |             |
| Back-end | Messages    | Broker              |           | [Kafka][apache-kafka]       | [GitHub][gh-apache-kafka]    | [Apache][apache] | [Java][java] | Recommended |
| Back-end | Messages    | Broker              |           | [RabbitMQ][rabbitmq]        | [GitHub][gh-rabbitmq]        |                  | Starlark     |             |
| Back-end | Messages    | Publish / Subscribe |           | [MQTT][mqtt]                |                              |                  |              |             |
| Back-end | Messages    | Publish / Subscribe |           | [NATS][nats]                | [GitHub][gh-nats]            |                  | [Go][go]     |             |

[⬆️ Back to Table of Contents](#table-of-contents)

## Techstack

| Industry    | Supersector           | Sector                       | Subsector                  | Technology                                      | Open Source                    | Maintainer               | Language     | Recommended |
| ----------- | --------------------- | ---------------------------- | -------------------------- | ----------------------------------------------- | ------------------------------ | ------------------------ | ------------ | ----------- |
| Development | OS                    | [Linux][kernel]              |                            | [Debian][debian]                                |                                |                          |              |             |
| Development | OS                    | [Linux][kernel]              |                            | [Mint][linuxmint]                               |                                |                          |              |             |
| Development | OS                    | [Linux][kernel]              |                            | [Ubuntu][ubuntu]                                |                                |                          |              |             |
| Development | OS                    | Unix                         |                            | [macOS][macos]                                  |                                | [Apple][apple]           |              |             |
| Development | OS                    | OS/2                         |                            | [Windows][windows]                              |                                | [Microsoft][ms]          |              |             |
| Development | Software              | Version Control              |                            | [BitKeeper][bitkeeper]                          |                                |                          |              |             |
| Development | Software              | Version Control              |                            | [Git][git]                                      |                                |                          |              |             |
| Development | Software              | Version Control              |                            | [Mercurial][mercurial]                          |                                |                          |              |             |
| Development | Software              | Version Control              |                            | [Helix Core][perforce-helix-core]               |                                | [Perforce][perforce]     |              |             |
| Development | Software              | Version Control              |                            | [SVN][apache-svn]                               |                                | [Apache][apache]         |              |             |
| Development | Language              | Programming                  |                            | [JavaScript][ecmascript]                        |                                |                          |              |             |
| Development | Language              | Programming                  |                            | [TypeScript][ts]                                | [GitHub][gh-ms-typescript]     | [Microsoft][ms]          | [TS][ts]     | Recommended |
| Development | [Engines](#engines)   |                              |                            | [Hermes][hermes]                                | [GitHub][gh-meta-hermes]       | [Meta][meta]             | C++          |             |
| Development | [Engines](#engines)   |                              |                            | [JavaScriptCore][jsc]                           | [GitHub][gh-javascriptcore]    | [Apple][apple]           | C++          |             |
| Development | [Engines](#engines)   |                              |                            | [QuickJS][quickjs]                              | [GitHub][gh-quickjs]           |                          | C            |             |
| Development | [Engines](#engines)   |                              |                            | [SpiderMonkey][spidermonkey]                    |                                | [Mozilla][mozilla]       | C++          |             |
| Development | [Engines](#engines)   |                              |                            | [V8][v8]                                        | [GitHub][gh-v8]                | [Alphabet][alphabet]     | C++          | Recommended |
| Development | [Runtimes](#runtimes) | [JavaScriptCore][jsc]        |                            | [Bun][bun]                                      | [GitHub][gh-bun]               |                          | [Zig][zig]   |             |
| Development | [Runtimes](#runtimes) | [QuickJS][quickjs]           |                            | LLRT (Low Latency Runtime)                      | [GitHub][gh-llrt]              | [AWS][aws]               | [JS][js]     |             |
| Development | [Runtimes](#runtimes) | [V8][v8]                     |                            | [Deno][deno]                                    | [GitHub][gh-deno]              |                          | [Rust][rs]   |             |
| Development | [Runtimes](#runtimes) | [V8][v8]                     |                            | [Node.js][node.js]                              | [GitHub][gh-node]              | [OpenJS][openjsf]        | [JS][js]     | Recommended |
| Development | [Runtimes](#runtimes) | [SpiderMonkey][spidermonkey] |                            | WinterJS                                        | [GitHub][gh-winterjs]          |                          | [JS][js]     |             |
| Development | Runtime Management    | [Node.js][node.js]           |                            | NVM (Node Version Management)                   | [GitHub][gh-nvm]               |                          | Shell        | Recommended |
| Development | Development Tools     | Packages                     | Registry                   | [npm Registry][npmjs]                           | [GitHub][gh-npm]               | [Microsoft][ms]          | [JS][js]     | Recommended |
| Development | Development Tools     | Packages                     | Registry                   | [JSR][jsr]                                      | [GitHub][gh-jsr]               |                          | [Rust][rs]   |             |
| Development | Development Tools     | Packages                     | Registry                   | [GitHub Packages][github-packages]              | [GitHub][github]               |                          |              |             |
| Development | Development Tools     | Packages                     | Manager                    | [npm CLI][npmjs]                                | [GitHub][gh-npm-cli]           | [Microsoft][ms]          | [JS][js]     |             |
| Development | Development Tools     | Packages                     | Manager                    | [pnpm][pnpm]                                    | [GitHub][gh-pnpm]              |                          | [TS][ts]     |             |
| Development | Development Tools     | Packages                     | Manager                    | [Yarn][yarn]                                    | [GitHub][gh-yarn]              | [Meta][meta]             | [TS][ts]     | Recommended |
| Development | Development Tools     | Packages                     | Manager                    | [Volt][volt]                                    | [GitHub][gh-volt]              |                          | [Rust][rs]   |             |
| Development | Development Tools     | Packages                     | Security                   | [Snyk][snyk]                                    | [GitHub][gh-snyk]              |                          | [TS][ts]     | Recommended |
| Development | Development Tools     | Packages                     | Updates                    | [Renovate][renovate]                            | [GitHub][gh-renovate]          |                          | [TS][ts]     |             |
| Development | Development Tools     | Git Hooks                    |                            | [Husky][husky]                                  | [GitHub][gh-husky]             |                          | [JS][js]     |             |
| Development | Development Tools     | Monorepo                     |                            | [Bit][bit]                                      | [GitHub][gh-bit]               |                          | [TS][ts]     |             |
| Development | Development Tools     | Monorepo                     |                            | [NX][nx]                                        | [GitHub][gh-nx]                |                          | [TS][ts]     |             |
| Development | Development Tools     | Monorepo                     |                            | [Lerna][lerna]                                  | [GitHub][gh-lerna]             |                          | [TS][ts]     |             |
| Development | Development Tools     | Monorepo                     |                            | [pnpm Workspaces][pnpm-workspaces]              | [GitHub][gh-pnpm]              |                          | [TS][ts]     |             |
| Development | Development Tools     | Monorepo                     |                            | [Turbo][turbo]                                  | [GitHub][gh-vercel-turbo]      | [Vercel][vercel]         | [Rust][rs]   | Recommended |
| Development | Development Tools     | Monorepo                     |                            | [Yarn Workspaces][yarn-workspaces]              | [GitHub][gh-yarn]              |                          | [TS][ts]     |             |
| Development | Development Tools     | Toolchain                    |                            | [Biome][biome]                                  | [GitHub][gh-biome]             |                          | [Rust][rs]   |             |
| Development | Development Tools     | Toolchain                    |                            | [OXC][oxc]                                      | [GitHub][gh-oxc]               |                          | [Rust][rs]   |             |
| Development | Development Tools     | [Linters](#linters)          |                            | [ESLint][eslint]                                | [GitHub][gh-eslint]            | [OpenJS][openjsf]        | [JS][js]     | Recommended |
| Development | Development Tools     | [Linters](#linters)          |                            | [JSLint][jslint]                                | [GitHub][gh-jslint]            |                          | [JS][js]     |             |
| Development | Development Tools     | [Linters](#linters)          |                            | [StandardJS][standardjs]                        | [GitHub][gh-standardjs]        |                          | [JS][js]     |             |
| Development | Development Tools     | [Linters](#linters)          |                            | [MillionLint][millionlint]                      | [GitHub][gh-millionlint]       |                          | [TS][ts]     |             |
| Development | Development Tools     | Formatter                    |                            | [DPrint][dprint]                                | [GitHub][gh-dprint]            |                          | [Rust][rs]   |             |
| Development | Development Tools     | Formatter                    |                            | [Prettier][prettier]                            | [GitHub][gh-prettier]          |                          | [JS][js]     | Recommended |
| Development | Development Tools     | Testing                      | Unit Test                  | [Jasmine][jasmine]                              | [GitHub][gh-jasmine]           |                          | [JS][js]     |             |
| Development | Development Tools     | Testing                      | Unit Test                  | [Jest][jest]                                    | [GitHub][gh-jest]              | [OpenJS][openjsf]        | [TS][ts]     | Recommended |
| Development | Development Tools     | Testing                      | Unit Test                  | [Mocha][mocha]                                  | [GitHub][gh-mocha]             | [OpenJS][openjsf]        | [JS][js]     |             |
| Development | Development Tools     | Testing                      | Unit Test                  | [Testing Library][testing-library]              | [GitHub][gh-testing-library]   |                          | [JS][js]     |             |
| Development | Development Tools     | Testing                      | Unit Test                  | [Vitest][vitest]                                | [GitHub][gh-vitest]            |                          | [TS][ts]     |             |
| Development | Development Tools     | Testing                      | E2E Test                   | [Cypress][cypress]                              | [GitHub][gh-cypress]           |                          | [JS][js]     | Recommended |
| Development | Development Tools     | Testing                      | E2E Test                   | [Karma][karma]                                  | [GitHub][gh-karma]             |                          | [JS][js]     |             |
| Development | Development Tools     | Testing                      | E2E Test                   | [Playwright][playwright]                        | [GitHub][gh-ms-playwright]     | [Microsoft][ms]          | [TS][ts]     |             |
| Development | Development Tools     | Testing                      | E2E Test                   | [Puppeteer][puppeteer]                          | [GitHub][gh-puppeteer]         |                          | [TS][ts]     |             |
| Development | Development Tools     | Testing                      | E2E Test                   | [Selenium][selenium]                            | [GitHub][gh-selenium]          |                          | [Java][java] |             |
| Development | Development Tools     | Testing                      | E2E Test                   | [Storybook][storybook]                          | [GitHub][gh-storybook]         |                          | [TS][ts]     |             |
| Development | Build Tools           | Bundler                      |                            | [ESBuild][esbuild]                              | [GitHub][gh-esbuild]           |                          | [Go][go]     |             |
| Development | Build Tools           | Bundler                      |                            | [Parcel][parceljs]                              | [GitHub][gh-parcel]            |                          | [JS][js]     |             |
| Development | Build Tools           | Bundler                      |                            | [Rollup][rollup]                                | [GitHub][gh-rollup]            |                          | [JS][js]     |             |
| Development | Build Tools           | Bundler                      |                            | [Rspack][rspack]                                | [GitHub][gh-rspack]            |                          | [Rust][rs]   |             |
| Development | Build Tools           | Bundler                      |                            | [Webpack][webpack]                              | [GitHub][gh-webpack]           |                          | [JS][js]     | Recommended |
| Development | Build Tools           | Compiler                     |                            | [Babel][babel]                                  | [GitHub][gh-babel]             |                          | [TS][ts]     | Recommended |
| Development | Build Tools           | Compiler                     |                            | [SWC][swc]                                      | [GitHub][gh-swc]               |                          | [Rust][rs]   |             |
| Front-end   | Tooling               |                              |                            | [Vite][vite]                                    | [GitHub][gh-vite]              |                          | [TS][ts]     |             |
| Front-end   | Styling               | CSS                          | Preprocessor               | [PostCSS][postcss]                              | [GitHub][gh-postcss]           |                          | [TS][ts]     |             |
| Front-end   | Styling               | CSS                          | Preprocessor               | [SASS][sass]                                    | [GitHub][gh-sass]              |                          | [TS][ts]     |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                  | [StyleX][stylex]                                | [GitHub][gh-meta-stylex]       | [Meta][meta]             | [JS][js]     |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                  | [emotion][emotion]                              | [GitHub][gh-emotion]           |                          | [JS][js]     |             |
| Front-end   | Styling               | CSS                          | CSS-in-JS                  | [styled-components][sc]                         | [GitHub][gh-styled-components] |                          | [TS][ts]     |             |
| Front-end   | Styling               | CSS                          | Utility                    | [TailwindCSS][tailwindcss]                      | [GitHub][gh-tailwind-css]      |                          | [TS][ts]     | Recommended |
| Front-end   | Styling               | CSS                          | Utility                    | [NativeWind][nativewind]                        | [GitHub][gh-nativewind]        |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | [TailwindCSS][tailwindcss] | [DaisyUI][daisyui]                              | [GitHub][gh-daisy-ui]          |                          | CSS          | Recommended |
| Front-end   | Styling               | Components                   | [TailwindCSS][tailwindcss] | [Flowbite](https://flowbite.com/)               |                                |                          |              |             |
| Front-end   | Styling               | Components                   | [TailwindCSS][tailwindcss] | [TailwindUI][tailwind-ui]                       | Freemium                       |                          |              |             |
| Front-end   | Styling               | Components                   | Toolkit                    | [Bootstrap][bootstrap]                          | [GitHub][gh-bootstrap]         |                          | [JS][js]     |             |
| Front-end   | Styling               | Components                   | Toolkit                    | [Bulma][bulma]                                  | [GitHub][gh-bulma]             |                          | [SASS][sass] |             |
| Front-end   | Styling               | Components                   | Toolkit                    | [Materialize CSS][materializecss]               | [GitHub][gh-materialize-css]   |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | Toolkit                    | [shadcn/ui][shadcn]                             | [GitHub][gh-shadcn-ui]         |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | Toolkit                    | [UIKit][uikit]                                  | [GitHub][gh-uikit]             |                          | [SASS][sass] |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                 | [Ant Design][ant-design]                        | [GitHub][gh-ant-design]        |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                 | [Chakra UI][chakra-ui]                          | [GitHub][gh-chakra-ui]         |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                 | [MUI][mui]                                      | [GitHub][gh-mui]               |                          | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                 | [NextUI][next-ui]                               | [GitHub][gh-next-ui]           | [Vercel][vercel]         | [TS][ts]     |             |
| Front-end   | Styling               | Components                   | [JSX][jsx]                 | [Theme UI][theme-ui]                            | [GitHub][gh-theme-ui]          |                          | [TS][ts]     |             |
| Front-end   | Chart                 |                              |                            | [Chart.js][chart.js]                            | [GitHub][gh-chart-js]          |                          | [JS][js]     |             |
| Front-end   | Chart                 |                              |                            | [Chartist][chartist]                            | [GitHub][gh-chartist]          |                          | [TS][ts]     |             |
| Front-end   | Chart                 |                              |                            | [D3.js][d3]                                     | [GitHub][gh-d3]                |                          | [JS][js]     |             |
| Front-end   | Chart                 |                              |                            | [Google Chart][google-chart]                    | [GitHub][gh-google-chart]      | [Alphabet][alphabet]     | [JS][js]     |             |
| Front-end   | Chart                 |                              |                            | [HighCharts][highcharts]                        | [GitHub][gh-highcharts]        |                          | [TS][ts]     |             |
| Front-end   | Chart                 |                              |                            | [Plotly.js][plotly.js]                          | [GitHub][gh-plotly]            |                          | [JS][js]     |             |
| Front-end   | Chart                 | [JSX][jsx]                   |                            | [Recharts][recharts]                            | [GitHub][gh-recharts]          |                          | [TS][ts]     |             |
| Front-end   | Chart                 | [JSX][jsx]                   |                            | [TanStack Chart][tanstack-charts]               | [GitHub][gh-tanstack-chart]    |                          | [TS][ts]     | Recommended |
| Front-end   | Query                 |                              |                            | [Apollo Client][apollo-client]                  | [GitHub][gh-apollo-client]     | [Apollo][apollo]         | [TS][ts]     |             |
| Front-end   | Query                 |                              |                            | [Axios][axios]                                  | [GitHub][gh-axios]             |                          | [JS][js]     |             |
| Front-end   | Query                 |                              |                            | [SWR][swr]                                      | [GitHub][gh-vercel-swr]        |                          | [TS][ts]     |             |
| Front-end   | Query                 | [JSX][jsx]                   |                            | [TanStack Query][tanstack-query]                | [GitHub][gh-tanstack-query]    |                          | [TS][ts]     |             |
| Front-end   | CLI                   |                              |                            | [Commander](https://github.com/tj/commander.js) |                                |                          |              |             |
| Front-end   | CLI                   |                              |                            | [OCLIF](https://oclif.io/)                      |                                |                          |              |             |
| Front-end   | CLI                   |                              |                            | [Yargs](https://yargs.js.org/)                  |                                |                          |              |             |
| Front-end   | Web                   | Table                        |                            | [TanStack Table][tanstack-table]                | [GitHub][gh-tanstack-table]    | [TanStack][tanstack]     | [TS][ts]     |             |
| Front-end   | Web                   | State Management             |                            | [Redux][redux]                                  | [GitHub][gh-redux]             |                          | [TS][ts]     |             |
| Front-end   | Web                   | State Management             |                            | [XState][xstate]                                | [GitHub][gh-xstate]            |                          | [TS][ts]     |             |
| Front-end   | Web                   | State Management             |                            | [Jotai][jotai]                                  | [GitHub][gh-jotai]             | [Poimandres][pmndrs]     | [TS][ts]     |             |
| Front-end   | Web                   | State Management             |                            | [Zustand][zustand]                              | [GitHub][gh-zustand]           | [Poimandres][pmndrs]     | [TS][ts]     | Recommended |
| Front-end   | Web                   | [WebGL][webgl]               |                            | [three.js][three.js]                            | [GitHub][gh-three]             |                          | [JS][js]     |             |
| Front-end   | Web                   | DOM                          |                            | [jQuery][jquery]                                | [GitHub][gh-jquery]            | [OpenJS][openjsf]        | [JS][js]     |             |
| Front-end   | Web                   | Components                   |                            | [Lit][lit]                                      | [GitHub][gh-lit]               |                          | [TS][ts]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [Angular][angular]                              | [GitHub][gh-angular]           | [Alphabet][alphabet]     | [TS][ts]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [AngularJS][angularjs]                          | [GitHub][gh-angular-js]        | [Alphabet][alphabet]     | [JS][js]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [Backbone.js][backbone]                         | [GitHub][gh-backbone]          |                          | [JS][js]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [Ember.js][ember]                               | [GitHub][gh-ember]             |                          | [JS][js]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [Svelte.js][svelte]                             | [GitHub][gh-svelte]            | [Vercel][vercel]         | [JS][js]     |             |
| Front-end   | Web Framework         | MVC                          |                            | [Vue.js][vue]                                   | [GitHub][gh-vue]               |                          | [TS][ts]     |             |
| Front-end   | Web Framework         | [JSX][jsx]                   |                            | [React][react]                                  | [GitHub][gh-meta-react]        | [Meta][meta]             | [JS][js]     | Recommended |
| Front-end   | Web Framework         | [JSX][jsx]                   |                            | [Solid.js][solid]                               | [GitHub][gh-solid]             |                          | [TS][ts]     |             |
| Front-end   | Web Framework         | [React][react]               |                            | [Preact][preact]                                | [GitHub][gh-preact]            |                          | [JS][js]     |             |
| Front-end   | Web Framework         | [React][react]               |                            | [Qwik][qwik]                                    | [GitHub][gh-qwik]              |                          | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSR                          |                            | [Angular SSR][angular-ssr]                      |                                |                          |              |             |
| Front-end   | Meta Framework        | SSR                          | [React][react]             | [Next.js][next.js]                              | [GitHub][gh-vercel-next]       | [Vercel][vercel]         | [JS][js]     | Recommended |
| Front-end   | Meta Framework        | SSR                          | [React][react]             | [Remix][remix]                                  | [GitHub][gh-remix]             |                          | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSR                          | [Solid.js][solid]          | [SolidStart][solid-start]                       | [GitHub][gh-solid-start]       |                          | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSR                          | [Svelte.js][svelte]        | [SvelteKit][svelte-kit]                         | [GitHub][gh-svelte-kit]        | [Vercel][vercel]         | [JS][js]     |             |
| Front-end   | Meta Framework        | SSR                          | [Vue][vue]                 | [Nuxt][nuxt]                                    | [GitHub][gh-nuxt]              |                          | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]             | [Astro][astro]                                  | [GitHub][gh-astro]             |                          | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]             | [Docusaurus][docusaurus]                        | [GitHub][gh-meta-docusaurus]   | [Meta][meta]             | [TS][ts]     |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]             | [VuePress](https://vuepress.vuejs.org/)         |                                |                          |              |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]             | [VitePress][vite-press]                         |                                |                          |              |             |
| Front-end   | Meta Framework        | SSG                          | [MD][markdown]             | [Docsify][docsify]                              | [GitHub][gh-docsify]           |                          | [JS][js]     |             |
| Front-end   | Meta Framework        | SSG                          | [React][react]             | [Gatsby.js][gatsbyjs]                           | [GitHub][gh-gatsby]            | [Netlify][netlify]       | [TS][ts]     |             |
| Front-end   | Meta Framework        | WebView + Native API         |                            | [Capacitor.js][capacitor.js]                    |                                | [Ionic Team][ionic-team] |              |             |
| Front-end   | Mobile Framework      | WebView + Native Bridge      |                            | [Ionic][ionic]                                  | [GitHub][gh-ionic]             | [Ionic Team][ionic-team] | [TS][ts]     |             |
| Front-end   | Mobile Framework      | Native                       |                            | [NativeScript][nativescript]                    | [GitHub][gh-nativescript]      | [OpenJS][openjsf]        | [TS][ts]     |             |
| Front-end   | Mobile Framework      | Native                       |                            | [Lynx](https://lynxjs.org/)                     |                                | [ByteDance][bytedance]   |              |             |
| Front-end   | Mobile Framework      | [React][react]               |                            | [React Native][rn]                              | [GitHub][gh-meta-rn]           |                          | C++          |             |
| Front-end   | Mobile Framework      | [React Native][rn]           |                            | [Expo][expo]                                    | [GitHub][gh-expo]              |                          | [TS][ts]     | Recommended |
| Front-end   | Mobile Framework      | [Svelte.js][svelte]          |                            | [Svelte Native][svelte-native]                  | [GitHub][gh-svelte-native]     |                          | [TS][ts]     |             |
| Front-end   | Desktop Framework     | Chromium                     |                            | [Electron.js][electronjs]                       | [GitHub][gh-electron]          | [OpenJS][openjsf]        | C++          |             |
| Front-end   | Desktop Framework     | WebView                      |                            | [Tauri][tauri]                                  | [GitHub][gh-tauri]             |                          | [Rust][rs]   | Recommended |
| Front-end   | Desktop Framework     | WebView                      |                            | [Wails][wails]                                  | [GitHub][gh-wails]             |                          | [Go][go]     |             |
| Front-end   | Desktop Framework     |                              |                            | [Meteor][meteor]                                | [GitHub][gh-meteor]            |                          | [JS][js]     |             |
| Front-end   | Desktop Framework     | WebView + Native Bridge      | [Vue.js][vue]              | [Quasar][quasar]                                | [GitHub][gh-quasar]            |                          | [JS][js]     |             |
| Front-end   | Library               | Logging                      |                            | [Pino][pino]                                    | [GitHub][gh-pino]              |                          | [JS][js]     | Recommended |
| Front-end   | Library               | Logging                      |                            | Winston                                         | [GitHub][gh-winstonjs]         |                          | [JS][js]     |             |
| Front-end   | Library               | Logging                      |                            | npmlog                                          | [GitHub][gh-npmlog]            |                          | [JS][js]     |             |
| Front-end   | Library               | Authentication               |                            | [JWT][jwt]                                      | [GitHub][gh-jwt]               |                          | [JS][js]     |             |
| Front-end   | Library               | Authentication               |                            | [NextAuth][next-auth]                           | [GitHub][gh-next-auth]         |                          | [TS][ts]     |             |
| Front-end   | Library               | Authentication               |                            | [BetterAuth][better-auth]                       |                                |                          |              |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                            | [GraphQL][graphql]                              | [GitHub][gh-graphql]           | [Meta][meta]             | [TS][ts]     |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                            | [Apollo Server][apollo-server]                  | [GitHub][gh-apollo-server]     | [Apollo][apollo]         | [TS][ts]     | Recommended |
| Back-end    | Framework             | [GraphQL][graphql]           |                            | [Yoga][yoga]                                    | [GitHub][gh-yoga]              |                          | [TS][ts]     |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                            | [Mercurius][mercurius]                          | [GitHub][gh-mercurius]         |                          | [JS][js]     |             |
| Back-end    | Framework             | [GraphQL][graphql]           |                            | [Garph][garph]                                  | [GitHub][gh-garph]             |                          | [TS][ts]     |             |
| Back-end    | Framework             | HTTP                         |                            | [HTTP](https://nodejs.org/api/http.html)        |                                |                          |              |             |
| Back-end    | Framework             | HTTP                         |                            | [Express.js][expressjs]                         | [GitHub][gh-express]           | [OpenJS][openjsf]        | [JS][js]     |             |
| Back-end    | Framework             | HTTP                         |                            | [Hono](https://hono.dev/)                       |                                |                          |              |             |
| Back-end    | Framework             | HTTP                         |                            | [Koa][koa]                                      | [GitHub][gh-koa]               |                          | [JS][js]     |             |
| Back-end    | Framework             | HTTP                         |                            | [Nest.js][nest.js]                              | [GitHub][gh-nest]              |                          | [TS][ts]     |             |
| Back-end    | Framework             | HTTP                         |                            | [hapi][hapi]                                    | [GitHub][gh-hapi]              |                          | [JS][js]     |             |
| Back-end    | Framework             | HTTP                         |                            | [Fastify][fastify]                              | [GitHub][gh-fastify]           | [OpenJS][openjsf]        | [JS][js]     |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]    | [Helmet][helmet]                                | [GitHub][gh-helmet]            |                          | [TS][ts]     |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]    | [CORS][cors]                                    | [GitHub][gh-cors]              |                          | [JS][js]     |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]    | [tsoa][tsoa]                                    | [GitHub][gh-tsoa]              |                          | [TS][ts]     |             |
| Back-end    | Framework             | HTTP                         | [Express.js][expressjs]    | [Passport][passport]                            | [GitHub][gh-passport]          |                          | [JS][js]     |             |
| Back-end    | Framework             | RPC                          |                            | [gRPC][grpc]                                    | [GitHub][gh-grpc]              | [Alphabet][alphabet]     | [TS][ts]     |             |
| Back-end    | Framework             | RPC                          |                            | [tRPC][trpc]                                    | [GitHub][gh-trpc]              |                          | [TS][ts]     | Recommended |
| Back-end    | Framework             | WebSocket                    |                            | [Socket.io][socket.io]                          | [GitHub][gh-socket]            |                          | [TS][ts]     | Recommended |
| Back-end    | Framework             | WebSocket                    |                            | [SockJS][sockjs]                                | [GitHub][gh-sockjs]            |                          | [JS][js]     |             |
| Back-end    | Framework             | WebSocket                    |                            | WS                                              | [GitHub][gh-ws]                |                          | [JS][js]     |             |
| Back-end    | Messages              | Broker                       |                            | [ActiveMQ][apache-activemq]                     | [GitHub][gh-apache-activemq]   | [Apache][apache]         | [Java][java] |             |
| Back-end    | Messages              | Broker                       |                            | [Kafka][apache-kafka]                           | [GitHub][gh-apache-kafka]      | [Apache][apache]         | [Java][java] | Recommended |
| Back-end    | Messages              | Broker                       |                            | [RabbitMQ][rabbitmq]                            | [GitHub][gh-rabbitmq]          |                          | Starlark     |             |
| Back-end    | Messages              | Publish / Subscribe          |                            | [MQTT][mqtt]                                    |                                |                          |              |             |
| Back-end    | Messages              | Publish / Subscribe          |                            | [NATS][nats]                                    | [GitHub][gh-nats]              |                          | [Go][go]     |             |
| Back-end    | Database              | ORM                          | SQL & NoSQL                | [MikroORM][mikro-orm]                           | [GitHub][gh-mikro-orm]         |                          | [TS][ts]     |             |
| Back-end    | Database              | ORM                          | SQL & NoSQL                | [Prisma][prisma]                                | [GitHub][gh-prisma]            |                          | [TS][ts]     | Recommended |
| Back-end    | Database              | ORM                          | SQL & NoSQL                | [TypeORM][typeorm]                              | [GitHub][gh-typeorm]           |                          | [TS][ts]     |             |
| Back-end    | Database              | ORM                          | SQL                        | [Drizzle][drizzle]                              | [GitHub][gh-drizzle]           |                          | [TS][ts]     |             |
| Back-end    | Database              | ORM                          | SQL                        | [Sequelize][sequelize]                          | [GitHub][gh-sequelize]         |                          | [JS][js]     |             |
| Back-end    | Database              | ORM                          | NoSQL                      | [Mongoose][mongoose]                            | [GitHub][gh-mongoose]          |                          | [JS][js]     |             |
| AI          | Library               | Mathematics                  |                            | [Math.js][math.js]                              | [GitHub][gh-math]              |                          | [JS][js]     |             |
| AI          | Library               | Machine Learning             |                            | [ml5][ml5]                                      | [GitHub][gh-ml5]               |                          | [JS][js]     |             |
| AI          | Library               | Machine Learning             |                            | [TensorFlow.js][tensorflow.js]                  | [GitHub][gh-tensorflow]        |                          | [TS][ts]     | Recommended |
| AI          | Deep Learning         | Neural Network               |                            | [Brain.js][brain.js]                            | [GitHub][gh-brain]             |                          | [TS][ts]     |             |
| AI          | Deep Learning         | Neural Network               |                            | [Mind.js][mind.js]                              | [GitHub][gh-mind]              |                          | [JS][js]     |             |
| AI          | Deep Learning         | Neural Network               |                            | [Synaptic.js][synaptic.js]                      | [GitHub][gh-synaptic]          |                          | [JS][js]     |             |
| AI          | LLM                   |                              |                            | [LangChain][langchain]                          |                                |                          |              |             |
| AI          | Models                |                              |                            | [HuggingFace][huggingface]                      |                                | [Apache][apache]         |              |             |

[⬆️ Back to Table of Contents](#table-of-contents)

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

[⬆️ Back to Table of Contents](#table-of-contents)

[alphabet]: https://abc.xyz
[angular]: https://angular.io
[angular-ssr]: https://angular.dev/guide/ssr
[angularjs]: https://angularjs.org
[ant-design]: https://ant.design
[apache]: https://apache.org
[apache-activemq]: https://activemq.apache.org
[apache-kafka]: https://kafka.apache.org
[apache-svn]: https://subversion.apache.org
[apollo]: https://www.apollographql.com
[apollo-client]: https://www.apollographql.com/docs/react
[apollo-server]: https://www.apollographql.com/docs/apollo-server
[apple]: https://www.apple.com
[astro]: https://astro.build
[axios]: https://axios-http.com
[aws]: https://aws.amazon.com
[babel]: https://babeljs.io
[backbone]: https://backbonejs.org
[better-auth]: https://www.better-auth.com/
[biome]: https://biomejs.dev
[bit]: https://bit.dev
[bitkeeper]: http://www.bitkeeper.org
[bootstrap]: https://getbootstrap.com
[brain.js]: https://brain.js.org
[bulma]: https://bulma.io
[bun]: https://bun.sh
[bytedance]: https://www.bytedance.com/
[capacitor.js]: https://capacitorjs.com/
[chakra-ui]: https://chakra-ui.com
[chart.js]: https://www.chartjs.org
[chartist]: https://chartist.dev
[cors]: https://expressjs.com/en/resources/middleware/cors.html
[cypress]: https://www.cypress.io
[d3]: https://d3js.org
[daisyui]: https://daisyui.com
[debian]: https://www.debian.org
[deno]: https://deno.com
[docsify]: https://docsify.js.org
[docusaurus]: https://docusaurus.io
[dprint]: https://dprint.dev
[drizzle]: https://orm.drizzle.team
[ecmascript]: https://ecma-international.org/publications-and-standards/standards/ecma-262
[electronjs]: https://www.electronjs.org
[emotion]: https://emotion.sh
[ember]: https://emberjs.com
[esbuild]: https://esbuild.github.io
[eslint]: https://eslint.org
[expo]: https://expo.dev
[expressjs]: https://expressjs.com
[fastify]: https://www.fastify.io
[garph]: https://garph.dev
[gatsbyjs]: https://gatsbyjs.org
[git]: https://git-scm.com
[github]: https://github.com
[github-packages]: https://github.com/features/packages
[go]: https://go.dev
[google-chart]: https://developers.google.com/chart
[graphql]: https://graphql.org
[grpc]: https://grpc.io
[hapi]: https://hapi.dev
[helmet]: https://helmetjs.github.io
[hermes]: https://hermesengine.dev
[highcharts]: https://www.highcharts.com
[huggingface]: https://huggingface.co
[husky]: https://typicode.github.io/husky
[ionic]: https://ionicframework.com
[ionic-team]: https://github.com/ionic-team
[jasmine]: https://jasmine.github.io
[java]: https://www.java.com
[jest]: https://jestjs.io
[jotai]: https://jotai.org
[jquery]: https://jquery.com
[js]: https://www.javascript.com
[jsc]: https://developer.apple.com/documentation/javascriptcore
[jslint]: https://www.jslint.com
[jsr]: https://jsr.i
[jsx]: https://facebook.github.io/jsx
[jwt]: https://jwt.io
[karma]: https://karma-runner.github.io
[kernel]: https://www.kernel.org
[koa]: https://koajs.com
[langchain]: https://www.langchain.com
[lerna]: https://lerna.js.org
[linuxmint]: https://linuxmint.com
[lit]: https://lit.dev
[macos]: https://www.apple.com/macos
[markdown]: https://daringfireball.net/projects/markdown
[materializecss]: https://materializecss.com
[math.js]: https://mathjs.org
[mercurial]: https://www.mercurial-scm.org
[mercurius]: https://mercurius.dev
[meta]: https://developers.facebook.com
[meteor]: https://www.meteor.com
[ml5]: https://ml5js.org
[mocha]: https://mochajs.org
[mongoose]: https://mongoosejs.com
[ms]: https://www.microsoft.com
[mikro-orm]: https://mikro-orm.io
[mind.js]: http://stevenmiller888.github.io/mindjs.net
[millionlint]: https://million.dev/lint
[mozilla]: https://www.mozilla.org
[mqtt]: https://mqtt.org
[mui]: https://mui.com
[nativescript]: https://nativescript.org
[nativewind]: https://www.nativewind.dev
[nats]: https://nats.io
[netlify]: https://netlify.com
[nest.js]: https://nestjs.com
[next-auth]: https://next-auth.js.org
[next.js]: https://nextjs.org
[next-ui]: https://nextui.org
[node.js]: https://nodejs.org
[npmjs]: https://www.npmjs.com
[nuxt]: https://nuxtjs.org
[nx]: https://nx.dev
[openjsf]: https://openjsf.org
[oxc]: https://oxc-project.github.io
[parceljs]: https://parceljs.org
[passport]: https://www.passportjs.org
[perforce]: https://www.perforce.com
[perforce-helix-core]: https://www.perforce.com/products/helix-core
[pino]: https://getpino.io
[playwright]: https://playwright.dev
[plotly.js]: https://plotly.com/javascript/
[pmndrs]: https://pmnd.rs
[pnpm]: https://pnpm.io
[pnpm-workspaces]: https://pnpm.io/workspaces
[postcss]: https://postcss.org
[puppeteer]: https://pptr.dev
[preact]: https://preactjs.com
[prettier]: https://prettier.io
[prisma]: https://www.prisma.io
[quasar]: https://quasar.dev
[quickjs]: https://bellard.org/quickjs
[qwik]: https://qwik.dev
[rabbitmq]: https://www.rabbitmq.com
[react]: https://react.dev
[rn]: https://reactnative.dev
[recharts]: https://recharts.org
[redux]: https://redux.js.org
[remix]: https://remix.run
[renovate]: https://renovatebot.com
[rollup]: https://rollupjs.org
[rs]: https://www.rust-lang.org
[rspack]: https://www.rspack.dev
[sass]: https://sass-lang.com
[sc]: https://styled-components.com
[selenium]: https://www.selenium.dev
[sequelize]: https://sequelize.org
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
[storybook]: https://storybook.js.org
[stylex]: https://stylexjs.com
[synaptic.js]: http://caza.la/synaptic
[snyk]: https://snyk.io
[swc]: https://swc.rs
[swr]: https://swr.vercel.app
[tanstack]: https://tanstack.com
[tanstack-charts]: https://react-charts.tanstack.com
[tanstack-query]: https://tanstack.com/query/latest
[tanstack-table]: https://tanstack.com/table/latest
[tailwindcss]: https://tailwindcss.com
[tailwind-ui]: https://tailwindui.com
[tauri]: https://tauri.app
[tensorflow.js]: https://www.tensorflow.org/js
[testing-library]: https://testing-library.com
[theme-ui]: https://theme-ui.com
[three.js]: https://threejs.org
[trpc]: https://trpc.io
[ts]: https://www.typescriptlang.org
[tsoa]: https://tsoa-community.github.io/docs/
[turbo]: https://turbo.build
[typeorm]: https://typeorm.io
[ubuntu]: https://ubuntu.com
[uikit]: https://getuikit.com
[v8]: https://v8.dev
[vercel]: https://vercel.com
[vite]: https://vitejs.dev
[vitest]: https://vitest.dev
[vite-press]: https://vitepress.dev/
[volt]: https://voltpkg.com
[vue]: https://vuejs.org
[wails]: https://wails.io
[webgl]: https://get.webgl.org
[webpack]: https://webpack.js.org
[windows]: https://www.microsoft.com/en-us/windows
[xstate]: https://stately.ai/docs
[yarn]: https://yarnpkg.com
[yarn-workspaces]: https://yarnpkg.com/features/workspaces
[yoga]: https://the-guild.dev/graphql/yoga-server
[zig]: https://ziglang.org
[zustand]: https://zustand-demo.pmnd.rs

<!-- GitHub -->

[gh-babel]: https://github.com/babel/babel
[gh-biome]: https://github.com/biomejs/biome
[gh-bun]: https://github.com/oven-sh/bun
[gh-deno]: https://github.com/denoland/deno
[gh-dprint]: https://github.com/dprint/dprint
[gh-eslint]: https://github.com/eslint/eslint
[gh-jasmine]: https://github.com/jasmine/jasmine
[gh-javascriptcore]: https://github.com/apple-opensource/JavaScriptCore
[gh-jest]: https://github.com/jestjs/jest
[gh-llrt]: https://github.com/awslabs/llrt
[gh-mocha]: https://github.com/mochajs/mocha
[gh-node]: https://github.com/nodejs/node
[gh-npm]: https://github.com/npm
[gh-pnpm]: https://github.com/pnpm
[gh-parcel]: https://github.com/parcel-bundler/parcel
[gh-prettier]: https://github.com/prettier/prettier
[gh-quickjs]: https://github.com/bellard/quickjs
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
[gh-recharts]: https://github.com/recharts/recharts
[gh-nvm]: https://github.com/nvm-sh/nvm
[gh-yoga]: https://github.com/dotansimha/graphql-yoga
[gh-mercurius]: https://github.com/mercurius-js/mercurius
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
[gh-next-auth]: https://github.com/nextauthjs/next-auth
[gh-jotai]: https://github.com/pmndrs/jotai
[gh-zustand]: https://github.com/pmndrs/zustand
[gh-xstate]: https://github.com/statelyai/xstate
[gh-redux]: https://github.com/reduxjs/redux
[gh-vercel-next]: https://github.com/vercel/next.js
[gh-vercel-swr]: https://github.com/vercel/swr
[gh-vercel-turbo]: https://github.com/vercel/turbo
[gh-jsr]: https://github.com/jsr-io/jsr
[gh-volt]: https://github.com/dimensionhq/volt
[gh-apache-activemq]: https://github.com/apache/activemq
[gh-apache-kafka]: https://github.com/apache/kafka
[gh-rabbitmq]: https://github.com/rabbitmq
[gh-sass]: https://github.com/sass/sass
[gh-postcss]: https://github.com/postcss/postcss
[gh-winterjs]: https://github.com/wasmerio/winterjs
[gh-rspack]: https://github.com/web-infra-dev/rspack
[gh-svelte-native]: https://github.com/halfnelson/svelte-native
[gh-meteor]: https://github.com/meteor/meteor
[gh-quasar]: https://github.com/quasarframework/quasar
[gh-nats]: https://github.com/nats-io/nats-server
[gh-bit]: https://github.com/teambit/bit
[gh-oxc]: https://github.com/oxc-project/oxc
[gh-npm-cli]: https://github.com/npm/cli
[gh-swc]: https://github.com/swc-project/swc
[gh-koa]: https://github.com/koajs/koa
[gh-garph]: https://github.com/stepci/garph
[gh-ws]: https://github.com/websockets/ws
[gh-sockjs]: https://github.com/sockjs
[gh-jslint]: https://github.com/jslint-org/jslint
[gh-standardjs]: https://github.com/standard/standard
[gh-millionlint]: https://github.com/aidenybai/million
[gh-chartist]: https://github.com/chartist-js/chartist
[gh-highcharts]: https://github.com/highcharts/highcharts
[gh-helmet]: https://github.com/helmetjs/helmet
[gh-cors]: https://github.com/expressjs/cors
[gh-tsoa]: https://github.com/lukeautry/tsoa
[gh-passport]: https://github.com/jaredhanson/passport
[gh-npmlog]: https://github.com/npm/npmlog
