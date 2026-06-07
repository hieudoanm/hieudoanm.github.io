import { JSX } from 'solid-js';

interface PhoneProps {
  children?: JSX.Element;
  class?: string;
}

export const Phone = (props: PhoneProps) => (
  <div class={`mockup-phone border-gray-400 ${props.class || ''}`}>
    <div class="mockup-phone-camera" />
    <div class="mockup-phone-display bg-neutral-900 text-white">
      {props.children}
    </div>
  </div>
);
