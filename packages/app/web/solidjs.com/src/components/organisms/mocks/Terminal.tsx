import { JSX } from 'solid-js';

interface TerminalLine {
  prefix?: string;
  text: string;
  highlight?: boolean;
}

interface TerminalProps {
  lines?: TerminalLine[];
  children?: JSX.Element;
  class?: string;
}

export const Terminal = (props: TerminalProps) => (
  <div class={`mockup-code w-full ${props.class || ''}`}>
    {props.lines
      ? props.lines.map((line, i) => (
          <pre
            key={i}
            data-prefix={line.prefix ?? ''}
            class={line.highlight ? 'bg-warning text-warning-content' : ''}>
            <code>{line.text}</code>
          </pre>
        ))
      : props.children}
  </div>
);
