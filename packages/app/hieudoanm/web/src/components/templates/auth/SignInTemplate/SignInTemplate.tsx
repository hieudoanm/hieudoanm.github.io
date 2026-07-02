import { FC } from 'react';
import { SignInForm } from '../../../organisms/auth/SignInForm';

interface SignInTemplateProps {
  onSuccess?: () => void;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
}

const Nav = () => (
  <div className="navbar bg-base-100/85 border-base-300 sticky top-0 z-50 min-h-[60px] border-b px-4 backdrop-blur-xl lg:px-12">
    <div className="navbar-start">
      <a
        href="/"
        className="text-primary font-serif text-2xl font-bold tracking-widest">
        DaisyX
      </a>
    </div>
    <div className="navbar-end">
      <a href="/" className="btn btn-ghost btn-sm">
        Home
      </a>
    </div>
  </div>
);

const Footer = () => (
  <footer className="border-base-300 border-t py-12 text-center">
    <p className="text-primary mb-3 font-serif text-2xl font-bold tracking-widest">
      DaisyX
    </p>
    <p className="text-base-content/30 text-sm">
      &copy; 2026 &middot; Built with care
    </p>
  </footer>
);

export const SignInTemplate: FC<SignInTemplateProps> = ({
  onSuccess,
  onSignUpClick,
  onForgotPasswordClick,
}) => (
  <div
    className="bg-base-100 text-base-content min-h-screen font-sans"
    data-theme="luxury">
    <Nav />
    <main className="mx-auto flex min-h-[calc(100vh-140px)] max-w-lg items-center justify-center px-4 py-16">
      <SignInForm
        onSuccess={onSuccess}
        onSignUpClick={onSignUpClick}
        onForgotPasswordClick={onForgotPasswordClick}
      />
    </main>
    <Footer />
  </div>
);

SignInTemplate.displayName = 'SignInTemplate';
