'use client';

import { FC } from 'react';
import Link from 'next/link';
import { ThemePicker } from '@/components/molecules';
import { useTheme } from '@/hooks/useTheme';
import {
  FiMoon,
  FiSun,
  FiBell,
  FiLock,
  FiGlobe,
  FiHelpCircle,
  FiFileText,
  FiShield,
} from 'react-icons/fi';

const SettingsSection: FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
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
    </>
  );
};

export default SettingsSection;
