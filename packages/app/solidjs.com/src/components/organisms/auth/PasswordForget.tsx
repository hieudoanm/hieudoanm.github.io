import { createSignal } from 'solid-js';

interface PasswordForgetProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
}

export const PasswordForget = (props: PasswordForgetProps) => {
  const [email, setEmail] = createSignal('');
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [sent, setSent] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (!email().trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  if (sent()) {
    return (
      <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8 text-center">
        <div class="mb-6 text-5xl">✉</div>
        <h3 class="mb-2 font-serif text-xl font-bold">Check your inbox</h3>
        <p class="text-base-content/50 mb-7 text-sm leading-relaxed">
          We've sent a password reset link to{' '}
          <span class="text-base-content font-medium">{email()}</span>
        </p>
        <button
          type="button"
          class="btn btn-primary w-full"
          onClick={props.onSuccess}>
          Done
        </button>
        <p class="text-base-content/40 mt-4 text-center text-xs">
          Didn't receive the email?{' '}
          <button
            type="button"
            class="text-primary hover:underline"
            onClick={() => setSent(false)}>
            Resend
          </button>
        </p>
      </div>
    );
  }

  return (
    <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8">
      <div class="mb-8 text-center">
        <p class="text-primary mb-1 font-serif text-3xl font-bold tracking-widest">
          Forma
        </p>
        <p class="text-base-content/50 text-sm">Forgot your password?</p>
      </div>
      <p class="text-base-content/50 mb-6 text-sm leading-relaxed">
        No worries — enter your email and we'll send you a reset link.
      </p>
      <form onSubmit={handleSubmit} class="flex flex-col gap-5">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">Email</span>
          </label>
          <input
            type="email"
            placeholder="jane@forma.io"
            class={`input input-bordered w-full ${error() ? 'input-error' : ''}`}
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        {error() && (
          <div role="alert" class="alert alert-error py-2 text-sm">
            <span>✕</span>
            <span>{error()}</span>
          </div>
        )}
        <button
          type="submit"
          class={`btn btn-primary w-full ${loading() ? 'btn-disabled' : ''}`}
          disabled={loading()}>
          {loading() ? (
            <>
              <span class="loading loading-spinner loading-xs" />
              Sending…
            </>
          ) : (
            'Send reset link'
          )}
        </button>
      </form>
      <p class="text-base-content/40 mt-6 text-center text-xs">
        Remember your password?{' '}
        <button
          type="button"
          class="text-primary hover:underline"
          onClick={props.onBackToSignIn}>
          Sign in
        </button>
      </p>
    </div>
  );
};
