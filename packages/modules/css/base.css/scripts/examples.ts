#!/usr/bin/env ts-node
// Convert the base.css element showcase into full-page screenshots:
//   public/images/base.light.png  <- from public/index.html (prefers-color-scheme: light)
//   public/images/base.dark.png   <- from public/index.html (prefers-color-scheme: dark)
//
// Requires: playwright (optional, skips images with a warning).

import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const ROOT = dirname(__dirname);
const INDEX_HTML = join(ROOT, 'public', 'index.html');
const IMAGES_DIR = join(ROOT, 'public', 'images');

const MODES = [
  { name: 'light', colorScheme: 'light' },
  { name: 'dark', colorScheme: 'dark' },
] as const;

interface PageLike {
  emulateMedia(options: { colorScheme: 'light' | 'dark' }): Promise<void>;
  goto(url: string, options?: object): Promise<void>;
  waitForTimeout(ms: number): Promise<void>;
  screenshot(options: { path: string; fullPage: boolean }): Promise<void>;
  close(): Promise<void>;
}

interface BrowserLike {
  newPage(options: object): Promise<PageLike>;
  close(): Promise<void>;
}

const findPlaywright = (startDir: string): string | null => {
  let dir = startDir;
  for (;;) {
    const pnpmStore = join(dir, 'node_modules', '.pnpm');
    if (existsSync(pnpmStore)) {
      const matches = readdirSync(pnpmStore).filter((entry) =>
        entry.startsWith('playwright@')
      );
      for (const entry of matches) {
        const candidate = join(pnpmStore, entry, 'node_modules', 'playwright');
        if (existsSync(candidate)) return candidate;
      }
    }
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
};

const renderScreenshots = async (playwrightPath: string): Promise<void> => {
  let chromium: { launch(): Promise<BrowserLike> };
  try {
    ({ chromium } = require(playwrightPath));
  } catch (error) {
    console.warn(
      `warning: playwright failed to load, skipping PNG rendering: ${(error as Error).message}`
    );
    return;
  }

  let browser: BrowserLike;
  try {
    browser = await chromium.launch();
  } catch (error) {
    console.warn(
      `warning: could not launch chromium, skipping PNG rendering: ${(error as Error).message}`
    );
    console.warn('install it with: pnpm exec playwright install chromium');
    return;
  }

  try {
    const page = await browser.newPage({
      viewport: { width: 1024, height: 800 },
      deviceScaleFactor: 2,
    });
    for (const { name, colorScheme } of MODES) {
      const png = `base.${name}.png`;
      await page.emulateMedia({ colorScheme });
      await page.goto(`file://${INDEX_HTML}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(200);
      await page.screenshot({ path: join(IMAGES_DIR, png), fullPage: true });
      console.log('screenshot', png);
    }
    await page.close();
  } finally {
    await browser.close();
  }
};

const main = (): void => {
  if (!existsSync(INDEX_HTML)) {
    console.error(
      `error: ${INDEX_HTML} does not exist; run the module build first`
    );
    process.exit(1);
  }
  mkdirSync(IMAGES_DIR, { recursive: true });

  const playwright = findPlaywright(ROOT);
  if (!playwright) {
    console.warn('warning: playwright not found; skipping PNG rendering');
    return;
  }
  renderScreenshots(playwright).catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  });
};

main();
