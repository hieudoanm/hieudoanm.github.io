import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';
import { FC, useCallback, useMemo, useState } from 'react';

type CharClass = '\\d' | '[a-z]' | '[A-Z]' | '[a-zA-Z]' | '\\w' | '.';

const classifyChar = (c: string): CharClass | null => {
  if (/[0-9]/.test(c)) return '\\d';
  if (/[a-z]/.test(c)) return '[a-z]';
  if (/[A-Z]/.test(c)) return '[A-Z]';
  return null;
};

const classifySegment = (seg: string): string | null => {
  if (seg.length === 0) return '';
  if (/^\d+$/.test(seg)) return `\\d{${seg.length}}`;
  if (/^[a-z]+$/.test(seg)) return `[a-z]{${seg.length}}`;
  if (/^[A-Z]+$/.test(seg)) return `[A-Z]{${seg.length}}`;
  if (/^[a-zA-Z]+$/.test(seg)) return `[a-zA-Z]{${seg.length}}`;
  if (/^[a-zA-Z0-9]+$/.test(seg)) return `\\w{${seg.length}}`;
  return null;
};

const escapeLit = (s: string): string =>
  s.replace(/[.+*?^${}()|[\]\\]/g, '\\$&');

const SEP_PATTERN = /[-_.\s/|~]+/;

const splitParts = (s: string): string[] =>
  s.split(SEP_PATTERN).filter(Boolean);

const generateRegex = (strings: string[]): string | null => {
  if (strings.length < 2) return null;
  const clean = strings.filter((s) => s.length > 0);
  if (clean.length < 2) return null;

  const allSame = clean.every((s) => s === clean[0]);
  if (allSame) return escapeLit(clean[0]);

  const bySep = clean.map(splitParts);

  const allSamePartsCount = bySep.every(
    (parts) => parts.length === bySep[0].length
  );

  if (allSamePartsCount) {
    const result: string[] = [];
    for (let i = 0; i < bySep[0].length; i++) {
      const parts = bySep.map((p) => p[i]);
      const first = parts[0];

      if (parts.every((p) => p === first)) {
        result.push(i > 0 ? '[-_.\\s/|~]' : '', escapeLit(first));
        continue;
      }

      const allSameLen = parts.every((p) => p.length === first.length);
      if (allSameLen) {
        let pattern = '';
        for (let j = 0; j < first.length; j++) {
          const chars = parts.map((p) => p[j]);
          const uniq = [...new Set(chars)];
          if (uniq.length === 1) {
            const cls = classifyChar(uniq[0]);
            pattern += cls ?? escapeLit(uniq[0]);
          } else {
            const classes = uniq.map((c) => classifyChar(c));
            const allSameClass = classes.every(
              (c, _, arr) => c && c === arr[0]
            );
            if (allSameClass) {
              pattern += classes[0];
            } else {
              const printable = uniq
                .map((c) => escapeLit(c))
                .sort()
                .join('');
              pattern += `[${printable}]`;
            }
          }
        }
        result.push(i > 0 ? '[-_.\\s/|~]' : '', pattern);
      } else {
        const segClass = classifySegment(first);
        if (segClass && parts.every((p) => classifySegment(p))) {
          const lengths = [...new Set(parts.map((p) => p.length))];
          if (lengths.length === 1) {
            result.push(i > 0 ? '[-_.\\s/|~]' : '', segClass);
          } else {
            const min = Math.min(...lengths);
            const max = Math.max(...lengths);
            const base = segClass.replace(/\{\d+\}$/, '');
            result.push(i > 0 ? '[-_.\\s/|~]' : '', `${base}{${min},${max}}`);
          }
        } else {
          result.push(
            i > 0 ? '[-_.\\s/|~]' : '',
            `(?:(?:${parts.map((p) => escapeLit(p)).join('|')}))`
          );
        }
      }
    }
    return result.join('');
  }

  const prefix = (() => {
    let i = 0;
    while (i < clean[0].length && clean.every((s) => s[i] === clean[0][i])) i++;
    return clean[0].slice(0, i);
  })();

  const suffix = (() => {
    let i = 0;
    while (
      i < clean[0].length &&
      clean.every(
        (s) => s[s.length - 1 - i] === clean[0][clean[0].length - 1 - i]
      )
    )
      i++;
    return clean[0].slice(clean[0].length - i);
  })();

  if (prefix || suffix) {
    const mid = clean.map((s) =>
      s.slice(prefix.length, s.length - suffix.length || s.length)
    );
    const uniqMid = [...new Set(mid)];
    if (uniqMid.length === 1 && uniqMid[0] === '') {
      return `${escapeLit(prefix)}${escapeLit(suffix)}`;
    }
    const escaped = uniqMid.map((m) => escapeLit(m));
    return `${escapeLit(prefix)}(?:${escaped.join('|')})${escapeLit(suffix)}`;
  }

  const escaped = clean.map((s) => escapeLit(s));
  return `(?:${escaped.join('|')})`;
};

