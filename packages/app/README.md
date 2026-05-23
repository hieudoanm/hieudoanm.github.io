# Application

## Table of Contents

- [Application](#application)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Structure](#structure)
  - [Platform Distribution](#platform-distribution)

## Tech Stack

| No  | Group     | Category        | Type           | Tools                            | Alternative         |
| --- | --------- | --------------- | -------------- | -------------------------------- | ------------------- |
| 01  | DevTools  | Language        |                | [TypeScript][typescript]         |                     |
| 02  | DevTools  | Package Manager |                | [pnpm][pnpm]                     |                     |
| 03  | DevTools  | Linter          |                | [ESLint][eslint]                 |                     |
| 04  | DevTools  | Formatter       |                | [Prettier][prettier]             |                     |
| 05  | DevTools  | Test            | Unit           | [Jest][jest]                     |                     |
| 06  | DevTools  | Test            | E2E            | [Playwright][playwright]         |                     |
| 07  | Front-end | Framework       | Web            | [Next.js][nextjs]                | [Solid.js][solidjs] |
| 08  | Front-end | Framework       | Mobile         | [Capacitor][capacitor]           |                     |
| 09  | Front-end | Framework       | Desktop        | [Tauri][tauri]                   |                     |
| 10  | Front-end | CSS             | CSS Utilities  | [Tailwind CSS][tailwind-css]     |                     |
| 11  | Front-end | CSS             | CSS Components | [DaisyUI][daisyui]               |                     |
| 12  | Back-end  | API             |                | [tRPC][trpc]                     |                     |
| 13  | Back-end  | ORM             |                | [Prisma][prisma]                 |                     |
| 14  | Back-end  | Database        | Lightweight    | [SQLite][sqlite]                 |                     |
| 15  | Back-end  | Database        | General        | [PostgreSQL][postgresql]         |                     |
| 16  | Back-end  | Auth            |                | [Supabase][supabase]             |                     |
| 17  | Back-end  | Email           |                | [Resend][resend]                 |                     |
| 18  | Back-end  | Payment         |                | [LemonSqueezy][lemonsqueezy]     |                     |
| 19  | DevOps    | CI/CD           |                | [GitHub Actions][github-actions] |                     |
| 20  | DevOps    | Static Hosting  |                | [GitHub Pages][github-pages]     |                     |
| 21  | DevOps    | Dynamic Hosting |                | [Vercel][vercel]                 | [Netlify][netlify]  |

[typescript]: https://www.typescriptlang.org/
[pnpm]: https://pnpm.io/
[eslint]: https://eslint.org/
[prettier]: https://prettier.io/
[jest]: https://jestjs.io/
[playwright]: https://playwright.dev/
[nextjs]: https://nextjs.org/
[solidjs]: https://solidjs.com/
[capacitor]: https://capacitorjs.com/
[tauri]: https://v2.tauri.app/
[tailwind-css]: https://tailwindcss.com/
[daisyui]: https://daisyui.com/
[trpc]: https://trpc.io/
[prisma]: https://prisma.io/
[sqlite]: https://www.sqlite.org/
[postgresql]: https://www.postgresql.org/
[supabase]: https://supabase.com/
[resend]: https://resend.com/
[lemonsqueezy]: https://www.lemonsqueezy.com/
[github-actions]: https://github.com/features/actions/
[github-pages]: https://pages.github.com/
[vercel]: https://vercel.com/
[netlify]: https://www.netlify.com/

## Structure

```text
packages/app/
├── public/
│   ├── audio/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── templates/
│   ├── data/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── utils/
│   └── ...
├── pnpm-lock.yaml
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── next.config.js

```

## Platform Distribution

| No  | Device  | OS                 | Package     |
| --- | ------- | ------------------ | ----------- |
| 01  | Mobile  | [Android][android] | `.aab`      |
| 02  | Mobile  | [Android][android] | `.apk`      |
| 03  | Mobile  | [iOS][ios]         | `.ipa`      |
| 04  | Desktop | [Windows][windows] | `.exe`      |
| 05  | Desktop | [Windows][windows] | `.msi`      |
| 06  | Desktop | [macOS][macos]     | `.app`      |
| 07  | Desktop | [macOS][macos]     | `.dmg`      |
| 08  | Desktop | [macOS][macos]     | `.pkg`      |
| 09  | Desktop | [Linux][linux]     | `.AppImage` |
| 10  | Desktop | [Linux][linux]     | `.deb`      |
| 11  | Desktop | [Linux][linux]     | `.rpm`      |
| 12  | Desktop | [Linux][linux]     | `.snap`     |

[android]: https://www.android.com/
[ios]: https://www.apple.com/ios/
[windows]: https://www.microsoft.com/windows/
[macos]: https://www.apple.com/macos/
[linux]: https://www.linux.org/
