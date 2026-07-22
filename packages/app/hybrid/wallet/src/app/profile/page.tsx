'use client';

import { DashboardTemplate } from '@/components/templates';
import { UserCard } from '@/components/atoms';
import { ThemePicker } from '@/components/molecules';
import { useTheme } from '@/hooks/useTheme';
import { user } from '@/data/mock';
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

export default function ProfilePage() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <DashboardTemplate>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-base-content/60">Manage your account</p>
        </div>

        <UserCard user={user} />

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
            <button className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiHelpCircle />
                <span>Help & Support</span>
              </div>
              <span className="text-base-content/60">›</span>
            </button>

            <button className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiFileText />
                <span>Terms of Service</span>
              </div>
              <span className="text-base-content/60">›</span>
            </button>

            <button className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <FiShield />
                <span>Privacy Policy</span>
              </div>
              <span className="text-base-content/60">›</span>
            </button>
          </div>
        </div>

        <button className="btn btn-error btn-outline w-full">Sign Out</button>
      </div>
    </DashboardTemplate>
  );
}
