import { buildRequestBody, bodyTypes, contentTypeFor } from '@/lib/body';
import { emptyRequest, newKeyValue } from '@/lib/http';
import { RequestConfig } from '@/types/api-client';

const withForm = (rows: RequestConfig['formData']): RequestConfig => ({
  ...emptyRequest(),
  bodyType: 'form',
  formData: rows,
});

describe('buildRequestBody', () => {
  it('returns undefined for empty raw body', () => {
    expect(buildRequestBody(emptyRequest())).toBeUndefined();
  });

  it('returns trimmed raw body', () => {
    const config = { ...emptyRequest(), body: '  {"a":1}  ' };
    expect(buildRequestBody(config)).toBe('{"a":1}');
  });

  it('builds urlencoded body from enabled rows', () => {
    const config = withForm([
      { id: '1', key: 'name', value: 'john doe', enabled: true },
      { id: '2', key: 'skip', value: 'x', enabled: false },
      { id: '3', key: '', value: 'y', enabled: true },
    ]);
    config.bodyType = 'urlencoded';
    expect(buildRequestBody(config)).toBe('name=john%20doe');
  });

  it('returns undefined when urlencoded body is empty', () => {
    const config = withForm([]);
    config.bodyType = 'urlencoded';
    expect(buildRequestBody(config)).toBeUndefined();
  });

  it('builds graphql body with variables', () => {
    const config = {
      ...emptyRequest(),
      bodyType: 'graphql' as const,
      graphqlQuery: 'query { viewer }',
      graphqlVariables: '{"id": 42}',
    };
    expect(buildRequestBody(config)).toBe(
      '{"query":"query { viewer }","variables":{"id":42}}'
    );
  });

  it('omits variables when graphql variables are invalid', () => {
    const config = {
      ...emptyRequest(),
      bodyType: 'graphql' as const,
      graphqlQuery: 'query { viewer }',
      graphqlVariables: 'not-json',
    };
    expect(buildRequestBody(config)).toBe('{"query":"query { viewer }"}');
  });

  it('returns undefined for empty graphql query', () => {
    const config = {
      ...emptyRequest(),
      bodyType: 'graphql' as const,
      graphqlQuery: '  ',
    };
    expect(buildRequestBody(config)).toBeUndefined();
  });

  it('builds FormData for form body', () => {
    const file = new File(['abc'], 'a.txt', { type: 'text/plain' });
    const config = withForm([
      { id: '1', key: 'field', value: 'value', enabled: true },
      { id: '2', key: 'upload', value: 'a.txt', enabled: true },
    ]);
    const body = buildRequestBody(config, { '2': file });
    expect(body).toBeInstanceOf(FormData);
    const form = body as FormData;
    expect(form.get('field')).toBe('value');
    expect(form.get('upload')).toEqual(file);
  });
});

describe('contentTypeFor', () => {
  it('returns undefined for raw', () => {
    expect(contentTypeFor(emptyRequest())).toBeUndefined();
  });

  it('returns undefined for form', () => {
    expect(contentTypeFor(withForm([]))).toBeUndefined();
  });

  it('returns urlencoded content type', () => {
    const config = withForm([]);
    config.bodyType = 'urlencoded';
    expect(contentTypeFor(config)).toBe('application/x-www-form-urlencoded');
  });

  it('returns json for graphql', () => {
    const config = withForm([]);
    config.bodyType = 'graphql';
    expect(contentTypeFor(config)).toBe('application/json');
  });
});

describe('bodyTypes', () => {
  it('lists raw, form, urlencoded and graphql', () => {
    expect(bodyTypes.map((type) => type.id)).toEqual([
      'raw',
      'form',
      'urlencoded',
      'graphql',
    ]);
  });
});

describe('newKeyValue', () => {
  it('creates an enabled empty row', () => {
    const row = newKeyValue();
    expect(row.key).toBe('');
    expect(row.value).toBe('');
    expect(row.enabled).toBe(true);
    expect(row.id).toBeTruthy();
  });
});
