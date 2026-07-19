# Development

## Requirements

| Tool    | Version | Check                         |
| ------- | ------- | ----------------------------- |
| Node.js | 26.5.0  | `node -v`                     |
| pnpm    | latest  | `pnpm -v`                     |
| Rust    | latest  | `rustc --version` (for Tauri) |

## Installation

```bash
pnpm install
```

## Running

```bash
# Web (Turbopack)
pnpm dev

# Desktop (Tauri)
pnpm tauri dev

# Mobile (Tauri)
pnpm tauri android dev
```

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `pnpm dev`      | Start dev server with Turbopack      |
| `pnpm build`    | Build for production (static export) |
| `pnpm start`    | Serve the production build           |
| `pnpm lint`     | Run ESLint with auto-fix             |
| `pnpm format`   | Run Prettier on all files            |
| `pnpm test`     | Run Jest unit tests                  |
| `pnpm test:e2e` | Run Playwright E2E tests             |
| `pnpm tauri`    | Tauri CLI passthrough                |

## Building

```bash
# Web (static export → out/)
pnpm build

# Desktop
pnpm tauri build

# Mobile
pnpm tauri android build
```

## Testing

```bash
# Unit tests
pnpm test

# E2E tests (starts dev server automatically)
pnpm test:e2e

# Single test file
pnpm test -- src/components/atoms/Spinner.test.tsx
```

## Linting

```bash
# Lint with auto-fix
pnpm lint

# Format all files
pnpm format
```

## Environment Variables

No environment variables required for the boilerplate. For future use, create
`.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## IDE Setup

### VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript

### Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

## Tauri

### Prerequisites

```bash
# macOS
xcode-select --install

# Windows
winget install Microsoft.VisualStudioCode

# Linux
sudo apt install libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev
```

### Build Outputs

| Platform | Output                      |
| -------- | --------------------------- |
| Linux    | `.deb`, `.AppImage`, `.rpm` |
| macOS    | `.app`, `.dmg`              |
| Android  | `.apk`, `.aab`              |

## Troubleshooting

| Issue                       | Solution                              |
| --------------------------- | ------------------------------------- |
| `pnpm dev` port in use      | `kill-port 3000` or change port       |
| Tauri build fails           | Check Rust toolchain: `rustup update` |
| TypeScript errors           | `pnpm build` to regenerate types      |
| Tests timeout               | Increase timeout in `jest.config.ts`  |
| Playwright browsers missing | `npx playwright install`              |
