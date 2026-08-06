'use client';

import { ResetPasswordTemplate } from '@/components/templates/auth';
import { useState } from 'react';

const ResetPasswordPage = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (password: string) => {
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    if (!password) {
      setError('Please enter a password');
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <ResetPasswordTemplate
      onSubmit={handleSubmit}
      error={error}
      success={success}
      loading={loading}
    />
  );
};

export default ResetPasswordPage;
