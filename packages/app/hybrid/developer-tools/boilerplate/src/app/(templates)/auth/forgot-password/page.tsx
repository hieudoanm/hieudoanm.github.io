'use client';

import { PasswordResetTemplate } from '@/components/templates/auth';
import { useState } from 'react';

const ForgotPasswordPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (email: string) => {
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    if (!email) {
      setError('Please enter your email');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <PasswordResetTemplate
      mode="request"
      onSubmit={handleSubmit}
      error={error}
      success={success}
      loading={loading}
    />
  );
};

export default ForgotPasswordPage;
