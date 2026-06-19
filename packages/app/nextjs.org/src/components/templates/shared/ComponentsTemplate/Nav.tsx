export const Nav = () => (
  <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-12 backdrop-blur-xl">
    <div className="navbar-start">
      <span className="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </span>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal text-base-content/60 gap-2 px-1 text-sm">
        {[
          'Components',
          'Forms',
          'Feedback',
          'Navigation',
          'Data',
          'Pricing',
        ].map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className="hover:text-base-content">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
    <div className="navbar-end gap-2">
      <label
        htmlFor="google-signin-modal"
        className="btn btn-ghost btn-sm cursor-pointer">
        Sign in
      </label>
      <button className="btn btn-primary btn-sm">Get started</button>
    </div>
  </div>
);
