'use client';

import { SignInTemplate } from '@/components/templates/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    if (email === 'demo@example.com' && password === 'password') {
      router.push('/');
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <SignInTemplate onSubmit={handleSubmit} error={error} loading={loading} />
  );
};

export default SignInPage;
