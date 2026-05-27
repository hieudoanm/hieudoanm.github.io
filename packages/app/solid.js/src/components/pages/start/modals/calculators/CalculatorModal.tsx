import { createSignal, createEffect, onCleanup } from 'solid-js';
import { ModalWrapper } from '@hieudoanm/components/atoms/ModalWrapper';

export const CalculatorModal = (props: { onClose: () => void }) => {
  const [expression, setExpression] = createSignal<string>('');
  const [scientific, setScientific] = createSignal<boolean>(false);
  let containerRef: HTMLDivElement | undefined;

  createEffect(() => {
    containerRef?.focus();
  });

  const append = (value: string) => setExpression((prev) => prev + value);
  const del = () => setExpression((prev) => prev.slice(0, -1));
  const clear = () => setExpression('');
  const calculate = () => {
    try {
      const sanitized = expression()
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

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      props.onClose();
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

  const isError = () => expression() === 'Error';

  return (
    <ModalWrapper onClose={props.onClose} title="Calculator">
      <div
        ref={(el) => {
          containerRef = el;
        }}
        tabIndex={0}
        onKeyDown={onKeyDown}
        class="outline-none">
        <input
          type="text"
          value={expression()}
          readOnly
          class={`input input-bordered mb-3 w-full text-right font-mono text-lg ${isError() ? 'input-error' : ''}`}
          placeholder="0"
        />

        <button
          class="btn btn-accent btn-sm mb-3 w-full"
          onClick={() => setScientific((s) => !s)}>
          {scientific() ? 'Basic Mode' : 'Scientific Mode'}
        </button>

        {scientific() && (
          <div class="mb-3 grid grid-cols-4 gap-2">
            {sciButtons.map((btn) => (
              <button
                key={btn}
                class="btn btn-secondary btn-sm"
                onClick={() => append(btn === 'x²' ? '^2' : btn)}>
                {btn}
              </button>
            ))}
          </div>
        )}

        <div class="grid grid-cols-4 gap-2">
          {basicButtons.map((btn) => (
            <button key={btn} class="btn btn-sm" onClick={() => append(btn)}>
              {btn}
            </button>
          ))}
          <button class="btn btn-warning btn-sm col-span-2" onClick={del}>
            Delete
          </button>
          <button class="btn btn-error btn-sm" onClick={clear}>
            C
          </button>
          <button class="btn btn-primary btn-sm" onClick={calculate}>
            =
          </button>
        </div>

        <p class="mt-3 text-center text-xs opacity-40">
          Type directly · Enter = · Backspace del · Esc close
        </p>
      </div>
    </ModalWrapper>
  );
};
