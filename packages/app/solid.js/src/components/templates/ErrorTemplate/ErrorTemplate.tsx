import { A } from '@solidjs/router';
import { createSignal, onMount, createEffect, onCleanup } from 'solid-js';

export const ErrorTemplate = (props: {
  error?: { code: number; message: string };
  messages?: string[];
}) => {
  const [state, setState] = createSignal<{
    message: string;
    path: string;
  }>({
    message: '',
    path: '',
  });

  createEffect(() => {
    const msgs = props.messages ?? [];
    if (msgs.length > 0) {
      const randomMessage: string =
        msgs[Math.floor(Math.random() * msgs.length)];
      const notFoundPath: string =
        typeof window === 'undefined' ? '' : window.location.pathname;
      setState({ message: randomMessage, path: notFoundPath });
    }
  });

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Backspace' || e.key === 'ArrowLeft') {
        window.history.back();
      }
    };
    window.addEventListener('keydown', handler);
    onCleanup(() => window.removeEventListener('keydown', handler));
  });

  const resolvedError = {
    code: props.error?.code ?? 500,
    message: props.error?.message ?? 'Internal Server Error',
  };
  const isNotFound = resolvedError.code === 404;

  return (
    <div
      class="bg-base-100 text-base-content relative flex min-h-screen items-center justify-center px-12 py-24"
      data-theme="luxury">
      {/* Ambient glow — mirrors Hero's radial blob */}
      <div class="bg-primary/5 pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div class="relative mx-auto w-full max-w-xl text-center">
        {/* Error code badge */}
        <p class="text-primary mb-7 text-xs tracking-[0.2em] uppercase">
          {isNotFound ? 'Page not found' : 'Something went wrong'}
        </p>

        {/* Giant error code — mirrors Hero h1 treatment */}
        <h1 class="mb-6 font-serif text-[9rem] leading-none font-black tracking-tight">
          <span class="text-primary">{resolvedError.code}</span>
        </h1>

        {/* Message */}
        <h2 class="mb-4 font-serif text-3xl leading-snug font-bold">
          {resolvedError.message}
        </h2>

        {/* Random flavour copy */}
        {state().message && (
          <p class="text-base-content/60 mx-auto mb-3 max-w-sm text-base leading-relaxed">
            {state().message}
          </p>
        )}

        {/* Requested path */}
        {state().path && (
          <p class="text-base-content/30 mb-10 font-mono text-xs break-all">
            {state().path}
          </p>
        )}

        {/* CTA buttons — mirrors Hero button row */}
        <div class="mb-10 flex flex-wrap justify-center gap-3">
          <A href="/" class="btn btn-primary">
            Go home
          </A>
          <button class="btn btn-ghost" onClick={() => window.history.back()}>
            Go back
          </button>
        </div>

        {/* Keyboard hint — mirrors Hero badges row */}
        <div class="flex flex-wrap justify-center gap-3">
          <span class="badge badge-ghost border-base-300 text-base-content/40 gap-1.5 border">
            <kbd class="kbd kbd-xs">←</kbd>
            <span>or</span>
            <kbd class="kbd kbd-xs">Backspace</kbd>
            <span>to go back</span>
          </span>
          {isNotFound && (
            <span class="badge badge-warning text-warning-content">404</span>
          )}
          {!isNotFound && (
            <span class="badge badge-error">{resolvedError.code}</span>
          )}
        </div>
      </div>
    </div>
  );
};
