import { createSignal, onMount } from 'solid-js';

export const useBrowser = () => {
  const [browser, setBrowser] = createSignal('');

  onMount(() => {
    if (typeof window === 'undefined' || !window.navigator.userAgent) {
      setBrowser('Unknown');
      return;
    }
    if (window.navigator.userAgent.indexOf('Chrome') !== -1) {
      setBrowser('Google Chrome');
      return;
    }
    if (window.navigator.userAgent.indexOf('Firefox') !== -1) {
      setBrowser('Mozilla Firefox');
      return;
    }
    if (window.navigator.userAgent.indexOf('MSIE') !== -1) {
      setBrowser('Internet Explorer');
      return;
    }
    if (window.navigator.userAgent.indexOf('Edge') !== -1) {
      setBrowser('Edge');
      return;
    }
    if (window.navigator.userAgent.indexOf('Safari') !== -1) {
      setBrowser('Safari');
      return;
    }
    if (window.navigator.userAgent.indexOf('Opera') !== -1) {
      setBrowser('Opera');
      return;
    }
    if (window.navigator.userAgent.indexOf('YaBrowser') !== -1) {
      setBrowser('YaBrowser');
      return;
    }
    setBrowser('Unknown');
  });

  return { browser: browser() };
};
