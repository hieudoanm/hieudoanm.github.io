export const GoogleSignInModal = () => (
  <>
    <input type="checkbox" id="google-signin-modal" className="modal-toggle" />
    <div className="modal modal-bottom sm:modal-middle" role="dialog">
      <div className="modal-box bg-base-200 border-base-300 max-w-sm border">
        <h3 className="mb-2 font-serif text-xl font-bold">Welcome back</h3>
        <p className="text-base-content/50 mb-7 text-sm leading-relaxed">
          Sign in to access your DaisyX workspace, saved components, and team
          settings.
        </p>
        <label
          htmlFor="google-signin-modal"
          className="btn btn-primary w-full gap-2">
          <span className="font-bold tracking-tight">G</span>Sign in with Google
        </label>
        <div className="divider text-base-content/20 text-xs">or</div>
        <p className="text-base-content/40 text-center text-xs">
          No account?{' '}
          <a href="#" className="text-primary hover:underline">
            Create one free
          </a>
        </p>
        <div className="modal-action mt-4">
          <label
            htmlFor="google-signin-modal"
            className="btn btn-ghost btn-sm border-base-300 w-full border">
            Cancel
          </label>
        </div>
      </div>
      <label className="modal-backdrop" htmlFor="google-signin-modal" />
    </div>
  </>
);
