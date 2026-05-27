import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { createEffect, createSignal, onCleanup } from 'solid-js';

// ─── Types ────────────────────────────────────────────────────────────────────
type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;
type JsonObject = { [key: string]: JsonValue };

interface StackFrame {
  obj: JsonObject;
  indent: number;
}

interface OpenAPISchema {
  $ref?: string;
  type?: string;
  example?: JsonValue;
  default?: JsonValue;
  enum?: JsonValue[];
  items?: OpenAPISchema;
  properties?: Record<string, OpenAPISchema>;
  format?: string;
  description?: string;
}

interface OpenAPIParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  required?: boolean;
  description?: string;
  example?: JsonValue;
  schema?: OpenAPISchema;
}

interface OpenAPIMediaType {
  schema?: OpenAPISchema;
  example?: JsonValue;
  examples?: Record<string, { value?: JsonValue }>;
}

interface OpenAPIOperation {
  summary?: string;
  operationId?: string;
  description?: string;
  tags?: string[];
  parameters?: OpenAPIParameter[];
  requestBody?: {
    required?: boolean;
    content?: Record<string, OpenAPIMediaType>;
  };
  responses?: Record<string, { description?: string }>;
}

interface OpenAPISpec {
  openapi?: string;
  info?: { title?: string; description?: string; version?: string };
  servers?: { url: string }[];
  paths?: Record<string, Record<string, OpenAPIOperation>>;
  components?: { schemas?: Record<string, OpenAPISchema> };
}

interface PostmanHeader {
  key: string;
  value: string;
  description?: string;
}

