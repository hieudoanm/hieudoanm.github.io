#!/usr/bin/env ts-node

import fs from 'node:fs';
import path from 'node:path';

const DOCS_DIR = path.resolve('docs');
const CATEGORY_FILE = '_category_.json';

/**
 * Walk directory tree recursively
 */
const walk = (dir: string, cb: (filePath: string) => void): void => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath, cb);
    } else if (entry.isFile()) {
      cb(fullPath);
    }
  }
};

/**
 * Convert folder path to slug
 */
const folderPathToSlug = (folderPath: string): string => {
  const relative = path.relative(DOCS_DIR, folderPath);

  if (!relative || relative === '') {
    return '/';
  }

  return '/' + relative.split(path.sep).join('/');
};

/**
 * Process _category_.json
 */
const updateCategoryFile = (filePath: string): void => {
  const folder = path.dirname(filePath);
  const slug = folderPathToSlug(folder);

  const raw = fs.readFileSync(filePath, 'utf8');
  const json = JSON.parse(raw);

  const currentSlug = json?.link?.slug;

  if (currentSlug === slug) {
    return; // already correct
  }

  const updated = {
    ...json,
    link: {
      ...(json.link ?? { type: 'generated-index' }),
      slug,
    },
  };

  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2) + '\n', 'utf8');

  console.log(
    `✔ Updated link.slug: ${slug} → ${path.relative(DOCS_DIR, filePath)}`
  );
};

/**
 * Run
 */
walk(DOCS_DIR, (filePath) => {
  if (path.basename(filePath) === CATEGORY_FILE) {
    updateCategoryFile(filePath);
  }
});
