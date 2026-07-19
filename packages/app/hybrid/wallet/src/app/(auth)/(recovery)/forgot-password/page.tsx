'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const { forgotPassword } = useData();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  console.log('[ForgotPasswordPage] render', { sent });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[ForgotPasswordPage] submit', { email });
    const success = await forgotPassword(email);
    if (success) {
      setSent(true);
      showToast('Reset link sent to your email', 'success');
    } else {
      showToast('Email not found', 'error');
    }
  };

  if (sent) {
    return (
      <AuthTemplate>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center gap-4 text-center">
            <FiCheckCircle className="text-success text-5xl" />
            <h2 className="card-title text-2xl">Check Your Email</h2>
            <p className="text-base-content/60">
              We&apos;ve sent a password reset link to{' '}
              <span className="text-base-content font-medium">{email}</span>
            </p>
            <p className="text-base-content/60 text-sm">
              Didn&apos;t receive the email? Check your spam folder or try
              again.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/reset-password" className="btn btn-primary w-full">
                Reset Password
              </Link>
              <Link href="/login" className="btn btn-neutral w-full gap-2">
                <FiArrowLeft /> Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Forgot Password</h2>
          <p className="text-base-content/60">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="floating-label">
              <span>Email</span>
              <div className="relative w-full">
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

            <button type="submit" className="btn btn-primary w-full">
              Send Reset Link
            </button>
          </form>

          <Link
            href="/login"
            className="text-primary flex items-center justify-center gap-2 text-sm hover:underline">
            <FiArrowLeft /> Back to Sign In
          </Link>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default ForgotPasswordPage;
