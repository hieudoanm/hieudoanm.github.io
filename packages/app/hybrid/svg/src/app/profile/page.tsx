'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useToast } from '@/providers/ToastProvider';
import { FiArrowLeft, FiUser, FiSave } from 'react-icons/fi';

const ProfileContent: FC = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [displayName, setDisplayName] = useState('User');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  const handleSave = () => {
    addToast('Profile saved', 'success');
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <header className="border-base-300 bg-base-100 sticky top-0 z-10 flex items-center gap-3 border-b px-4 py-3">
        <button
          type="button"
          onClick={() => router.push('/')}
          className="btn btn-neutral btn-sm btn-circle">
          <FiArrowLeft className="size-4" />
        </button>
        <h1 className="text-lg font-bold">Profile</h1>
      </header>

      <div className="mx-auto max-w-2xl space-y-8 p-6">
        <section className="card bg-base-200 card-body">
          <h2 className="card-title">User Information</h2>
          <div className="flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-base-300 w-20 rounded-full">
                {avatar ? (
                  <img src={avatar} alt="Avatar" />
                ) : (
                  <FiUser className="size-8" />
                )}
              </div>
            </div>
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Avatar URL</span>
              </label>
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://example.com/avatar.png"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Display Name</span>
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="input input-bordered w-full"
            />
          </div>
        </section>

        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary w-full">
          <FiSave className="size-4" />
          Save Profile
        </button>
      </div>
    </div>
  );
};

const ProfilePage: FC = () => (
  <Providers>
    <ProfileContent />
  </Providers>
);

export default ProfilePage;
