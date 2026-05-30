import { createSignal } from 'solid-js';

interface SignUpFormProps {
  onSuccess?: () => void;
  onSignInClick?: () => void;
}

export const SignUpForm = (props: SignUpFormProps) => {
  const [name, setName] = createSignal('');
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [agreeTerms, setAgreeTerms] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);

    if (!name().trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!email().trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password().length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!agreeTerms()) {
      setError('You must agree to the terms of service.');
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
        <p class="text-base-content/50 text-sm">Create your free account</p>
      </div>

      <form onSubmit={handleSubmit} class="flex flex-col gap-5">
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/50 text-xs">
                First name
              </span>
            </label>
            <input
              type="text"
              placeholder="Jane"
              class="input input-bordered w-full"
              value={name()}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text text-base-content/50 text-xs">
                Last name
              </span>
            </label>
            <input
              type="text"
              placeholder="Doe"
              class="input input-bordered w-full"
            />
          </div>
        </div>

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
          <input
            type="password"
            placeholder="At least 8 characters"
            class={`input input-bordered w-full ${error() && password().length < 8 ? 'input-error' : ''}`}
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
          <label class="label">
            <span class="label-text-alt text-base-content/40">
              Must be at least 8 characters
            </span>
          </label>
        </div>

        <label class="flex cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            checked={agreeTerms()}
            onChange={(e) => setAgreeTerms(e.currentTarget.checked)}
            class="checkbox checkbox-primary checkbox-sm mt-0.5"
          />
          <span class="text-base-content/50 leading-relaxed">
            I agree to the{' '}
            <a href="#" class="text-primary hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" class="text-primary hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

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
              Creating account…
            </>
          ) : (
            'Create account'
          )}
        </button>
      </form>

      <div class="divider text-base-content/20 my-6 text-xs">or</div>

      <button class="btn btn-ghost border-base-300 w-full gap-2 border text-sm">
        <span class="font-bold tracking-tight">G</span>
        Sign up with Google
      </button>

      <p class="text-base-content/40 mt-6 text-center text-xs">
        Already have an account?{' '}
        <button
          type="button"
          class="text-primary hover:underline"
          onClick={props.onSignInClick}>
          Sign in
        </button>
      </p>
    </div>
  );
};
