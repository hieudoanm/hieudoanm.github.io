import { createSignal } from 'solid-js';

interface PasswordResetProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
  token?: string;
}

function getInitialToken(propToken?: string) {
  if (propToken) return propToken;
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    return params.get('token') || params.get('code') || '';
  }
  return '';
}

export const PasswordReset = (props: PasswordResetProps) => {
  const [token] = createSignal(getInitialToken(props.token));
  const [password, setPassword] = createSignal('');
  const [confirmPassword, setConfirmPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);
  const [success, setSuccess] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (password().length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password() !== confirmPassword()) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  if (success()) {
    return (
      <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8 text-center">
        <div class="mb-6 text-5xl">✓</div>
        <h3 class="mb-2 font-serif text-xl font-bold">Password updated</h3>
        <p class="text-base-content/50 mb-7 text-sm leading-relaxed">
          Your password has been reset successfully.
        </p>
        <button
          type="button"
          class="btn btn-primary w-full"
          onClick={props.onSuccess}>
          Sign in with new password
        </button>
      </div>
    );
  }

  if (!token()) {
    return (
      <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8 text-center">
        <div class="mb-6 text-5xl">⚠</div>
        <h3 class="mb-2 font-serif text-xl font-bold">Invalid reset link</h3>
        <p class="text-base-content/50 mb-7 text-sm leading-relaxed">
          This password reset link is invalid or has expired.
        </p>
        <button
          type="button"
          class="btn btn-primary w-full"
          onClick={props.onBackToSignIn}>
          Back to sign in
        </button>
      </div>
    );
  }

  return (
    <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8">
      <div class="mb-8 text-center">
        <p class="text-primary mb-1 font-serif text-3xl font-bold tracking-widest">
          Forma
        </p>
        <p class="text-base-content/50 text-sm">Choose a new password</p>
      </div>

      <form onSubmit={handleSubmit} class="flex flex-col gap-5">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              New password
            </span>
          </label>
          <div class="relative">
            <input
              type={showPassword() ? 'text' : 'password'}
              placeholder="At least 8 characters"
              class={`input input-bordered w-full pr-10 ${error() && password().length < 8 ? 'input-error' : ''}`}
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
            <button
              type="button"
              class="text-base-content/40 hover:text-base-content absolute top-1/2 right-3 -translate-y-1/2 text-sm"
              onClick={() => setShowPassword((p) => !p)}>
              {showPassword() ? '🙈' : '👁'}
            </button>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Confirm password
            </span>
          </label>
          <div class="relative">
            <input
              type={showPassword() ? 'text' : 'password'}
              placeholder="Repeat your password"
              class={`input input-bordered w-full ${error() && password() !== confirmPassword() ? 'input-error' : ''}`}
              value={confirmPassword()}
              onInput={(e) => setConfirmPassword(e.currentTarget.value)}
            />
          </div>
        </div>

        {error() && (
          <div role="alert" class="alert alert-error py-2 text-sm">
            <span>✕</span>
            <span>{error()}</span>
          </div>
        )}

        <ul class="text-base-content/40 flex flex-col gap-1 text-xs">
          <li
            class={`flex items-center gap-1 ${password().length >= 8 ? 'text-success' : ''}`}>
            <span>{password().length >= 8 ? '✓' : '○'}</span> At least 8
            characters
          </li>
          <li
            class={`flex items-center gap-1 ${password() === confirmPassword() && password() ? 'text-success' : ''}`}>
            <span>
              {password() === confirmPassword() && password() ? '✓' : '○'}
            </span>{' '}
            Passwords match
          </li>
        </ul>

        <button
          type="submit"
          class={`btn btn-primary w-full ${loading() ? 'btn-disabled' : ''}`}
          disabled={loading()}>
          {loading() ? (
            <>
              <span class="loading loading-spinner loading-xs" />
              Resetting…
            </>
          ) : (
            'Reset password'
          )}
        </button>
      </form>

      <p class="text-base-content/40 mt-6 text-center text-xs">
        <button
          type="button"
          class="text-primary hover:underline"
          onClick={props.onBackToSignIn}>
          Back to sign in
        </button>
      </p>
    </div>
  );
};
