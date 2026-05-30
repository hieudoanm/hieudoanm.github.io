import { JSX } from 'solid-js';

interface BrowserProps {
  url?: string;
  children?: JSX.Element;
  class?: string;
}

export const Browser = (props: BrowserProps) => (
  <div
    class={`mockup-browser border-base-300 bg-base-100 w-full border ${props.class || ''}`}>
    <div class="mockup-browser-toolbar">
      <div class="input">{props.url ?? 'https://daisyui.com'}</div>
    </div>
    <div class="border-base-300 grid border-t">{props.children}</div>
  </div>
);