interface PostmanQueryParam {
  key: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

interface PostmanVariable {
  key: string;
  value: string;
  description?: string;
  type?: string;
}

interface PostmanBody {
  mode: 'raw' | 'urlencoded' | 'formdata';
  raw?: string;
  options?: { raw: { language: string } };
  urlencoded?: { key: string; value: string; description: string }[];
  formdata?: {
    key: string;
    value: string;
    description: string;
    type: string;
  }[];
}

interface PostmanRequest {
  method: string;
  header: PostmanHeader[];
  url: {
    raw: string;
    protocol: string;
    host: string[];
    path: string[];
    query: PostmanQueryParam[];
    variable: PostmanVariable[];
  };
  body?: PostmanBody;
  description?: string;
}

interface PostmanItem {
  name: string;
  request: PostmanRequest;
  response: unknown[];
}

interface PostmanFolder {
  name: string;
  item: PostmanItem[];
}

interface PostmanCollection {
  info: {
    name: string;
    _postman_id: string;
    description: string;
    schema: string;
  };
  item: PostmanFolder[];
  variable: PostmanVariable[];
}

// ─── YAML parser ─────────────────────────────────────────────────────────────

const parseYAML = (text: string): JsonObject => {
  const lines = text.split('\n');
  const root: JsonObject = {};
  const stack: StackFrame[] = [{ obj: root, indent: -1 }];

  lines.forEach((raw) => {
    if (!raw.trim() || raw.trim().startsWith('#')) return;

    const indent = raw.search(/\S/);
    const content = raw.trim();

    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (content.startsWith('- ')) {
      const key = Object.keys(parent)[Object.keys(parent).length - 1];
      if (!Array.isArray(parent[key])) parent[key] = [];
      const arr = parent[key] as JsonValue[];
      const val = content.slice(2).trim();
      if (val.includes(': ')) {
        const obj: JsonObject = {};
        const [k, v] = val.split(/:\s+(.+)/);
        obj[k] = v;
        arr.push(obj);
        stack.push({ obj, indent });
      } else if (val) {
        arr.push(val);
      } else {
        const obj: JsonObject = {};
        arr.push(obj);
        stack.push({ obj, indent });
      }
    } else if (content.includes(': ')) {
      const colonIdx = content.indexOf(': ');
      const k = content.slice(0, colonIdx).replace(/^['"]|['"]$/g, '');
      const rawV = content
        .slice(colonIdx + 2)
        .trim()
        .replace(/^['"]|['"]$/g, '');
      if (rawV === '' || rawV === '|' || rawV === '>') {
        const obj: JsonObject = {};
        parent[k] = obj;
        stack.push({ obj, indent });
      } else {
        parent[k] =
          rawV === 'true'
            ? true
            : rawV === 'false'
              ? false
              : !isNaN(Number(rawV))
                ? Number(rawV)
                : rawV;
      }
    } else if (content.endsWith(':')) {
      const k = content.slice(0, -1).replace(/^['"]|['"]$/g, '');
      const obj: JsonObject = {};
      parent[k] = obj;
      stack.push({ obj, indent });
    }
  });

  return root;
};

const parseOpenAPI = (text: string): OpenAPISpec => {
  try {
    return JSON.parse(text) as OpenAPISpec;
  } catch {
    return parseYAML(text) as unknown as OpenAPISpec;
  }
};

// ─── Schema helpers ───────────────────────────────────────────────────────────

const resolveRef = (
  schema: OpenAPISchema | undefined,
  root: OpenAPISpec
): OpenAPISchema => {
  if (!schema || typeof schema !== 'object') return schema ?? {};
  if (!schema.$ref) return schema;
  const parts = schema.$ref.replace(/^#\//, '').split('/');
  let cur: JsonValue = root as unknown as JsonValue;
  for (const p of parts) cur = (cur as JsonObject)?.[p] ?? null;
  return (cur as unknown as OpenAPISchema) || {};
};

const schemaToExample = (
  schema: OpenAPISchema | undefined,
  root: OpenAPISpec,
  depth = 0
): JsonValue => {
  if (depth > 5 || !schema) return null;
  const s = resolveRef(schema, root);

  if (s.example !== undefined) return s.example;
  if (s.default !== undefined) return s.default;

  switch (s.type) {
    case 'string':
      return s.enum ? s.enum[0] : 'string';
    case 'integer':
    case 'number':
      return 0;
    case 'boolean':
      return true;
    case 'array': {
      const item = schemaToExample(s.items, root, depth + 1);
      return item !== null ? [item] : [];
    }
    case 'object':
    default: {
      if (!s.properties) return null;
      const obj: JsonObject = {};
      Object.entries(s.properties).forEach(([k, v]) => {
        obj[k] = schemaToExample(v, root, depth + 1);
      });
      return obj;
    }
  }
};

// ─── Converter ────────────────────────────────────────────────────────────────

const HTTP_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'head',
  'options',
];

const convertToPostman = (spec: OpenAPISpec): PostmanCollection => {
  const info = {
    name: spec.info?.title ?? 'Imported Collection',
    _postman_id: crypto.randomUUID(),
    description: spec.info?.description ?? '',
    schema:
      'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  };

  const baseUrl = spec.servers?.[0]?.url ?? '';
  const tagMap: Record<string, PostmanItem[]> = {};

  Object.entries(spec.paths ?? {}).forEach(([path, methods]) => {
    Object.entries(methods).forEach(([method, op]) => {
      if (!HTTP_METHODS.includes(method)) return;

      const tag = op.tags?.[0] ?? 'default';
      if (!tagMap[tag]) tagMap[tag] = [];

      const rawUrl = `${baseUrl}${path}`;
      const pathParts = rawUrl
        .split('?')[0]
        .replace(/^https?:\/\/[^/]+/, '')
        .split('/')
        .filter(Boolean);
      const host = rawUrl.match(/^https?:\/\/([^/]+)/)?.[1]?.split('.') ?? [
        '{{baseUrl}}',
      ];

      const params = op.parameters ?? [];

      const query: PostmanQueryParam[] = params
        .filter((p) => p.in === 'query')
        .map((p) => ({
          key: p.name,
          value: p.example !== undefined ? String(p.example) : '',
          description: p.description ?? '',
          disabled: !p.required,
        }));

      const variable: PostmanVariable[] = params
        .filter((p) => p.in === 'path')
        .map((p) => ({
          key: p.name,
          value: p.example !== undefined ? String(p.example) : p.name,
          description: p.description ?? '',
        }));

      const header: PostmanHeader[] = params
        .filter((p) => p.in === 'header')
        .map((p) => ({
          key: p.name,
          value: p.example !== undefined ? String(p.example) : '',
          description: p.description ?? '',
        }));

      let body: PostmanBody | undefined;
      const content = op.requestBody?.content ?? {};

      if (content['application/json']) {
        const mt = content['application/json'];
        const example =
          mt.example ??
          (mt.examples ? Object.values(mt.examples)[0]?.value : null) ??
          schemaToExample(mt.schema, spec);
        body = {
          mode: 'raw',
          raw: JSON.stringify(example, null, 2),
          options: { raw: { language: 'json' } },
        };
        header.push({ key: 'Content-Type', value: 'application/json' });
      } else if (content['application/x-www-form-urlencoded']) {
        const props =
          content['application/x-www-form-urlencoded'].schema?.properties ?? {};
        body = {
          mode: 'urlencoded',
          urlencoded: Object.entries(props).map(([k, v]) => ({
            key: k,
            value: v.example !== undefined ? String(v.example) : '',
            description: v.description ?? '',
          })),
        };
      } else if (content['multipart/form-data']) {
        const props = content['multipart/form-data'].schema?.properties ?? {};
        body = {
          mode: 'formdata',
          formdata: Object.entries(props).map(([k, v]) => ({
            key: k,
            value: v.example !== undefined ? String(v.example) : '',
            description: v.description ?? '',
            type: v.format === 'binary' ? 'file' : 'text',
          })),
        };
      }

      tagMap[tag].push({
        name: op.summary ?? op.operationId ?? `${method.toUpperCase()} ${path}`,
        request: {
          method: method.toUpperCase(),
          header,
          url: {
            raw: rawUrl,
            protocol: rawUrl.startsWith('https') ? 'https' : 'http',
            host,
            path: pathParts,
            query,
            variable,
          },
          ...(body ? { body } : {}),
          description: op.description ?? '',
        },
        response: [],
      });
    });
  });

  return {
    info,
    item: Object.entries(tagMap).map(([name, items]) => ({
      name,
      item: items,
    })),
    variable: [{ key: 'baseUrl', value: baseUrl, type: 'string' }],
  };
};

// ─── Sample spec ──────────────────────────────────────────────────────────────

const SAMPLE_OPENAPI = `{
  "openapi": "3.0.0",
  "info": {
    "title": "Pet Store API",
    "version": "1.0.0",
    "description": "A sample Pet Store API"
  },
  "servers": [{ "url": "https://petstore.example.com/v1" }],
  "paths": {
    "/pets": {
      "get": {
        "summary": "List all pets",
        "operationId": "listPets",
        "tags": ["pets"],
        "parameters": [
          { "name": "limit", "in": "query", "schema": { "type": "integer" }, "required": false }
        ],
        "responses": { "200": { "description": "A list of pets" } }
      },
      "post": {
        "summary": "Create a pet",
        "operationId": "createPet",
        "tags": ["pets"],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "tag":  { "type": "string" }
                }
              }
            }
          }
        },
        "responses": { "201": { "description": "Pet created" } }
      }
    },
    "/pets/{petId}": {
      "get": {
        "summary": "Get a pet by ID",
        "operationId": "showPetById",
        "tags": ["pets"],
        "parameters": [
          { "name": "petId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": { "200": { "description": "A pet" } }
      },
      "delete": {
        "summary": "Delete a pet",
        "operationId": "deletePet",
        "tags": ["pets"],
        "parameters": [
          { "name": "petId", "in": "path", "required": true, "schema": { "type": "string" } }
        ],
        "responses": { "204": { "description": "Pet deleted" } }
      }
    }
  }
}`;

// ─── Utilities ────────────────────────────────────────────────────────────────

const lineCount = (str: string): number => (str ? str.split('\n').length : 0);

export const OpenAPI2Postman = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = createSignal<string>(SAMPLE_OPENAPI);
  const [output, setOutput] = createSignal<string>('');
  const [error, setError] = createSignal<string>('');
  const [copied, setCopied] = createSignal<boolean>(false);
  const [activeTab, setActiveTab] = createSignal<'openapi' | 'postman'>(
    'openapi'
  );

  createEffect((): void => {
    if (!input().trim()) {
      setOutput('');
      setError('');
      return;
    }

    const timer = setTimeout((): void => {
      try {
        const spec = parseOpenAPI(input().trim());
        const collection = convertToPostman(spec);
        setOutput(JSON.stringify(collection, null, 2));
        setError('');
      } catch (e) {
        setError((e as Error).message || 'Conversion failed');
        setOutput('');
      }
    }, 300);

    onCleanup((): void => clearTimeout(timer));
  });

  const copyOutput = (): void => {
    if (!output()) return;
    navigator.clipboard.writeText(output()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const downloadOutput = (): void => {
    if (!output()) return;
    const blob = new Blob([output()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'postman-collection.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearInput = (): void => {
    setInput('');
    setOutput('');
    setError('');
  };

  return (
    <ModalWrapper
      onClose={onClose}
      title="OpenAPI to Postman"
      subtitle="Converts automatically as you type"
      size="max-w-5xl"
      fullHeight>
      <button
        class="btn btn-ghost btn-xs text-base-content/50"
        onClick={clearInput}>
        🗑️ Clear
      </button>

      <div class="tabs tabs-boxed bg-base-200 border-base-300 w-full self-center border sm:w-auto">
        <button
          class={`tab font-mono text-[10px] tracking-wider uppercase ${activeTab() === 'openapi' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('openapi')}>
          OpenAPI Input
        </button>
        <button
          class={`tab font-mono text-[10px] tracking-wider uppercase ${activeTab() === 'postman' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('postman')}>
          Postman Output
        </button>
      </div>

      <div class="flex min-h-0 grow overflow-hidden">
        {activeTab() === 'openapi' && (
          <div class="bg-base-200 border-base-300 flex w-full flex-col rounded-xl border">
            <div class="border-base-300 flex shrink-0 items-center justify-between border-b px-4 py-2">
              <div class="flex items-center gap-2">
                <span class="badge badge-outline badge-sm text-primary border-primary/30 font-mono text-[10px] tracking-wider uppercase">
                  OpenAPI
                </span>
                <span class="text-base-content/40 font-mono text-[10px] tracking-wider uppercase">
                  JSON/YAML
                </span>
              </div>
              <span class="text-base-content/30 font-mono text-[10px] tracking-wider uppercase">
                {lineCount(input())} lines
              </span>
            </div>
            <div class="relative flex min-h-0 flex-1 flex-col">
              <textarea
                class="textarea bg-base-100 text-base-content w-full flex-1 resize-none rounded-none rounded-b-xl border-0 p-4 font-mono text-xs leading-relaxed focus:outline-none"
                placeholder="Paste your OpenAPI 3.x spec here (JSON or YAML)..."
                value={input()}
                onChange={(e) => setInput(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>
        )}

        {activeTab() === 'postman' && (
          <div class="bg-base-200 border-base-300 flex w-full flex-col rounded-xl border">
            <div class="border-base-300 flex shrink-0 items-center justify-between border-b px-4 py-2">
              <div class="flex items-center gap-2">
                <span class="badge badge-outline badge-sm text-warning border-warning/30 font-mono text-[10px] tracking-wider uppercase">
                  Postman
                </span>
                <span class="text-base-content/40 font-mono text-[10px] tracking-wider uppercase">
                  Collection v2.1
                </span>
              </div>
              <div class="flex items-center gap-2">
                {output() && (
                  <>
                    <span class="text-base-content/30 font-mono text-[10px] tracking-wider uppercase">
                      {lineCount(output())} lines
                    </span>
                    <button
                      class="btn btn-ghost btn-xs gap-1 font-mono text-[10px] uppercase"
                      onClick={copyOutput}>
                      {copied() ? '✅ Copied' : '📋 Copy'}
                    </button>
                    <button
                      class="btn btn-ghost btn-xs gap-1 font-mono text-[10px] uppercase"
                      onClick={downloadOutput}>
                      💾 Download
                    </button>
                  </>
                )}
              </div>
            </div>

            <div class="relative min-h-0 flex-1">
              {error() && (
                <div class="alert alert-error m-4 rounded-lg text-sm">
                  <span>⚠️ {error()}</span>
                </div>
              )}

              {!output() && !error() && (
                <div class="text-base-content/25 flex h-full flex-col items-center justify-center gap-3">
                  <span class="text-5xl">📄</span>
                  <p class="text-sm">
                    Start typing to generate your Postman collection
                  </p>
                </div>
              )}

              {output() && (
                <textarea
                  readOnly
                  class="textarea bg-base-100 text-base-content h-full w-full resize-none rounded-none rounded-b-xl border-0 p-4 font-mono text-xs leading-relaxed focus:outline-none"
                  value={output()}
                  spellCheck={false}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};
