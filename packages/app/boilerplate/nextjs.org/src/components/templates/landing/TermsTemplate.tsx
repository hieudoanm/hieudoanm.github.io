import type { FC } from 'react';
import Link from 'next/link';

export const TermsTemplate: FC = () => (
  <div className="flex min-h-dvh flex-col">
    <header className="border-base-300 bg-base-100/80 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-4 backdrop-blur-sm">
      <Link href="/" className="text-lg font-bold tracking-tight">
        Boilerplate
      </Link>
      <nav className="flex items-center gap-2">
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          Sign in
        </Link>
        <Link href="/sign-up" className="btn btn-primary btn-sm">
          Sign up
        </Link>
      </nav>
    </header>

    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-24">
      <span className="badge badge-neutral mb-6 rounded-full">Legal</span>
      <h1 className="mb-8 text-4xl md:text-5xl">Terms of Service</h1>

      <div className="text-base-content/70 flex flex-col gap-6 text-sm leading-relaxed">
        <p>Last updated: January 2024</p>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Boilerplate (&ldquo;the Service&rdquo;), you
            agree to be bound by these Terms of Service. If you do not agree, do
            not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            2. Description of Service
          </h2>
          <p>
            Boilerplate provides a web-based platform for building and deploying
            modern web applications. We reserve the right to modify, suspend, or
            discontinue the Service at any time.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            3. User Obligations
          </h2>
          <p>
            You agree to use the Service in compliance with all applicable laws.
            You are responsible for maintaining the confidentiality of your
            account credentials.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            4. Intellectual Property
          </h2>
          <p>
            The Service and its original content, features, and functionality
            are owned by Boilerplate and are protected by international
            copyright laws.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            5. Limitation of Liability
          </h2>
          <p>
            Boilerplate shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages arising out of your use
            of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these terms at any time. We will
            notify users of material changes via email or through the Service.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">7. Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <span className="text-primary">hello@boilerplate.com</span>.
          </p>
        </section>
      </div>
    </main>

    <footer className="border-base-300 border-t px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-base-content/50 text-xs">
          &copy; {new Date().getFullYear()} Boilerplate. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link
            href="/privacy"
            className="text-base-content/50 hover:text-base-content text-xs transition-colors">
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-base-content/50 hover:text-base-content text-xs transition-colors">
            Terms
          </Link>
          <Link
            href="/contact"
            className="text-base-content/50 hover:text-base-content text-xs transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  </div>
);

TermsTemplate.displayName = 'TermsTemplate';
