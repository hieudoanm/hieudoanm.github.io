'use client';

import { FC, useState, useCallback, useMemo } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type Tab = 'diff' | 'case' | 'password' | 'url-tracer' | 'word-count';

const TAB_LABELS: Record<Tab, string> = {
  diff: 'Text Diff',
  case: 'Case Converter',
  password: 'Password Generator',
  'url-tracer': 'URL Tracer',
  'word-count': 'Word Counter',
};

function computeDiff(a: string, b: string): string {
  const linesA = a.split('\n');
  const linesB = b.split('\n');
  const result: string[] = [];
  const maxLen = Math.max(linesA.length, linesB.length);
  for (let i = 0; i < maxLen; i++) {
    if (i >= linesA.length) {
      result.push(`+ ${linesB[i]}`);
    } else if (i >= linesB.length) {
      result.push(`- ${linesA[i]}`);
    } else if (linesA[i] !== linesB[i]) {
      result.push(`- ${linesA[i]}`);
      result.push(`+ ${linesB[i]}`);
    } else {
      result.push(`  ${linesA[i]}`);
    }
  }
  return result.join('\n');
}

function generatePassword(
  length: number,
  upper: boolean,
  lower: boolean,
  digits: boolean,
  symbols: boolean
): string {
  const chars = [
    ...(upper ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : ''),
    ...(lower ? 'abcdefghijklmnopqrstuvwxyz' : ''),
    ...(digits ? '0123456789' : ''),
    ...(symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : ''),
  ];
  if (chars.length === 0) return '';
  let result = '';
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += chars[array[i] % chars.length];
  }
  return result;
}

export const TextToolsModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [tab, setTab] = useState<Tab>('diff');
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [inputText, setInputText] = useState('');
  const [passwordLen, setPasswordLen] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [generated, setGenerated] = useState('');
  const [urlInput, setUrlInput] = useState('');

  const diffResult = useMemo(() => {
    if (!textA && !textB) return '';
    return computeDiff(textA, textB);
  }, [textA, textB]);

  const caseConverted = useMemo(() => {
    if (!inputText) return null;
    return {
      upper: inputText.toUpperCase(),
      lower: inputText.toLowerCase(),
      title: inputText.replace(
        /\w\S*/g,
        (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      ),
      camel: inputText.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
      snake: inputText.replace(/\s+/g, '_').toLowerCase(),
      kebab: inputText.replace(/\s+/g, '-').toLowerCase(),
    } as const;
  }, [inputText]);

  const wordCounts = useMemo(() => {
    if (!inputText) return null;
    const chars = inputText.length;
    const words = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
    const lines = inputText.split('\n').length;
    const sentences = inputText.split(/[.!?]+/).filter((s) => s.trim()).length;
    return { chars, words, lines, sentences };
  }, [inputText]);

  const handleGenerate = useCallback(() => {
    setGenerated(
      generatePassword(passwordLen, useUpper, useLower, useDigits, useSymbols)
    );
  }, [passwordLen, useUpper, useLower, useDigits, useSymbols]);

  return (
    <ModalWrapper onClose={onClose} title="Text Tools">
      <div role="tablist" className="tabs tabs-boxed mb-4 w-full flex-wrap">
        {(Object.keys(TAB_LABELS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            className={`tab ${tab === t ? 'tab-active' : ''}`}
            onClick={() => setTab(t)}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {tab === 'diff' && (
          <>
            <textarea
              className="textarea textarea-bordered min-h-[100px] font-mono text-sm"
              placeholder="Original text..."
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
            />
            <textarea
              className="textarea textarea-bordered min-h-[100px] font-mono text-sm"
              placeholder="Modified text..."
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
            />
            {diffResult && (
              <pre className="bg-base-200 overflow-x-auto rounded p-4 font-mono text-sm">
                {diffResult}
              </pre>
            )}
          </>
        )}

        {tab === 'case' && (
          <>
            <textarea
              className="textarea textarea-bordered min-h-[100px]"
              placeholder="Type text to convert..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {inputText && (
              <div className="bg-base-200 space-y-2 rounded p-4 text-sm">
                <div>
                  <span className="font-bold">UPPER:</span>{' '}
                  {caseConverted!.upper}
                </div>
                <div>
                  <span className="font-bold">lower:</span>{' '}
                  {caseConverted!.lower}
                </div>
                <div>
                  <span className="font-bold">Title:</span>{' '}
                  {caseConverted!.title}
                </div>
                <div>
                  <span className="font-bold">camelCase:</span>{' '}
                  {caseConverted!.camel}
                </div>
                <div>
                  <span className="font-bold">snake_case:</span>{' '}
                  {caseConverted!.snake}
                </div>
                <div>
                  <span className="font-bold">kebab-case:</span>{' '}
                  {caseConverted!.kebab}
                </div>
              </div>
            )}
          </>
        )}

        {tab === 'password' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-sm">Length:</label>
              <input
                type="number"
                className="input input-bordered input-sm w-20"
                min={4}
                max={128}
                value={passwordLen}
                onChange={(e) => setPasswordLen(Number(e.target.value))}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={useUpper}
                onChange={(e) => setUseUpper(e.target.checked)}
              />
              Uppercase (A-Z)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={useLower}
                onChange={(e) => setUseLower(e.target.checked)}
              />
              Lowercase (a-z)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={useDigits}
                onChange={(e) => setUseDigits(e.target.checked)}
              />
              Digits (0-9)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
              />
              Symbols (!@#$...)
            </label>
            <button className="btn btn-primary btn-sm" onClick={handleGenerate}>
              Generate
            </button>
            {generated && (
              <div className="bg-base-200 rounded p-4">
                <pre className="text-sm select-all">{generated}</pre>
              </div>
            )}
          </>
        )}

        {tab === 'url-tracer' && (
          <div className="flex flex-col gap-4">
            <input
              type="url"
              className="input input-bordered"
              placeholder="https://example.com"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
            <div className="bg-base-200 rounded p-4">
              <p className="mb-2 text-xs font-bold">CLI Command:</p>
              <pre className="text-sm">
                hieudoanm web trace {urlInput || '<url>'}
              </pre>
            </div>
            <p className="text-base-content/60 text-xs">
              Follows redirect chains and shows response headers via CLI.
            </p>
          </div>
        )}

        {tab === 'word-count' && (
          <>
            <textarea
              className="textarea textarea-bordered min-h-[150px]"
              placeholder="Paste text to analyze..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {wordCounts && (
              <div className="bg-base-200 space-y-1 rounded p-4 text-sm">
                <div>
                  Characters: <strong>{wordCounts.chars}</strong>
                </div>
                <div>
                  Words: <strong>{wordCounts.words}</strong>
                </div>
                <div>
                  Lines: <strong>{wordCounts.lines}</strong>
                </div>
                <div>
                  Sentences: <strong>{wordCounts.sentences}</strong>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </ModalWrapper>
  );
};
TextToolsModal.displayName = 'TextToolsModal';
