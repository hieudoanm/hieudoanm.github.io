import {
  findMethod,
  invokeGrpc,
  methodKey,
  parseJsonInput,
  parseProto,
} from '@/lib/proto';

const SAMPLE = `
syntax = "proto3";

package demo;

service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
  rpc Chat (stream Message) returns (stream Message);
}

message HelloRequest {
  string name = 1;
}

message HelloReply {
  string message = 1;
}

message Message {
  string text = 1;
}
`;

describe('parseProto', () => {
  it('parses package, services and methods', () => {
    const proto = parseProto(SAMPLE);
    expect(proto).not.toBeNull();
    expect(proto?.package).toBe('demo');
    expect(proto?.services).toHaveLength(1);
    const service = proto?.services[0];
    expect(service?.name).toBe('Greeter');
    expect(service?.methods).toHaveLength(2);
    expect(service?.methods[0]).toMatchObject({
      name: 'SayHello',
      inputType: 'HelloRequest',
      outputType: 'HelloReply',
    });
    expect(service?.methods[1]).toMatchObject({
      clientStreaming: true,
      serverStreaming: true,
    });
  });

  it('returns null for empty input', () => {
    expect(parseProto('')).toBeNull();
  });

  it('returns null when no services have methods', () => {
    expect(parseProto('message Foo { string a = 1; }')).toBeNull();
  });

  it('drops services without methods', () => {
    const proto = parseProto(
      'package p; service Empty {} service Full { rpc Go (A) returns (B); }'
    );
    expect(proto?.services).toHaveLength(1);
    expect(proto?.services[0].name).toBe('Full');
  });
});

describe('findMethod', () => {
  it('finds a method by service and name', () => {
    const proto = parseProto(SAMPLE);
    expect(proto && findMethod(proto, 'Greeter', 'SayHello')?.name).toBe(
      'SayHello'
    );
  });

  it('returns null for unknown service or method', () => {
    const proto = parseProto(SAMPLE);
    expect(proto && findMethod(proto, 'Nope', 'SayHello')).toBeNull();
    expect(proto && findMethod(proto, 'Greeter', 'Nope')).toBeNull();
  });
});

describe('methodKey', () => {
  it('joins package and method', () => {
    const proto = parseProto(SAMPLE);
    const method = proto && findMethod(proto, 'Greeter', 'SayHello');
    expect(proto && method && methodKey(proto, method)).toBe('demo.SayHello');
  });
});

describe('invokeGrpc', () => {
  it('returns a mock response for unary methods', async () => {
    const proto = parseProto(SAMPLE);
    const method = proto && findMethod(proto, 'Greeter', 'SayHello');
    const result = await invokeGrpc(method!, { name: 'world' });
    expect(result).toContain('"method": "SayHello"');
    expect(result).toContain('"streaming": "unary"');
  });

  it('marks streaming methods', async () => {
    const proto = parseProto(SAMPLE);
    const method = proto && findMethod(proto, 'Greeter', 'Chat');
    const result = await invokeGrpc(method!, { text: 'hi' });
    expect(result).toContain('mock stream (1 message)');
  });
});

describe('parseJsonInput', () => {
  it('parses valid JSON', () => {
    expect(parseJsonInput('{"a": 1}')).toEqual({ a: 1 });
  });

  it('returns empty object for blank input', () => {
    expect(parseJsonInput('')).toEqual({});
  });

  it('returns null for invalid JSON', () => {
    expect(parseJsonInput('not-json')).toBeNull();
  });

  it('returns null when JSON parses to a non-object', () => {
    expect(parseJsonInput('"hello"')).toBeNull();
    expect(parseJsonInput('42')).toBeNull();
  });
});
