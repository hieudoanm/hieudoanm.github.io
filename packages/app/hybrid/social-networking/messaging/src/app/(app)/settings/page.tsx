'use client';

import { type FC } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';

const THEMES = ['messaging-light', 'messaging-dark'];

const DISAPPEARING_OPTIONS = [
  { value: 0, label: 'Off' },
  { value: 60, label: '60 seconds' },
  { value: 300, label: '5 minutes' },
  { value: 3600, label: '1 hour' },
];

const SettingsPage: FC = () => {
  const { settings, updateSettings } = useData();
  const { showToast } = useToast();

  const changeTheme = (theme: string): void => {
    document.documentElement.setAttribute('data-theme', theme);
    void updateSettings({ theme });
    showToast(`Theme set to ${theme}`, 'success');
  };

  const toggle = (
    key: 'notifications' | 'readReceipts' | 'typingIndicators'
  ): void => {
    void updateSettings({ [key]: !settings[key] });
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <Link href="/" className="btn btn-circle btn-ghost btn-sm">
            <FaArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="space-y-6">
          <section className="bg-base-100 rounded-lg p-6">
            <h2 className="mb-4 text-lg font-semibold">Appearance</h2>
            <label className="text-base-content/60 mb-2 block text-sm">
              Theme
            </label>
            <select
              value={settings.theme}
              onChange={(event) => changeTheme(event.target.value)}
              aria-label="Theme"
              className="select select-bordered w-full">
              {THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </section>

          <section className="bg-base-100 rounded-lg p-6">
            <h2 className="mb-4 text-lg font-semibold">Privacy</h2>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Read receipts</p>
                <p className="text-base-content/60 text-sm">
                  Show double ticks when messages are read.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.readReceipts}
                onChange={() => toggle('readReceipts')}
                aria-label="Read receipts"
                className="toggle toggle-primary"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Typing indicators</p>
                <p className="text-base-content/60 text-sm">
                  Show when contacts are typing.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.typingIndicators}
                onChange={() => toggle('typingIndicators')}
                aria-label="Typing indicators"
                className="toggle toggle-primary"
              />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Notifications</p>
                <p className="text-base-content/60 text-sm">
                  Receive alerts for new messages.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={() => toggle('notifications')}
                aria-label="Notifications"
                className="toggle toggle-primary"
              />
            </div>
          </section>

          <section className="bg-base-100 rounded-lg p-6">
            <h2 className="mb-4 text-lg font-semibold">
              Disappearing messages
            </h2>
            <label className="text-base-content/60 mb-2 block text-sm">
              New chats default
            </label>
            <select
              value={settings.disappearingSeconds}
              onChange={(event) => {
                void updateSettings({
                  disappearingSeconds: parseInt(event.target.value, 10),
                });
              }}
              aria-label="Disappearing messages"
              className="select select-bordered w-full">
              {DISAPPEARING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
