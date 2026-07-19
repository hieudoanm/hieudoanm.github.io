import { collectionToHtmlDoc, collectionToMarkdown } from '@/lib/apidoc';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';

const entry = (
  name: string,
  method: 'GET' | 'POST',
  url: string,
  body = '',
  example?: string
) => {
  const item = newCollectionEntry(name, {
    ...emptyRequest(),
    method,
    url,
    body,
    params: [
      { id: 'p1', key: 'page', value: '1', enabled: true },
      { id: 'p2', key: '', value: 'x', enabled: true },
    ],
    headers: [{ id: 'h1', key: 'X-Key', value: 'abc', enabled: true }],
    authType: 'bearer',
    token: 'tok',
  });
  if (example) item.examples = [{ id: 'e1', name: 'Sample', body: example }];
  return item;
};

const api = {
  ...newCollection('Users <API>'),
  groups: [
    {
      ...newGroup('Users'),
      entries: [
        entry(
          'List & all',
          'GET',
          'https://api.example.com/users',
          '',
          '{"ok":true}'
        ),
        entry(
          'Create user',
          'POST',
          'https://api.example.com/users',
          '{"name":"A"}'
        ),
      ],
    },
    { ...newGroup('Auth'), entries: [] },
  ],
};

describe('collectionToMarkdown', () => {
  it('renders groups, endpoints and auth', () => {
    const markdown = collectionToMarkdown(api);
    expect(markdown).toContain('# Users <API>');
    expect(markdown).toContain('2 endpoints.');
    expect(markdown).toContain('## Users');
    expect(markdown).toContain('### GET /users');
    expect(markdown).toContain('List & all');
    expect(markdown).toContain('- Auth: Bearer token');
    expect(markdown).toContain('- Params: page: 1');
    expect(markdown).toContain('- Headers: X-Key: abc');
    expect(markdown).toContain('## Auth');
  });

  it('renders bodies and examples', () => {
    const markdown = collectionToMarkdown(api);
    expect(markdown).toContain('Body:');
    expect(markdown).toContain('{"name":"A"}');
    expect(markdown).toContain('**Sample**');
    expect(markdown).toContain('{"ok":true}');
  });

  it('handles an empty collection', () => {
    expect(collectionToMarkdown(newCollection('Empty'))).toBe(
      '# Empty\n\n0 endpoints.\n'
    );
  });

  it('labels basic and missing auth', () => {
    const basic = newCollectionEntry('x', {
      ...emptyRequest(),
      authType: 'basic',
      username: 'ada',
    });
    const none = newCollectionEntry('y', {
      ...emptyRequest(),
      authType: 'none',
    });
    const markdown = collectionToMarkdown({
      ...newCollection('C'),
      groups: [{ ...newGroup('G'), entries: [basic, none] }],
    });
    expect(markdown).toContain('- Auth: Basic ada');
    expect(markdown).toContain('- Auth: None');
  });
});

describe('collectionToHtmlDoc', () => {
  it('renders a self-contained HTML document', () => {
    const html = collectionToHtmlDoc(api);
    expect(html).toContain('<!doctype html>');
    expect(html).toContain('Users &lt;API&gt; — API docs');
    expect(html).toContain('>GET</span> /users');
    expect(html).toContain('List &amp; all');
    expect(html).toContain('Bearer token');
    expect(html).toContain('Sample');
    expect(html).toContain('2 endpoints.');
  });

  it('escapes html in group, headers and bodies', () => {
    const nasty = newCollectionEntry('x', {
      ...emptyRequest(),
      url: '/a&b',
      body: '<script>alert(1)</script>',
      headers: [{ id: 'h', key: 'K', value: '<b>', enabled: true }],
    });
    const html = collectionToHtmlDoc({
      ...newCollection('C'),
      groups: [{ ...newGroup('G&G'), entries: [nasty] }],
    });
    expect(html).toContain('G&amp;G');
    expect(html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).toContain('&lt;b&gt;');
  });

  it('handles an empty collection', () => {
    expect(collectionToHtmlDoc(newCollection('Empty'))).toContain(
      '0 endpoints.'
    );
  });
});
