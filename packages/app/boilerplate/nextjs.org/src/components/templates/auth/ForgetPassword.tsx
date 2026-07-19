'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';
import { Header } from '@/components/organisms/Header';
import { TextField } from '@/components/atoms/TextField';
import { Spinner } from '@/components/atoms/Spinner';

interface ForgetPasswordProps {
  onSubmit: (email: string) => void | Promise<void>;
  error?: string;
  success?: boolean;
  loading?: boolean;
}

export const ForgetPassword: FC<ForgetPasswordProps> = ({
  onSubmit,
  error,
  success = false,
  loading = false,
}) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <Header title="Forgot Password" backHref="/" />

      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center p-6">
        <div className="border-base-content/10 bg-base-200 rounded-2xl border p-8">
          {success ? (
            <div className="flex flex-col items-center gap-4">
              <div className="bg-success/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                <FiMail className="text-success h-6 w-6" />
              </div>
              <h2 className="mt-2">Check your email</h2>
              <p className="text-base-content/50 text-center text-sm">
                We&apos;ve sent a password reset link to{' '}
                <span className="text-base-content font-medium">{email}</span>
              </p>
              <Link href="/sign-in" className="btn btn-ghost btn-sm mt-4">
                <FiArrowLeft />
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-8 flex flex-col items-center gap-2">
                <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
                  <FiMail className="text-primary h-6 w-6" />
                </div>
                <h2 className="mt-2">Forgot password?</h2>
                <p className="text-base-content/50 text-center text-sm">
                  No worries. Enter your email and we&apos;ll send you a reset
                  link.
                </p>
              </div>

              {error && (
                <div className="alert alert-error mb-6 text-sm">{error}</div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <TextField
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-primary mt-2 w-full"
                  disabled={loading}>
                  {loading ? <Spinner size="sm" /> : null}
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <Link
                href="/sign-in"
                className="text-base-content/50 mt-6 flex items-center justify-center gap-2 text-sm hover:underline">
                <FiArrowLeft />
                Back to sign in
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

ForgetPassword.displayName = 'ForgetPassword';
