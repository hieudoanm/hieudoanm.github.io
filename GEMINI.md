# Gemini Project Instructions

## Overview

This is a monorepo for Hieu Doan's personal website and various utility packages. It uses a modern web stack with support for mobile (Capacitor) and desktop (Tauri) deployments.

## Architecture & Tech Stack

- **Monorepo Manager:** `pnpm` with `turbo`
- **Frontend Framework:** Next.js (Pages Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4, DaisyUI 5
- **Platforms:** Web, Android/iOS (Capacitor), Desktop (Tauri)
- **Testing:** Jest, React Testing Library
- **Linting/Formatting:** ESLint, Prettier

## Workspace Structure

- `packages/app`: Main Next.js application.
- `packages/cli`: CLI tools for managing the monorepo.
- `packages/extensions`: Browser extensions
- `packages/modules`: Shared modules and utilities
- `packages/*`: Support modules, utilities, and data packages.

## Core Commands

- **Install:** `pnpm install`
- **Development:** `pnpm dev`
- **Build:** `pnpm build` (Runs `turbo run build`)
- **Test:** `pnpm test` (Runs `turbo run test`)
- **Lint:** `pnpm lint` (Runs `turbo run lint`)
- **Format:** `pnpm format` (Runs `turbo run format`)

## Coding Conventions

- **Components:** Use functional components with TypeScript.
- **State Management:** Prefer React Hooks and `@tanstack/react-query` for data fetching.
- **Styling:** Use Tailwind CSS classes. Follow DaisyUI patterns for UI components.
- **Type Safety:** Maintain strict TypeScript definitions. Avoid `any`.
- **Imports:** Use workspace protocols (`workspace:*`) for internal package dependencies.
