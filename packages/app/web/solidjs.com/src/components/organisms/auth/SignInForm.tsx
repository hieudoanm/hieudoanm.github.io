import { createSignal } from 'solid-js';

interface SignInFormProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
}

export const SignInForm = (props: SignInFormProps) => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (!email().trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!password()) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    props.onSuccess?.();
  };

  return (
    <div class="bg-base-100 border-base-300 mx-auto max-w-sm rounded-2xl border p-8">
      <div class="mb-8 text-center">
        <p class="text-primary mb-1 font-serif text-3xl font-bold tracking-widest">
          Forma
        </p>
        <p class="text-base-content/50 text-sm">
          Welcome back — sign in to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} class="flex flex-col gap-5">
        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">Email</span>
          </label>
          <input
            type="email"
            placeholder="jane@forma.io"
            class={`input input-bordered w-full ${error() && !email().trim() ? 'input-error' : ''}`}
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text text-base-content/50 text-xs">
              Password
            </span>
          </label>
          <div class="relative">
            <input
              type={showPassword() ? 'text' : 'password'}
              placeholder="••••••••"
              class={`input input-bordered w-full pr-10 ${error() && !password() ? 'input-error' : ''}`}
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
          <label class="label">
            <button
              type="button"
              class="label-text-alt text-primary hover:underline"
              onClick={props.onForgotPasswordClick}>
              Forgot password?
            </button>
          </label>
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
              Signing in…
            </>
          ) : (
            'Sign in'
          )}
        </button>
      </form>

      <div class="divider text-base-content/20 my-6 text-xs">or</div>

      <button class="btn btn-ghost border-base-300 w-full gap-2 border text-sm">
        <span class="font-bold tracking-tight">G</span>
        Sign in with Google
      </button>

      <p class="text-base-content/40 mt-6 text-center text-xs">
        No account?{' '}
        <button
          type="button"
          class="text-primary hover:underline"
          onClick={props.onSignUpClick}>
          Create one free
        </button>
      </p>
    </div>
  );
};
