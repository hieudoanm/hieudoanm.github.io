import { JSX } from 'solid-js';

interface WindowProps {
  children?: JSX.Element;
  class?: string;
}

export const Window = (props: WindowProps) => (
  <div
    class={`mockup-window border-base-300 bg-base-100 w-full border ${props.class || ''}`}>
    <div class="border-base-300 border-t">{props.children}</div>
  </div>
);
