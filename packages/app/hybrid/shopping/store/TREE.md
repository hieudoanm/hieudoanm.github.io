```
store/
├── e2e/
│   └── store.spec.ts
├── public/
│   ├── icons/
│   ├── manifest.json
│   └── sw.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── not-found.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   ├── app/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── (info)/
│   │       ├── about/
│   │       │   └── page.tsx
│   │       └── version/
│   │           └── page.tsx
│   ├── components/
│   │   ├── organisms/
│   │   │   └── Header.tsx
│   │   ├── templates/
│   │   │   ├── AboutTemplate.tsx
│   │   │   ├── VersionTemplate.tsx
│   │   │   ├── NotFoundTemplate.tsx
│   │   │   └── ErrorTemplate.tsx
│   │   ├── StoreCard.tsx
│   │   ├── AppPage.tsx
│   │   └── AppInfo.tsx
│   ├── data/
│   │   ├── downloads.json
│   │   ├── downloads.csv
│   │   └── scripts/
│   │       └── convert-csv-to-json.ts
│   ├── lib/
│   │   ├── os.ts
│   │   └── downloads.ts
│   └── styles/
│       ├── globals.css
│       ├── base.css
│       └── themes.css
├── .gitignore
├── .prettierrc.json
├── AGENTS.md
├── LICENSE
├── README.md
├── TREE.md
├── jest.config.ts
├── jest.setup.ts
├── next.config.ts
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
└── tsconfig.json
```
