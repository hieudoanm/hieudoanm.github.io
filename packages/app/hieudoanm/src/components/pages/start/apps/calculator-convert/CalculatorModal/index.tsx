import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useEffect, useRef, useState } from 'react';

export const CalculatorModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [expression, setExpression] = useState<string>('');
  const [scientific, setScientific] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  const append = (value: string) => setExpression((prev) => prev + value);
  const del = () => setExpression((prev) => prev.slice(0, -1));
  const clear = () => setExpression('');
  const calculate = () => {
    try {
      const sanitized = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/√\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)')
        .replace(/cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)')
        .replace(/tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');

      const result = Function(`"use strict"; return (${sanitized})`)();
      setExpression(String(result));
    } catch {
      setExpression('Error');
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Enter') {
      calculate();
      return;
    }
    if (e.key === 'Backspace') {
      del();
      return;
    }
    if (e.key === 'Delete') {
      clear();
      return;
    }
    const allowed = /^[0-9+\-*/.%^()]$/;
    if (allowed.test(e.key)) append(e.key);
  };

  const basicButtons = [
    '7',
    '8',
    '9',
    '÷',
    '4',
    '5',
    '6',
    '×',
    '1',
    '2',
    '3',
    '-',
    '0',
    '.',
    '%',
    '+',
  ];

  const sciButtons = [
    'sin(',
    'cos(',
    'tan(',
    'log(',
    'ln(',
    '√(',
    '^',
    'π',
    'e',
    '(',
    ')',
    'x²',
  ];

  const isError = expression === 'Error';

  return (
    <FullScreen centered onClose={onClose} title="Calculator">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div
          ref={containerRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="outline-none">
          <input
            type="text"
            value={expression}
            readOnly
            className={`input input-bordered mb-3 w-full text-right font-mono text-lg ${isError ? 'input-error' : ''}`}
            placeholder="0"
          />

          <button
            className="btn btn-accent btn-sm mb-3 w-full"
            onClick={() => setScientific((s) => !s)}>
            {scientific ? 'Basic Mode' : 'Scientific Mode'}
          </button>

          {scientific && (
            <div className="mb-3 grid grid-cols-4 gap-2">
              {sciButtons.map((btn) => (
                <button
                  key={btn}
                  className="btn btn-secondary btn-sm"
                  onClick={() => append(btn === 'x²' ? '^2' : btn)}>
                  {btn}
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-4 gap-2">
            {basicButtons.map((btn) => (
              <button
                key={btn}
                className="btn btn-sm"
                onClick={() => append(btn)}>
                {btn}
              </button>
            ))}
            <button className="btn btn-warning btn-sm col-span-2" onClick={del}>
              Delete
            </button>
            <button className="btn btn-error btn-sm" onClick={clear}>
              C
            </button>
            <button className="btn btn-primary btn-sm" onClick={calculate}>
              =
            </button>
          </div>

          <p className="mt-3 text-center text-xs opacity-40">
            Type directly · Enter = · Backspace del · Esc close
          </p>
        </div>
      </div>
    </FullScreen>
  );
};
CalculatorModal.displayName = 'CalculatorModal';
