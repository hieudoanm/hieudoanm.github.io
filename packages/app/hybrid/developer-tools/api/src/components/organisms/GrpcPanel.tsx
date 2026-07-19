'use client';

import {
  findMethod,
  invokeGrpc,
  parseJsonInput,
  parseProto,
} from '@/lib/proto';
import { prettyPrint } from '@/lib/format';
import { GrpcService, ProtoFile } from '@/types/api-client';
import { type FC, useState } from 'react';
import { FiPlay } from 'react-icons/fi';

const DEFAULT_PROTO = `syntax = "proto3";

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
}`;

const initialProto = parseProto(DEFAULT_PROTO);

const GrpcPanel: FC = () => {
  const [source, setSource] = useState(DEFAULT_PROTO);
  const [proto, setProto] = useState<ProtoFile | null>(initialProto);
  const [service, setService] = useState<string>(
    () => initialProto?.services[0]?.name ?? ''
  );
  const [method, setMethod] = useState<string>(
    () => initialProto?.services[0]?.methods[0]?.name ?? ''
  );
  const [input, setInput] = useState('{"name": "world"}');
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const parse = (): void => {
    const parsed = parseProto(source);
    setProto(parsed);
    setOutput(null);
    setError(parsed ? null : 'No services found in the .proto source.');
    if (parsed) {
      setService(parsed.services[0]?.name ?? '');
      setMethod(parsed.services[0]?.methods[0]?.name ?? '');
    }
  };

  const selectedService: GrpcService | undefined = proto?.services.find(
    (s) => s.name === service
  );
  const selectedMethod =
    selectedService?.methods.find((m) => m.name === method) ?? null;

  const invoke = async (): Promise<void> => {
    if (!proto || !selectedMethod) return;
    const parsed = parseJsonInput(input);
    if (parsed === null) {
      setError('Request must be valid JSON');
      return;
    }
    setError(null);
    setOutput(prettyPrint(await invokeGrpc(selectedMethod, parsed)));
  };

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="// paste your .proto here"
        aria-label="Proto source"
        rows={8}
        spellCheck={false}
        className="textarea textarea-bordered w-full font-mono"
      />
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={parse}
          className="btn btn-outline btn-primary btn-sm">
          Parse Proto
        </button>
        {proto && (
          <>
            <select
              value={service}
              onChange={(e) => {
                setService(e.target.value);
                setMethod(
                  proto.services.find((s) => s.name === e.target.value)
                    ?.methods[0]?.name ?? ''
                );
              }}
              aria-label="Service"
              className="select select-bordered select-sm font-mono">
              {proto.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              aria-label="Method"
              className="select select-bordered select-sm font-mono">
              {selectedService?.methods.map((m) => (
                <option key={m.name} value={m.name}>
                  {m.name}
                </option>
              ))}
            </select>
            <span className="badge badge-ghost badge-sm font-mono">
              {proto.package || '(no package)'}
            </span>
          </>
        )}
      </div>

      {selectedMethod && (
        <div className="text-base-content/60 text-xs">
          {selectedMethod.clientStreaming ? 'client-streaming · ' : 'unary · '}
          {selectedMethod.serverStreaming
            ? 'server-streaming'
            : 'single response'}
          {' · '}
          {selectedMethod.inputType} → {selectedMethod.outputType}
        </div>
      )}

      {selectedMethod && (
        <>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            aria-label="gRPC request"
            rows={4}
            spellCheck={false}
            className="textarea textarea-bordered w-full font-mono"
          />
          <button
            type="button"
            onClick={() => void invoke()}
            className="btn btn-primary btn-sm w-fit gap-1">
            <FiPlay className="size-4" />
            <span>Invoke</span>
          </button>
        </>
      )}

      {error && (
        <span role="alert" className="text-error text-xs">
          {error}
        </span>
      )}
      {output && (
        <pre className="bg-base-200 overflow-x-auto rounded-lg p-3 font-mono text-xs whitespace-pre-wrap">
          {output}
        </pre>
      )}
    </div>
  );
};

GrpcPanel.displayName = 'GrpcPanel';

export { GrpcPanel };
