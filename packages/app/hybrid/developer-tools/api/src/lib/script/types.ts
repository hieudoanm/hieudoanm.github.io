import { ScriptLogLevel } from '../../types/api-client';

export type Value = unknown;

export interface SandboxHost {
  log(level: ScriptLogLevel, text: string): void;
  test(name: string, passed: boolean, error?: string): void;
  environment: Record<string, string>;
  requestState: Record<string, unknown>;
  responseState: Record<string, unknown> | null;
  sendRequest?: (
    url: string,
    opts: Record<string, unknown>,
    cb: (err: Error | null, resp?: Record<string, unknown>) => void
  ) => void;
}

export function message(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