const testRegex = (
  pattern: string,
  flags: string,
  tests: string[]
): boolean[] => {
  try {
    const re = new RegExp(pattern, flags);
    return tests.map((t) => re.test(t));
  } catch {
    return tests.map(() => false);
  }
};

export const RegexModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [input, setInput] = useState(
    `user@example.com\nadmin@domain.org\ncontact@site.co`
  );
  const [flags, setFlags] = useState('g');
  const [testInput, setTestInput] = useState('');
  const [customPattern, setCustomPattern] = useState('');

  const strings = useMemo(
    () =>
      input
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    [input]
  );

  const generated = useMemo(
    () => (strings.length > 0 ? generateRegex(strings) : null),
    [strings]
  );

  const pattern = customPattern || generated || '';

  const testLines = useMemo(
    () =>
      testInput
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    [testInput]
  );

  const results = useMemo(
    () => (pattern ? testRegex(pattern, flags, testLines) : []),
    [pattern, flags, testLines]
  );

  const copyPattern = useCallback(() => {
    navigator.clipboard.writeText(pattern);
  }, [pattern]);

  const copyFlags = useCallback(() => {
    navigator.clipboard.writeText(flags);
  }, [flags]);

  return (
    <ModalWrapper onClose={onClose} title="Regex Generator" size="max-w-2xl">
      <div className="flex flex-col gap-4">
        {/* Input strings */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase opacity-60">
            Sample Strings (one per line)
          </label>
          <textarea
            className="textarea textarea-bordered h-28 w-full font-mono text-sm"
            placeholder={`user1@example.com\nuser2@example.com\nadmin@example.com`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Generated Regex */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase opacity-60">
            Regex Pattern
          </label>
          <div className="flex gap-2">
            <input
              className="input input-bordered flex-1 font-mono text-sm"
              value={pattern}
              onChange={(e) => setCustomPattern(e.target.value)}
              placeholder="Generated or custom pattern..."
            />
            <div className="flex gap-1">
              <input
                className="input input-bordered w-16 font-mono text-sm uppercase"
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                placeholder="g"
              />
              <button
                onClick={copyFlags}
                className="btn btn-ghost btn-square btn-sm"
                title="Copy flags">
                F
              </button>
            </div>
            <button
              onClick={copyPattern}
              className="btn btn-primary btn-sm"
              disabled={!pattern}>
              Copy
            </button>
          </div>
          {generated && !customPattern && (
            <p className="mt-1 text-xs opacity-40">
              Edit the pattern above to switch to custom mode
            </p>
          )}
        </div>

        {/* Test */}
        <div>
          <label className="mb-1 block text-xs font-bold uppercase opacity-60">
            Test Strings (one per line)
          </label>
          <textarea
            className="textarea textarea-bordered h-24 w-full font-mono text-sm"
            placeholder={`user@example.com\nadmin@site.org\nnot-an-email`}
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
          />
        </div>

        {/* Results */}
        {testLines.length > 0 && pattern && (
          <div className="border-base-300 max-h-40 overflow-y-auto rounded-lg border">
            {testLines.map((line, i) => (
              <div
                key={i}
                className={`border-base-200 flex items-center gap-3 border-b px-3 py-1.5 text-sm last:border-0 ${
                  results[i] ? 'bg-success/10' : 'bg-error/10'
                }`}>
                <span className="text-lg">{results[i] ? '✓' : '✗'}</span>
                <span className="font-mono">{line}</span>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs opacity-40">
          Enter 2+ sample strings to generate a regex pattern
        </p>
      </div>
    </ModalWrapper>
  );
};
