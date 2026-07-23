'use client';

import { FC, useState, useEffect } from 'react';
import { useData } from '@/providers/DataProvider';
import { useToast } from '@/providers/ToastProvider';
import { FiSave } from 'react-icons/fi';

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

const ProfileForm: FC = () => {
  const { user, updateUser, currencyRates } = useData();
  const { showToast } = useToast();
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [currency, setCurrency] = useState('');

  useEffect(() => {
    if (user) {
      setPhone(user.phone);
      setEmail(user.email);
      setCountry(user.country);
      setTimezone(user.timezone);
      setCurrency(user.currency);
    }
  }, [user]);

  if (!user) return null;

  const hasChanges =
    phone !== user.phone ||
    email !== user.email ||
    country !== user.country ||
    timezone !== user.timezone ||
    currency !== user.currency;

  const handleSave = async () => {
    await updateUser({ ...user, phone, email, country, timezone, currency });
    showToast('Changes saved successfully!', 'success');
  };

  return (
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

          <label className="floating-label">
            <span>Default Currency</span>
            <select
              className="select select-bordered w-full"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}>
              {currencyRates.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.code} — {r.name} ({r.symbol})
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
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
