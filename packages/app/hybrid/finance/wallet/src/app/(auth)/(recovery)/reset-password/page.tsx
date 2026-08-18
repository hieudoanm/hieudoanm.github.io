'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthTemplate } from '@/components/templates';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import {
  FiLock,
  FiArrowLeft,
  FiCheckCircle,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';

const ResetPasswordPage = () => {
  const { resetPassword } = useData();
  const { showToast } = useToast();
  const router = useRouter();
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log('[ResetPasswordPage] render', { success });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('Password must be at least 6 characters', 'error');
      return;
    }

    console.log('[ResetPasswordPage] submit', { token });
    const result = await resetPassword(token, password);
    if (result) {
      setSuccess(true);
      showToast('Password reset successfully!', 'success');
    } else {
      showToast('Invalid or expired reset token', 'error');
    }
  };

  if (success) {
    return (
      <AuthTemplate>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body items-center gap-4 text-center">
            <FiCheckCircle className="text-success text-5xl" />
            <h2 className="card-title text-2xl">Password Reset!</h2>
            <p className="text-base-content/60">
              Your password has been successfully reset.
            </p>
            <button
              className="btn btn-primary mt-4 w-full"
              onClick={() => router.push('/login')}>
              Sign In with New Password
            </button>
          </div>
        </div>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body gap-4">
          <h2 className="card-title text-2xl">Reset Password</h2>
          <p className="text-base-content/60">
            Enter your reset token and new password below.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="floating-label">
              <span>Reset Token</span>
              <input
                type="text"
                placeholder="Enter reset token from email"
                className="input input-bordered w-full"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
              />
            </label>

            <label className="floating-label">
              <span>New Password</span>
              <div className="relative w-full">
                <FiLock className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  className="input input-bordered w-full pr-10 pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="text-base-content/40 absolute top-1/2 right-3 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </label>

            <label className="floating-label">
              <span>Confirm Password</span>
              <div className="relative w-full">
                <FiLock className="text-base-content/40 absolute top-1/2 left-3 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="input input-bordered w-full pl-10"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </label>

            <button type="submit" className="btn btn-primary w-full">
              Reset Password
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

export default ResetPasswordPage;
