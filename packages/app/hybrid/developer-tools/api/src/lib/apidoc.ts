import {
  RequestCollection,
  RequestConfig,
  RequestExample,
} from '@/types/api-client';
import { pathnameOf } from '@/lib/mock';

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) =>
    char === '&'
      ? '&amp;'
      : char === '<'
        ? '&lt;'
        : char === '>'
          ? '&gt;'
          : char === '"'
            ? '&quot;'
            : '&#39;'
  );

const activeKeyValues = (
  rows: { key: string; value: string; enabled: boolean }[]
): string[] =>
  rows
    .filter((row) => row.enabled && row.key.trim() !== '')
    .map((row) => `${row.key.trim()}: ${row.value}`);

const authLabel = (request: RequestConfig): string => {
  if (request.authType === 'bearer' && request.token.trim() !== '') {
    return 'Bearer token';
  }
  if (request.authType === 'basic' && request.username.trim() !== '') {
    return `Basic ${request.username}`;
  }
  return 'None';
};

const endpointCount = (collection: RequestCollection): number =>
  collection.groups.reduce((sum, group) => sum + group.entries.length, 0);

export const collectionToMarkdown = (collection: RequestCollection): string => {
  const lines = [
    `# ${collection.name}`,
    '',
    `${endpointCount(collection)} endpoint${endpointCount(collection) === 1 ? '' : 's'}.`,
    '',
  ];
  for (const group of collection.groups) {
    lines.push(`## ${group.name}`, '');
    for (const entry of group.entries) {
      lines.push(
        `### ${entry.request.method} ${pathnameOf(entry.request.url)}`,
        '',
        entry.name,
        '',
        `- Auth: ${authLabel(entry.request)}`
      );
      const params = activeKeyValues(entry.request.params);
      if (params.length > 0) lines.push(`- Params: ${params.join(', ')}`);
      const headers = activeKeyValues(entry.request.headers);
      if (headers.length > 0) lines.push(`- Headers: ${headers.join(', ')}`);
      if (entry.request.body.trim() !== '') {
        lines.push('', 'Body:', '', '```json', entry.request.body, '```');
      }
      for (const example of entry.examples ?? []) {
        lines.push(
          '',
          `**${example.name}**`,
          '',
          '```json',
          example.body,
          '```'
        );
      }
      lines.push('');
    }
  }
  return `${lines.join('\n').trim()}\n`;
};

const exampleBlock = (example: RequestExample): string => `<div class="example">
<h3>${escapeHtml(example.name)}</h3>
<pre>${escapeHtml(example.body)}</pre>
</div>`;

export const collectionToHtmlDoc = (collection: RequestCollection): string => {
  const sections = collection.groups
    .map((group) => {
      const rows = group.entries
        .map((entry) => {
          const params = activeKeyValues(entry.request.params);
          const headers = activeKeyValues(entry.request.headers);
          const examples = (entry.examples ?? []).map(exampleBlock).join('');
          return `<div class="endpoint">
<h3><span class="method">${escapeHtml(entry.request.method)}</span> ${escapeHtml(pathnameOf(entry.request.url))}</h3>
<p class="desc">${escapeHtml(entry.name)}</p>
<p><strong>Auth:</strong> ${escapeHtml(authLabel(entry.request))}</p>
${params.length > 0 ? `<p><strong>Params:</strong> ${escapeHtml(params.join(', '))}</p>` : ''}
${headers.length > 0 ? `<p><strong>Headers:</strong> ${escapeHtml(headers.join(', '))}</p>` : ''}
${entry.request.body.trim() !== '' ? `<pre>${escapeHtml(entry.request.body)}</pre>` : ''}
${examples}
</div>`;
        })
        .join('');
      return `<section><h2>${escapeHtml(group.name)}</h2>${rows}</section>`;
    })
    .join('');
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>${escapeHtml(collection.name)} — API docs</title>
<style>
body { font-family: system-ui, sans-serif; margin: 2rem; color: #0f172a; }
h1 { font-size: 1.25rem; }
h2 { border-bottom: 1px solid #e2e8f0; padding-bottom: 0.25rem; }
.endpoint { background: #f8fafc; border-radius: 0.5rem; padding: 0.75rem 1rem; margin-bottom: 0.75rem; }
.method { background: #e2e8f0; border-radius: 0.25rem; padding: 0.1rem 0.4rem; font-size: 0.75rem; font-weight: 700; }
.desc { margin: 0.25rem 0; color: #475569; }
pre { background: #f1f5f9; border-radius: 0.25rem; padding: 0.5rem; overflow-x: auto; }
.example { margin-top: 0.5rem; }
.example h3 { font-size: 0.85rem; margin: 0 0 0.25rem; }
</style>
</head>
<body>
<h1>${escapeHtml(collection.name)} — API docs</h1>
<p>${endpointCount(collection)} endpoint${endpointCount(collection) === 1 ? '' : 's'}.</p>
${sections}
</body>
</html>`;
};
