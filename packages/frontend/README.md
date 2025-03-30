# Front-end

## Table of Content

- [Front-end](#front-end)
  - [Table of Content](#table-of-content)
  - [Daily Driver](#daily-driver)
    - [Best Techstack and Alternative](#best-techstack-and-alternative)
  - [Frameworks](#frameworks)
    - [Web](#web)
    - [Mobile](#mobile)
    - [Desktop](#desktop)
  - [Abbreviation](#abbreviation)

## Daily Driver

1. Linter - [ESLint][eslint]: Considering switching to Biome
2. Formatter - [Prettier][prettier]: Considering switching to Biome
3. Testing - [Jest.js][jest.js]: Work well with [React][react]
4. Build Tools - [Turbo][turbo]: Work well with [Next.js][next.js]
5. CSS in JS - [TailwindCSS][tailwindcss]: Easy-to-use
6. UI Components - [DaisyUI][daisyui]: Based on [TailwindCSS][tailwindcss]
7. State Management - [Zustand][zustand]: Most Modern Solution
8. Web - SSG - [Docusaurus][docusaurus]: Backed by [Meta][meta]
9. Web - SSR - [Next.js][next.js]: Backed by [Vercel][vercel] and Based on [React][react], which is Backed by [Meta][meta]
10. Mobile - [Lynx][lynx]: Based on [React][react] and Backed by [ByteDance][bytedance]
11. Desktop - [Tauri][tauri]: Best Native Performance and Lightweight
12. Back-end - [tRPC][trpc]: Work seamlessly with [Next.js][next.js]
13. ORM - [Prisma][prisma]: Easy-to-use
14. Database - [PostgreSQL][postgresql]: Best Database
15. Static - [GitHub Pages][gh-pages]: Easy and Free to Use
16. Serverless - [Vercel][vercel]: Work well with [Next.js][next.js]

### Best Techstack and Alternative

| No. | Category  | Subcategory          | Winner                     | Runner-up                            |
| --- | --------- | -------------------- | -------------------------- | ------------------------------------ |
| 01  | Dev Tool  | Linter               | [ESLint][eslint]           | [Biome.js][biome.js]                 |
| 02  | Dev Tool  | Formatter            | [Prettier][prettier]       | [Biome.js][biome.js]                 |
| 03  | Dev Tool  | Testing              | [Jest.js][jest.js]         | [Vitest][vitest]                     |
| 04  | Dev Tool  | Build Tools          | [Turbo][turbo]             | [Vite][vite]                         |
| 05  | Supported | CSS in JS            | [TailwindCSS][tailwindcss] | [Bootstrap][bootstrap]               |
| 06  | Supported | UI Components        | [DaisyUI][daisyui]         | [shadcn/ui][shadcn]                  |
| 07  | Supported | State Management     | [Zustand][zustand]         | [Jotai][jotai]                       |
| 08  | Framework | **Web - Overall**    | [React][react]             | [Vue][vue]                           |
| 09  | Framework | **Web - Performace** | [Solid][solid]             | [Svelte][svelte]                     |
| 10  | Framework | Web - SSG            | [Docusaurus][docusaurus]   | [Astro][astro]                       |
| 11  | Framework | Web - SSR            | [Next.js][next.js]         | [SolidStart][solid-start]            |
| 12  | Framework | [Mobile](#mobile)    | [Lynx][lynx]               | [Expo][expo]                         |
| 13  | Framework | [Desktop](#desktop)  | [Tauri][tauri]             | [Wails][wails]                       |
| 14  | Back-end  | Framework            | [tRPC][trpc]               | [GraphQL][graphql]                   |
| 15  | Back-end  | ORM                  | [Prisma][prisma]           | [Drizzle][drizzle]                   |
| 16  | Back-end  | Database             | [PostgreSQL][postgresql]   | [MongoDB][mongodb]                   |
| 17  | Hosting   | Static               | [GitHub Pages][gh-pages]   | [Cloudflare Pages][cloudflare-pages] |
| 18  | Hosting   | Serverless           | [Vercel][vercel]           | [Netlify][netlify]                   |

## Frameworks

### Web

| No  | Type        | Framework          | SSR                        | SSG                      | Maintainer (Invidual)          | Maintainer (Company)            |
| --- | ----------- | ------------------ | -------------------------- | ------------------------ | ------------------------------ | ------------------------------- |
| 01  | HTML        | [Angular][angular] | [Angular SSR][angular-ssr] |                          |                                | [Google][google]                |
| 02  | HTML        | [Svelte][svelte]   | [SvelteKit][svelte-kit]    |                          | [Rich Harris][rich-harris]     | [Vercel][vercel]                |
| 03  | HTML        | [Vue.js][vue]      | [Nuxt][nuxt]               | [VitePress][vite-press]  |                                |                                 |
| 04  | JSX         | [React.js][react]  | [Next.js][next.js]         | [Docusaurus][docusaurus] |                                | [Meta][meta] & [Vercel][vercel] |
| 05  | JSX         | [Solid.js][solid]  | [SolidStart][solid-start]  |                          | [Ryan Carniato][ryan-carniato] | [Netlify][netlify]              |
| 06  | Multi Model |                    |                            | [Astro][astro]           |                                |                                 |

### Mobile

| No  | Type                    | Model                        | Framework                     | Maintainer               |
| --- | ----------------------- | ---------------------------- | ----------------------------- | ------------------------ |
| 01  | Native                  | [React.js][react]            | [Lynx][lynx]                  | [ByteDance][bytedance]   |
| 02  | Native                  | [React Native][react-native] | [Expo][expo]                  | [Meta][meta]             |
| 03  | Native                  | Multi Model                  | [NativeScript][native-script] |                          |
| 04  | WebView + Native API    | Multi Model                  | [Capacitor.js][capacitor.js]  | [Ionic Team][ionic-team] |
| 05  | WebView + Native Bridge | Multi Model                  | [Ionic][ionic]                | [Ionic Team][ionic-team] |
| 06  | WebView + Native Bridge | [Vue.js][vue]                | [Quasar][quasar]              |                          |

### Desktop

| No  | Engine   | Native      | Language   | Framework                  |
| --- | -------- | ----------- | ---------- | -------------------------- |
| 01  | WebView  | Abstract OS | Rust       | [Tauri][tauri]             |
| 02  | WebView  | Direct OS   | Go         | [Wails][wails]             |
| 03  | Chromium | Node.js API | TypeScript | [Electron.js][electron.js] |

## Abbreviation

- `CSS`: Cascading Style Sheets
- `HTML`: HyperText Markup Language
- `JS`: JavaScript
- `JSX`: JavaScript XML
- `ORM`: Object Relational Mapping
- `SSG`: Static Site Generation
- `SSR`: Server-side Rendering
- `UI`: User Interface

[angular]: https://angular.dev/
[angular-ssr]: https://angular.dev/guide/ssr
[astro]: https://astro.build/
[biome.js]: https://biomejs.dev/
[bootstrap]: https://getbootstrap.com/
[bytedance]: https://www.bytedance.com/
[capacitor.js]: https://capacitorjs.com/
[cloudflare-pages]: https://pages.cloudflare.com/
[daisyui]: https://daisyui.com/
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
[jest.js]: https://jestjs.io/
[jotai]: https://jotai.org/
[lynx]: https://lynxjs.org/
[meta]: https://developers.facebook.com/
[mongodb]: https://www.mongodb.com/
[native-script]: https://nativescript.org/
[netlify]: https://www.netlify.com/
[next.js]: https://nextjs.org/
[nuxt]: https://nuxt.com/
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
[vercel]: https://vercel.com
[vite]: https://vite.dev/
[vitest]: https://vitest.dev/
[vite-press]: https://vitepress.dev/
[vue]: https://vuejs.org/
[wails]: https://wails.io/
[zustand]: https://zustand-demo.pmnd.rs/
