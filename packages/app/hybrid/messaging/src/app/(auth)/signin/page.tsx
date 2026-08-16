'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import type { AuthMethod } from '@/types';

const SignInPage: FC = () => {
  const { signIn } = useData();
  const { showToast } = useToast();
  const router = useRouter();
  const [method, setMethod] = useState<AuthMethod>('phone');
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError('Enter your phone number or username');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await signIn(method, identifier.trim());
      showToast('Signed in', 'success');
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="bg-base-100 w-full max-w-sm rounded-lg p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign in</h1>

        <div className="bg-base-200 mb-4 flex rounded-full p-1">
          <button
            type="button"
            onClick={() => setMethod('phone')}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              method === 'phone' ? 'bg-base-100 shadow' : 'text-base-content/60'
            }`}>
            Phone
          </button>
          <button
            type="button"
            onClick={() => setMethod('username')}
            className={`flex-1 rounded-full py-1.5 text-sm font-medium transition-colors ${
              method === 'username'
                ? 'bg-base-100 shadow'
                : 'text-base-content/60'
            }`}>
            Username
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="identifier" className="label">
              <span className="label-text">
                {method === 'phone' ? 'Phone number' : 'Username'}
              </span>
            </label>
            <input
              id="identifier"
              type={method === 'phone' ? 'tel' : 'text'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="input input-bordered w-full"
              placeholder={
                method === 'phone' ? '+1 555 000 0000' : 'yourusername'
              }
            />
          </div>
          {error && <p className="text-error text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full">
            {submitting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        <p className="text-base-content/60 mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="link link-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
