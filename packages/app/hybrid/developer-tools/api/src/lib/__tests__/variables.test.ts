import {
  loadEnvironment,
  newEnvironmentVariable,
  saveEnvironment,
  substitute,
  substituteConfig,
} from '@/lib/variables';
import { emptyRequest } from '@/lib/http';
import { EnvironmentVariable } from '@/types/api-client';

const env: EnvironmentVariable[] = [
  { id: '1', key: 'host', value: 'api.example.com', enabled: true },
  { id: '2', key: 'token', value: 'secret', enabled: true },
  { id: '3', key: 'off', value: 'nope', enabled: false },
];

describe('newEnvironmentVariable', () => {
  it('creates an enabled empty variable', () => {
    const variable = newEnvironmentVariable();
    expect(variable.key).toBe('');
    expect(variable.value).toBe('');
    expect(variable.enabled).toBe(true);
  });
});

describe('substitute', () => {
  it('replaces known variables', () => {
    expect(
      substitute('https://{{host}}/users', { host: 'api.example.com' })
    ).toBe('https://api.example.com/users');
  });

  it('keeps unknown variables untouched', () => {
    expect(substitute('https://{{host}}/x', {})).toBe('https://{{host}}/x');
  });

  it('tolerates whitespace inside braces', () => {
    expect(substitute('{{ host }}', { host: 'x' })).toBe('x');
  });
});

describe('substituteConfig', () => {
  it('substitutes across url, params, headers, body and auth', () => {
    const config = substituteConfig(
      {
        ...emptyRequest(),
        url: 'https://{{host}}/users',
        params: [{ id: '1', key: 'q', value: '{{query}}', enabled: true }],
        headers: [
          { id: '2', key: 'X-Token', value: '{{token}}', enabled: true },
        ],
        body: '{"q":"{{query}}"}',
        token: '{{token}}',
        username: '{{user}}',
        password: '{{pass}}',
      },
      [
        { id: '1', key: 'host', value: 'api.example.com', enabled: true },
        { id: '2', key: 'query', value: 'hello', enabled: true },
        { id: '3', key: 'token', value: 'abc', enabled: true },
        { id: '4', key: 'user', value: 'u', enabled: true },
        { id: '5', key: 'pass', value: 'p', enabled: true },
      ]
    );
    expect(config.url).toBe('https://api.example.com/users');
    expect(config.params[0].value).toBe('hello');
    expect(config.headers[0].value).toBe('abc');
    expect(config.body).toBe('{"q":"hello"}');
    expect(config.token).toBe('abc');
    expect(config.username).toBe('u');
    expect(config.password).toBe('p');
  });

  it('ignores disabled variables', () => {
    const config = substituteConfig(
      { ...emptyRequest(), url: 'https://{{off}}/x' },
      env
    );
    expect(config.url).toBe('https://{{off}}/x');
  });
});

describe('environment persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads variables', () => {
    saveEnvironment(env);
    expect(loadEnvironment()).toHaveLength(3);
    expect(loadEnvironment()[0].key).toBe('host');
  });

  it('returns empty array on corrupt storage', () => {
    localStorage.setItem('api-client:env', 'not-json');
    expect(loadEnvironment()).toEqual([]);
  });

  it('returns empty array when stored variables are not an array', () => {
    localStorage.setItem('api-client:env', '{"not":"array"}');
    expect(loadEnvironment()).toEqual([]);
  });
});
