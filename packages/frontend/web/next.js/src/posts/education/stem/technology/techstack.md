---
title: 'Techstack'
date: '2025-04-04'
---

## Table of Content

- [Table of Content](#table-of-content)
- [Full-stack Software](#full-stack-software)
  - [Daily Driver](#daily-driver)
    - [Daily Driver and Potential Alternative](#daily-driver-and-potential-alternative)
  - [Engine vs Runtime vs Package Registry vs Package Manager](#engine-vs-runtime-vs-package-registry-vs-package-manager)
  - [Front-end Framework](#front-end-framework)
    - [Web Framework](#web-framework)
    - [Mobile Framework](#mobile-framework)
    - [Desktop Framework](#desktop-framework)
  - [Back-end for Front-end](#back-end-for-front-end)
    - [Database and ORM](#database-and-orm)
  - [Data Science](#data-science)
- [Abbreviation](#abbreviation)

## Full-stack Software

### Daily Driver

1. **Runtime** - [Node.js][node.js]: Most Popular and Active Community
2. **Package Registry** - [npm][npm]: Most Popular and Active Registry
3. **Package Manager** - [pnpm][pnpm]: Best Performance Manager
4. **Linter** - [ESLint][eslint]: Considering switching to Biome
5. **Formatter** - [Prettier][prettier]: Considering switching to Biome
6. **Testing** - [Jest.js][jest.js]: Work well with [React][react]
7. **Build Tools** - [Turbo][turbo]: Work well with [Next.js][next.js]
8. **CSS in JS** - [TailwindCSS][tailwindcss]: Easy-to-use
9. **UI Components** - [DaisyUI][daisyui]: Based on [TailwindCSS][tailwindcss]
10. **State Management** - [Zustand][zustand]: Most Modern Solution
11. **Web** - [React][react]: Backed by [Meta][meta]
12. **Web (SSG)** - [Docusaurus][docusaurus]: Based on [React][react] and Backed by [Meta][meta]
13. **Web (SSR)** - [Next.js][next.js]: Based on [React][react] and Backed by [Vercel][vercel]
14. **Mobile** - [Lynx][lynx]: Based on [React][react] and Backed by [ByteDance][bytedance]
15. **Desktop** - [Tauri][tauri]: Best Native Performance and Lightweight
16. **Back-end** - [tRPC][trpc]: Work seamlessly with [Next.js][next.js]
17. **ORM** - [Prisma][prisma]: Easy-to-use and Support Most Databases
18. **Database** - [PostgreSQL][postgresql]: Most Advanced Relational Database
19. **Static** - [GitHub Pages][gh-pages]: Easy and Free to Use
20. **Serverless** - [Vercel][vercel]: Work Well with [Next.js][next.js]

#### Daily Driver and Potential Alternative

| No. | Category  | Subcategory                                                                   | Winner                                  | Runner-up                                      |
| --- | --------- | ----------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------- |
| 01  | Dev Tool  | [Runtime](#engine-vs-runtime-vs-package-registry-vs-package-manager)          | [Node.js][node.js]                      | [Deno][deno]                                   |
| 02  | Dev Tool  | [Package Registry](#engine-vs-runtime-vs-package-registry-vs-package-manager) | [npm][npm]                              | [JSR][jsr]                                     |
| 03  | Dev Tool  | [Package Manager](#engine-vs-runtime-vs-package-registry-vs-package-manager)  | [pnpm][pnpm]                            | [yarn][yarn]                                   |
| 04  | Dev Tool  | Linter                                                                        | [ESLint][eslint]                        | [Biome.js][biome.js]                           |
| 05  | Dev Tool  | Formatter                                                                     | [Prettier][prettier]                    | [Biome.js][biome.js]                           |
| 06  | Dev Tool  | Testing                                                                       | [Jest.js][jest.js]                      | [Vitest][vitest]                               |
| 07  | Dev Tool  | Build Tools                                                                   | [Turbo][turbo]                          | [Vite][vite]                                   |
| 08  | Supported | CSS in JS                                                                     | [TailwindCSS][tailwindcss]              | [Bootstrap][bootstrap]                         |
| 09  | Supported | UI Components                                                                 | [DaisyUI][daisyui]                      | [shadcn/ui][shadcn]                            |
| 10  | Supported | State Management                                                              | [Zustand][zustand]                      | [Jotai][jotai]                                 |
| 11  | Framework | [Web](#web-framework)                                                         | [React][react] / [Vue][vue] (Community) | [Solid][solid] / [Svelte][svelte] (Performace) |
| 12  | Framework | [Web - SSG](#web-framework)                                                   | [Docusaurus][docusaurus]                | [Astro][astro]                                 |
| 13  | Framework | [Web - SSR](#web-framework)                                                   | [Next.js][next.js]                      | [SolidStart][solid-start]                      |
| 14  | Framework | [Mobile](#mobile-framework)                                                   | [Lynx][lynx]                            | [Expo][expo]                                   |
| 15  | Framework | [Desktop](#desktop-framework)                                                 | [Tauri][tauri]                          | [Wails][wails]                                 |
| 16  | BFF       | Framework                                                                     | [tRPC][trpc]                            | [GraphQL][graphql]                             |
| 17  | BFF       | ORM                                                                           | [Prisma][prisma]                        | [Drizzle][drizzle]                             |
| 18  | BFF       | Database                                                                      | [PostgreSQL][postgresql] (Relational)   | [MongoDB][mongodb] (Documental)                |
| 19  | Hosting   | Static                                                                        | [GitHub Pages][gh-pages]                | [Cloudflare Pages][cloudflare-pages]           |
| 20  | Hosting   | Serverless                                                                    | [Vercel][vercel]                        | [Netlify][netlify]                             |

### Engine vs Runtime vs Package Registry vs Package Manager

| No  | Engine                           | Runtime            | Package Registry (Built-in) | Package Registry (External) | Package Manager (Built-in) | Package Manager (External)  |
| --- | -------------------------------- | ------------------ | --------------------------- | --------------------------- | -------------------------- | --------------------------- |
| 01  | [V8][v8]                         | [Node.js][node.js] |                             | [npm][npm]                  | [npm][npm]                 | [pnpm][pnpm] / [yarn][yarn] |
| 02  | [V8][v8]                         | [Deno][deno]       | [Deno][deno]                | [JSR][jsr]                  | [Deno][deno]               |                             |
| 03  | [JavaScriptCore][javascriptcore] | [Bun][bun]         | [Bun][bun]                  | [JSR][jsr]                  | [Bun][bun]                 |                             |

### Front-end Framework

#### Web Framework

| No  | Type        | Framework          | SSR                        | SSG                      | Maintainer (Invidual)          | Maintainer (Company)            |
| --- | ----------- | ------------------ | -------------------------- | ------------------------ | ------------------------------ | ------------------------------- |
| 01  | HTML        | [Angular][angular] | [Angular SSR][angular-ssr] |                          |                                | [Google][google]                |
| 02  | HTML        | [Svelte][svelte]   | [SvelteKit][svelte-kit]    |                          | [Rich Harris][rich-harris]     | [Vercel][vercel]                |
| 03  | HTML        | [Vue.js][vue]      | [Nuxt][nuxt]               | [VitePress][vite-press]  |                                |                                 |
| 04  | JSX         | [React.js][react]  | [Next.js][next.js]         | [Docusaurus][docusaurus] |                                | [Meta][meta] & [Vercel][vercel] |
| 05  | JSX         | [Solid.js][solid]  | [SolidStart][solid-start]  |                          | [Ryan Carniato][ryan-carniato] | [Netlify][netlify]              |
| 06  | Multi Model |                    |                            | [Astro][astro]           |                                |                                 |

#### Mobile Framework

| No  | Type                    | Model                        | Framework                     | Maintainer               |
| --- | ----------------------- | ---------------------------- | ----------------------------- | ------------------------ |
| 01  | Native                  | [React.js][react]            | [Lynx][lynx]                  | [ByteDance][bytedance]   |
| 02  | Native                  | [React Native][react-native] | [Expo][expo]                  | [Meta][meta]             |
| 03  | Native                  | Multi Model                  | [NativeScript][native-script] |                          |
| 04  | WebView + Native API    | Multi Model                  | [Capacitor.js][capacitor.js]  | [Ionic Team][ionic-team] |
| 05  | WebView + Native Bridge | Multi Model                  | [Ionic][ionic]                | [Ionic Team][ionic-team] |
| 06  | WebView + Native Bridge | [Vue.js][vue]                | [Quasar][quasar]              |                          |

#### Desktop Framework

| No  | Engine   | Native      | Language   | Framework                  |
| --- | -------- | ----------- | ---------- | -------------------------- |
| 01  | WebView  | Abstract OS | Rust       | [Tauri][tauri]             |
| 02  | WebView  | Direct OS   | Go         | [Wails][wails]             |
| 03  | Chromium | Node.js API | TypeScript | [Electron.js][electron.js] |

### Back-end for Front-end

#### Database and ORM

| No  | Paradigm   | Database    | Prisma      | Drizzle     | Hosting          |
| --- | ---------- | ----------- | ----------- | ----------- | ---------------- |
| 01  | Documental | DynamoDB    |             |             | AWS DynamoDB     |
| 02  | Documental | MongoDB     | `Supported` |             | MongoDB Atlas    |
| 03  | Relational | CockroachDB | `Supported` |             | CockroachDB Labs |
| 04  | Relational | libSQL      |             | `Supported` | Turso            |
| 05  | Relational | MariaDB     | `Supported` |             |                  |
| 06  | Relational | MS SQL      | `Supported` |             |                  |
| 07  | Relational | MySQL       | `Supported` | `Supported` | PlanetScale      |
| 08  | Relational | PostgreSQL  | `Supported` | `Supported` | Neon / Supabase  |
| 09  | Relational | SQLite      | `Supported` | `Supported` | Cloudflare D1    |

### Data Science

[Python](https://www.python.org)

| No  | Group    | Subgroup       | Name                        | GitHub                      | Language |
| --- | -------- | -------------- | --------------------------- | --------------------------- | -------- |
| 01  | Code     | Format         | 💅 [Black][black]           | [GitHub][github-black]      | Python   |
| 02  | Code     | Lint           | 🧰 [Ruff][ruff]             | [GitHub][github-ruff]       | Rust     |
| 03  | Data     |                | 🗃️ [Pandas][pandas]         | [GitHub][github-pandas]     | Python   |
| 04  | Data     |                | 🧮 [NumPy][numpy]           | [GitHub][github-numpy]      | Python   |
| 05  | Back-end | Framework      | 🚀 [FastAPI][fastapi]       | [GitHub][github-fastapi]    | Python   |
| 06  | Back-end | ORM            | 🔌 [SQLAlchemy][sqlalchemy] | [GitHub][github-sqlalchemy] | Python   |
| 07  | Notebook | Visualisation  | 📈 [Plotly][plotly]         | [GitHub][github-plotly]     | Python   |
| 08  | Notebook | Vision         | 👁️ [OpenCV][opencv]         | [GitHub][github-opencv]     | C++      |
| 09  | Notebook | Language       | 💬 [NLTK][nltk]             | [GitHub][github-nltk]       | Python   |
| 10  | Notebook | Neural Network | 🧠 [TensorFlow][tensorflow] | [GitHub][github-tensorflow] | C++      |

## Abbreviation

- `BFF`: Back-end for Front-end
- `CSS`: Cascading Style Sheets
- `HTML`: HyperText Markup Language
- `JS`: JavaScript
- `JSR`: JavaScript Registry
- `JSX`: JavaScript XML
- `npm`: Node.js Package Manager
- `pnpm`: Performant Node Package Manager
- `ORM`: Object Relational Mapping
- `SSG`: Static Site Generation
- `SSR`: Server-side Rendering
- `UI`: User Interface

[angular]: https://angular.dev/
[angular-ssr]: https://angular.dev/guide/ssr
[astro]: https://astro.build/
[biome.js]: https://biomejs.dev/
[bootstrap]: https://getbootstrap.com/
[bun]: https://bun.sh/
[bytedance]: https://www.bytedance.com/
[capacitor.js]: https://capacitorjs.com/
[cloudflare-pages]: https://pages.cloudflare.com/
[daisyui]: https://daisyui.com/
[deno]: https://deno.com/
[docusaurus]: https://docusaurus.io/
[drizzle]: https://orm.drizzle.team/
[electron.js]: https://www.electronjs.org/
[eslint]: https://eslint.org/
[expo]: https://expo.dev/
[gh-pages]: https://pages.github.com/
[google]: https://developers.google.com/
[graphql]: https://graphql.org/
[ionic]: https://ionicframework.com/
[ionic-team]: https://github.com/ionic-team
[javascriptcore]: https://developer.apple.com/documentation/javascriptcore
[jest.js]: https://jestjs.io/
[jotai]: https://jotai.org/
[jsr]: https://jsr.io/
[lynx]: https://lynxjs.org/
[meta]: https://developers.facebook.com/
[mongodb]: https://www.mongodb.com/
[native-script]: https://nativescript.org/
[netlify]: https://www.netlify.com/
[next.js]: https://nextjs.org/
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com/
[nuxt]: https://nuxt.com/
[pnpm]: https://pnpm.io/
[postgresql]: https://www.postgresql.org/
[prettier]: https://prettier.io/
[prisma]: https://www.prisma.io/
[quasar]: https://quasar.dev/
[react]: https://react.dev/
[react-native]: https://reactnative.dev/
[rich-harris]: https://github.com/Rich-Harris
[ryan-carniato]: https://github.com/ryansolid
[shadcn]: https://ui.shadcn.com/
[solid]: https://www.solidjs.com/
[solid-start]: https://start.solidjs.com/
[svelte]: https://svelte.dev/
[svelte-kit]: https://svelte.dev/docs/kit/introduction
[tailwindcss]: https://tailwindcss.com/
[tauri]: https://v2.tauri.app/
[trpc]: https://trpc.io/
[turbo]: https://turbo.build
[v8]: https://v8.dev/
[vercel]: https://vercel.com
[vite]: https://vite.dev/
[vitest]: https://vitest.dev/
[vite-press]: https://vitepress.dev/
[vue]: https://vuejs.org/
[wails]: https://wails.io/
[yarn]: https://yarnpkg.com/
[zustand]: https://zustand-demo.pmnd.rs/
[black]: https://black.readthedocs.io/en/stable/
[fastapi]: https://fastapi.tiangolo.com/
[nltk]: https://www.nltk.org/
[numpy]: https://numpy.org/
[opencv]: https://opencv.org/
[pandas]: https://pandas.pydata.org/
[plotly]: https://plotly.com/
[ruff]: https://docs.astral.sh/ruff/
[sqlalchemy]: https://www.sqlalchemy.org/
[tensorflow]: https://www.tensorflow.org
[github-black]: https://github.com/psf/black
[github-fastapi]: https://github.com/fastapi/fastapi
[github-nltk]: https://github.com/nltk/nltk
[github-numpy]: https://github.com/numpy/numpy
[github-opencv]: https://github.com/opencv/opencv
[github-pandas]: https://github.com/pandas-dev/pandas
[github-plotly]: https://github.com/plotly/plotly.py
[github-ruff]: https://github.com/astral-sh/ruff
[github-sqlalchemy]: https://github.com/sqlalchemy/sqlalchemy
[github-tensorflow]: https://github.com/tensorflow/tensorflow
