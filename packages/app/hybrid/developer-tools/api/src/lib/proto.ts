import { GrpcMethod, ProtoFile } from '@/types/api-client';

export interface ProtoMessage {
  name: string;
  fields: { name: string; type: string; number: number }[];
}

export const parseProto = (source: string): ProtoFile | null => {
  if (source.trim() === '') return null;
  const packageMatch = source.match(/package\s+([\w.]+)\s*;/);
  const pkg = packageMatch?.[1] ?? '';

  const messages: ProtoMessage[] = [];
  const messageRe = /message\s+(\w+)\s*\{([^}]*)\}/g;
  let messageMatch: RegExpExecArray | null;
  while ((messageMatch = messageRe.exec(source)) !== null) {
    const fields: ProtoMessage['fields'] = [];
    const fieldRe = /\b(\w+)\s+(\w+)\s*=\s*(\d+)\s*;/g;
    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRe.exec(messageMatch[2])) !== null) {
      fields.push({
        name: fieldMatch[2],
        type: fieldMatch[1],
        number: Number(fieldMatch[3]),
      });
    }
    messages.push({ name: messageMatch[1], fields });
  }

  const services = [];
  const serviceRe = /service\s+(\w+)\s*\{(.*?)\}/gs;
  let serviceMatch: RegExpExecArray | null;
  while ((serviceMatch = serviceRe.exec(source)) !== null) {
    const methods: GrpcMethod[] = [];
    const rpcRe =
      /rpc\s+(\w+)\s*\(\s*(stream\s+)?([\w.]+)\s*\)\s*returns\s*\(\s*(stream\s+)?([\w.]+)\s*\)\s*;/g;
    let rpcMatch: RegExpExecArray | null;
    while ((rpcMatch = rpcRe.exec(serviceMatch[2])) !== null) {
      methods.push({
        name: rpcMatch[1],
        clientStreaming: Boolean(rpcMatch[2]),
        inputType: rpcMatch[3],
        serverStreaming: Boolean(rpcMatch[4]),
        outputType: rpcMatch[5],
      });
    }
    if (methods.length > 0) {
      services.push({ name: serviceMatch[1], methods });
    }
  }

  if (services.length === 0) return null;
  return { package: pkg, services };
};

export const findMethod = (
  proto: ProtoFile,
  serviceName: string,
  methodName: string
): GrpcMethod | null => {
  const service = proto.services.find((s) => s.name === serviceName);
  return service?.methods.find((m) => m.name === methodName) ?? null;
};

export const methodKey = (proto: ProtoFile, method: GrpcMethod): string =>
  [proto.package, method.name].filter(Boolean).join('.');

export const invokeGrpc = async (
  method: GrpcMethod,
  request: Record<string, unknown>
): Promise<string> =>
  JSON.stringify(
    {
      method: method.name,
      request,
      response: { [method.outputType]: request },
      streaming: method.serverStreaming ? 'mock stream (1 message)' : 'unary',
    },
    null,
    2
  );

export const parseJsonInput = (
  source: string
): Record<string, unknown> | null => {
  if (source.trim() === '') return {};
  try {
    const parsed: unknown = JSON.parse(source);
    if (typeof parsed === 'object' && parsed !== null) {
      return parsed as Record<string, unknown>;
    }
    return null;
  } catch {
    return null;
  }
};
