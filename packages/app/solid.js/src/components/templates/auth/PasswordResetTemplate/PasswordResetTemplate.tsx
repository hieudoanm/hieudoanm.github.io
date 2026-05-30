import { PasswordReset } from '../../../organisms/auth/PasswordReset';

interface PasswordResetTemplateProps {
  onSuccess?: () => void;
  onBackToSignIn?: () => void;
  token?: string;
}

const Nav = () => (
  <div class="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
    <div class="navbar-start">
      <a
        href="/"
        class="text-primary font-serif text-2xl font-bold tracking-widest">
        Forma
      </a>
    </div>
    <div class="navbar-end">
      <a href="/" class="btn btn-ghost btn-sm">
        Home
      </a>
    </div>
  </div>
);

const Footer = () => (
  <footer class="border-base-300 border-t py-12 text-center">
    <p class="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
      Forma
    </p>
    <p class="text-base-content/30 text-sm">
      &copy; 2026 &middot; Built with care
    </p>
  </footer>
);

export const PasswordResetTemplate = (props: PasswordResetTemplateProps) => (
  <div
    class="bg-base-100 text-base-content min-h-screen font-sans"
    data-theme="luxury">
    <Nav />
    <main class="mx-auto flex min-h-[calc(100vh-140px)] max-w-lg items-center justify-center px-4 py-16">
      <PasswordReset
        onSuccess={props.onSuccess}
        onBackToSignIn={props.onBackToSignIn}
        token={props.token}
      />
    </main>
    <Footer />
  </div>
);
