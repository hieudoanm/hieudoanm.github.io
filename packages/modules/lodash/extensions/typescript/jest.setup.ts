import 'fake-indexeddb/auto';

if (globalThis.structuredClone === undefined) {
  globalThis.structuredClone = (value: unknown) =>
    JSON.parse(JSON.stringify(value));
}
