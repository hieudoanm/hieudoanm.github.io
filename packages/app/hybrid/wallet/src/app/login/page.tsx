'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthTemplate } from '@/components/templates';
import { FiMail, FiLock } from 'react-icons/fi';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/');
  };

  return (
    <AuthTemplate>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Welcome Back</h2>
          <p className="text-base-content/60">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox checkbox-sm" />
                <span className="text-sm">Remember me</span>
              </label>
              <Link href="#" className="text-primary text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="divider">OR</div>

          <div className="flex flex-col gap-2">
            <button className="btn btn-outline w-full">
              Continue with Google
            </button>
            <button className="btn btn-outline w-full">
              Continue with Apple
            </button>
          </div>

          <p className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </AuthTemplate>
  );
}
