# TREE

```text
├── e2e/
├── public/
├── src/
│   ├── app/
│   │   ├── chat/
│   │   │   └── [id]/
│   │   │       └── [page.tsx](./src/app/chat/[id]/page.tsx)
│   │   ├── settings/
│   │   │   └── [page.tsx](./src/app/settings/page.tsx)
│   │   ├── [layout.tsx](./src/app/layout.tsx)
│   │   └── [page.tsx](./src/app/page.tsx)
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── [MessageBubble.tsx](./src/components/atoms/MessageBubble.tsx)
│   │   │   └── [ModelBadge.tsx](./src/components/atoms/ModelBadge.tsx)
│   │   ├── molecules/
│   │   │   ├── [ChatInput.tsx](./src/components/molecules/ChatInput.tsx)
│   │   │   └── [ConversationCard.tsx](./src/components/molecules/ConversationCard.tsx)
│   │   ├── organisms/
│   │   │   ├── [ChatHeader.tsx](./src/components/organisms/ChatHeader.tsx)
│   │   │   ├── [Sidebar.tsx](./src/components/organisms/Sidebar.tsx)
│   │   │   └── [ToastContainer.tsx](./src/components/organisms/ToastContainer.tsx)
│   │   └── templates/
│   │       └── [PageTransition.tsx](./src/components/templates/PageTransition.tsx)
│   ├── data/
│   │   ├── [models.ts](./src/data/models.ts)
│   │   └── [seed.ts](./src/data/seed.ts)
│   ├── hooks/
│   │   ├── [useKeyboard.ts](./src/hooks/useKeyboard.ts)
│   │   └── [useStreaming.ts](./src/hooks/useStreaming.ts)
│   ├── lib/
│   │   └── [db.ts](./src/lib/db.ts)
│   ├── providers/
│   │   ├── [DataProvider.tsx](./src/providers/DataProvider.tsx)
│   │   ├── [Providers.tsx](./src/providers/Providers.tsx)
│   │   └── [ToastProvider.tsx](./src/providers/ToastProvider.tsx)
│   ├── styles/
│   │   └── [globals.css](./src/styles/globals.css)
│   ├── types/
│   │   └── [index.ts](./src/types/index.ts)
│   └── utils/
│       └── [format.ts](./src/utils/format.ts)
├── src-tauri/
├── [LICENSE](./LICENSE)
├── [PLAN.md](./PLAN.md)
├── [TREE.md](./TREE.md)
├── [eslint.config.mts](./eslint.config.mts)
├── [jest.config.ts](./jest.config.ts)
├── [jest.setup.ts](./jest.setup.ts)
├── [next.config.ts](./next.config.ts)
├── [package.json](./package.json)
├── [playwright.config.ts](./playwright.config.ts)
├── [postcss.config.mjs](./postcss.config.mjs)
└── [tsconfig.json](./tsconfig.json)
```

20 directories, 34 files
