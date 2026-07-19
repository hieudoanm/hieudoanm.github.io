import type { FC } from 'react';
import Link from 'next/link';

export const PrivacyTemplate: FC = () => (
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
      <h1 className="mb-8 text-4xl md:text-5xl">Privacy Policy</h1>

      <div className="text-base-content/70 flex flex-col gap-6 text-sm leading-relaxed">
        <p>Last updated: January 2024</p>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            1. Information We Collect
          </h2>
          <p>
            We collect information you provide directly to us, such as your
            name, email address, and payment information when you create an
            account or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">
            2. How We Use Your Information
          </h2>
          <p>
            We use the information we collect to provide, maintain, and improve
            the Service, process transactions, send technical notices, and
            respond to your requests.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">3. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with
            third-party service providers who help us operate the Service,
            subject to strict confidentiality agreements.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">4. Data Security</h2>
          <p>
            We implement industry-standard security measures including
            encryption at rest and in transit, regular security audits, and
            access controls to protect your data.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data
            at any time through your account settings or by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">6. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to improve your
            experience. You can control cookie preferences in your browser
            settings.
          </p>
        </section>

        <section>
          <h2 className="text-base-content mb-3 text-lg">7. Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{' '}
            <span className="text-primary">privacy@boilerplate.com</span>.
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

PrivacyTemplate.displayName = 'PrivacyTemplate';
