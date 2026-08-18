'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const SignUpPage: FC = () => {
  const { signUp } = useData();
  const { showToast } = useToast();
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !username.trim()) {
      setError('All fields are required');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await signUp(name.trim(), phone.trim(), username.trim());
      showToast('Account created', 'success');
      router.replace('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-up failed');
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-base-200 flex min-h-screen items-center justify-center">
      <div className="bg-base-100 w-full max-w-sm rounded-lg p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Create account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="label">
              <span className="label-text">Phone number</span>
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full"
              placeholder="+1 555 000 0000"
            />
          </div>
          <div>
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered w-full"
              placeholder="yourusername"
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
              'Create Account'
            )}
          </button>
        </form>
        <p className="text-base-content/60 mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/signin" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
