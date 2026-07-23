'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardTemplate } from '@/components/templates';
import { UserCard } from '@/components/atoms';
import { ThemePicker } from '@/components/molecules';
import { useTheme } from '@/hooks/useTheme';
import { useData } from '@/providers/DataProvider';
import {
  FiMoon,
  FiSun,
  FiBell,
  FiLock,
  FiGlobe,
  FiHelpCircle,
  FiFileText,
  FiShield,
  FiSave,
} from 'react-icons/fi';

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Japan',
  'Australia',
  'Brazil',
  'India',
  'Singapore',
  'South Korea',
  'Netherlands',
  'Switzerland',
  'Sweden',
  'Norway',
  'Mexico',
  'Italy',
  'Spain',
  'China',
  'New Zealand',
];

const timezones = [
  'America/New_York (EST)',
  'America/Chicago (CST)',
  'America/Denver (MST)',
  'America/Los_Angeles (PST)',
  'Europe/London (GMT)',
  'Europe/Paris (CET)',
  'Europe/Berlin (CET)',
  'Asia/Tokyo (JST)',
  'Asia/Shanghai (CST)',
  'Asia/Kolkata (IST)',
  'Asia/Singapore (SGT)',
  'Asia/Seoul (KST)',
  'Australia/Sydney (AEST)',
  'Pacific/Auckland (NZST)',
  'America/Sao_Paulo (BRT)',
  'America/Toronto (EST)',
  'Asia/Dubai (GST)',
  'Asia/Hong_Kong (HKT)',
  'Africa/Cairo (EET)',
  'Asia/Bangkok (ICT)',
];

export default function ProfilePage() {
  const { isDark, toggleTheme } = useTheme();
  const { user, updateUser, logout, loading } = useData();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setPhone(user.phone);
      setEmail(user.email);
      setCountry(user.country);
      setTimezone(user.timezone);
    }
  }, [user]);

  if (loading || !user) {
    return (
      <DashboardTemplate>
        <div className="flex h-full items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </DashboardTemplate>
    );
  }

  const hasChanges =
    phone !== user.phone ||
    email !== user.email ||
    country !== user.country ||
    timezone !== user.timezone;

  const handleSave = async () => {
    await updateUser({ ...user, phone, email, country, timezone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-base-content/60">Manage your account</p>
        </div>

        <UserCard user={user} />

        <div className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title text-lg">Personal Information</h2>
            <p className="text-base-content/60 text-sm">
              Update your contact details and preferences
            </p>

            <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="floating-label">
                <span>Phone Number</span>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>

              <label className="floating-label">
                <span>Email Address</span>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <label className="floating-label">
                <span>Country</span>
                <select
                  className="select select-bordered w-full"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}>
                  {countries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="floating-label">
                <span>Timezone</span>
                <select
                  className="select select-bordered w-full"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}>
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                className="btn btn-primary btn-sm gap-2"
                disabled={!hasChanges}
                onClick={handleSave}>
                <FiSave /> Save Changes
              </button>
              {saved && (
                <span className="text-success text-sm font-medium">
                  Changes saved successfully!
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-md">
          <div className="card-body divide-base-300 gap-0 divide-y">
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {isDark ? <FiMoon /> : <FiSun />}
                <span>Dark Mode</span>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={isDark}
                onChange={toggleTheme}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiBell />
                <span>Push Notifications</span>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiLock />
                <span>Biometric Login</span>
              </div>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                defaultChecked
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiGlobe />
                <span>Language</span>
              </div>
              <span className="text-base-content/60">English ▾</span>
            </div>
          </div>
        </div>

        <ThemePicker />

        <div className="card bg-base-200 shadow-md">
          <div className="card-body divide-base-300 gap-0 divide-y">
            <Link
              href="/help-support"
              className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiHelpCircle />
                <span>Help & Support</span>
              </div>
              <span className="text-base-content/60">›</span>
            </Link>

            <Link
              href="/terms-of-service"
              className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiFileText />
                <span>Terms of Service</span>
              </div>
              <span className="text-base-content/60">›</span>
            </Link>

            <Link
              href="/privacy-policy"
              className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiShield />
                <span>Privacy Policy</span>
              </div>
              <span className="text-base-content/60">›</span>
            </Link>
          </div>
        </div>

        <button className="btn btn-error w-full" onClick={logout}>
          Sign Out
        </button>
      </div>
    </DashboardTemplate>
  );
}
