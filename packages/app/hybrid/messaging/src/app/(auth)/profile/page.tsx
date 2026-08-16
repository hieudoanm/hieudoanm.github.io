'use client';

import { type FC, useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaCommentDots, FaUserFriends } from 'react-icons/fa';
import { useData } from '@/providers/DataProvider';
import { Avatar } from '@/components/atoms/Avatar';
import { formatLastSeen } from '@/lib/format';

const ProfilePage: FC = () => {
  const { account, contacts, chats, messages, updateAccount } = useData();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(account?.name ?? '');

  const saveName = (): void => {
    void updateAccount({ name: name.trim() || 'You' });
    setEditing(false);
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="btn btn-circle btn-ghost btn-sm">
            <FaArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>

        <div className="space-y-6">
          <section className="bg-base-100 rounded-lg p-6">
            <h2 className="mb-4 text-lg font-semibold">Account</h2>
            <div className="flex items-center gap-4">
              <Avatar
                name={account?.name ?? 'You'}
                color={account?.avatarColor ?? '#ff0030'}
                online={account?.online}
                size="xl"
              />
              <div className="min-w-0 flex-1">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      aria-label="Display name"
                      className="input input-bordered input-sm"
                    />
                    <button
                      type="button"
                      onClick={saveName}
                      className="btn btn-primary btn-sm">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="btn btn-ghost btn-sm">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">{account?.name}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setName(account?.name ?? '');
                        setEditing(true);
                      }}
                      className="btn btn-ghost btn-xs">
                      Edit
                    </button>
                  </div>
                )}
                <p className="text-base-content/60 text-sm">
                  @{account?.username} · {account?.phone}
                </p>
                <p className="text-base-content/40 text-xs">
                  {formatLastSeen(
                    account?.online ?? false,
                    account?.lastSeenAt ?? 0
                  )}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-base-100 rounded-lg p-6">
            <h2 className="mb-4 text-lg font-semibold">Statistics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-base-200 rounded-lg p-4 text-center">
                <FaCommentDots className="text-primary mx-auto mb-2 h-6 w-6" />
                <p className="text-2xl font-bold">{chats.length}</p>
                <p className="text-base-content/60 text-xs">Chats</p>
              </div>
              <div className="bg-base-200 rounded-lg p-4 text-center">
                <FaCommentDots className="text-secondary mx-auto mb-2 h-6 w-6" />
                <p className="text-2xl font-bold">{messages.length}</p>
                <p className="text-base-content/60 text-xs">Messages</p>
              </div>
              <div className="bg-base-200 rounded-lg p-4 text-center">
                <FaUserFriends className="text-info mx-auto mb-2 h-6 w-6" />
                <p className="text-2xl font-bold">{contacts.length}</p>
                <p className="text-base-content/60 text-xs">Contacts</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
