'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';

export default function RegisterPage() {
  const { login } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <AuthTemplate>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Create Account</h2>
          <p className="text-base-content/60">Start managing your finances</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="floating-label">
              <span>Full Name</span>
              <div className="relative">
                <FiUser className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="input input-bordered w-full pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="floating-label">
              <span>Email</span>
              <div className="relative">
                <FiMail className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="floating-label">
              <span>Password</span>
              <div className="relative">
                <FiLock className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </label>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-sm mt-1"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                required
              />
              <span className="text-sm">
                I agree to the{' '}
                <Link
                  href="/terms-of-service"
                  className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!agreed}>
              Create Account
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthTemplate>
  );
}
