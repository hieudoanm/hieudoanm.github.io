interface HeaderProps {
  onSignInClick?: () => void;
  onGetStartedClick?: () => void;
}

export const Header = (props: HeaderProps) => (
  <div class="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-12 backdrop-blur-xl">
    <div class="navbar-start">
      <span class="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </span>
    </div>
    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        <li>
          <a href="#primitives" class="hover:text-base-content">
            Components
          </a>
        </li>
        <li>
          <a href="#forms" class="hover:text-base-content">
            Forms
          </a>
        </li>
        <li>
          <a href="#feedback" class="hover:text-base-content">
            Feedback
          </a>
        </li>
        <li>
          <a href="#navigation" class="hover:text-base-content">
            Navigation
          </a>
        </li>
        <li>
          <a href="#data" class="hover:text-base-content">
            Data
          </a>
        </li>
        <li>
          <a href="#pricing" class="hover:text-base-content">
            Pricing
          </a>
        </li>
      </ul>
    </div>
    <div class="navbar-end gap-2">
      <button
        type="button"
        class="btn btn-ghost btn-sm"
        onClick={props.onSignInClick}>
        Sign in
      </button>
      <button
        type="button"
        class="btn btn-primary btn-sm"
        onClick={props.onGetStartedClick}>
        Get started
      </button>
    </div>
  </div>
);
