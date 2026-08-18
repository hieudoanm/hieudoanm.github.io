'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthTemplate } from '@/components/templates/AuthTemplate';
import { useData } from '@/providers/DataProvider';

const RegisterPage: FC = () => {
  const router = useRouter();
  const { login } = useData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      router.push('/');
    }
  };

  return (
    <AuthTemplate>
      <div className="rounded-box border-base-300 bg-base-200 border p-6">
        <h1 className="mb-6 text-center text-2xl font-bold">Dang Ky</h1>
        <div className="space-y-4">
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Ho ten</span>
            </label>
            <input
              type="text"
              className="input input-sm input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Email</span>
            </label>
            <input
              type="email"
              className="input input-sm input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label mb-1 p-0">
              <span className="label-text text-xs">Mat khau</span>
            </label>
            <input
              type="password"
              className="input input-sm input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary btn-sm w-full"
            onClick={handleRegister}
            disabled={loading}>
            {loading ? 'Dang xu ly...' : 'Dang ky'}
          </button>
        </div>
      </div>
    </AuthTemplate>
  );
};

export default RegisterPage;
