'use client';

import { SignUpTemplate } from '@/components/templates/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError('');

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));

    if (email === 'existing@example.com') {
      setError('An account with this email already exists');
      setLoading(false);
    } else {
      router.push('/sign-in');
    }
  };

  return (
    <SignUpTemplate onSubmit={handleSubmit} error={error} loading={loading} />
  );
};

export default SignUpPage;
