'use client';

import { type FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Providers } from '@/providers/Providers';
import { useData } from '@/providers/DataProvider';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { useToast } from '@/providers/ToastProvider';
import { MasterPasswordCard } from '@/components/organisms/MasterPasswordCard';
import { SecuritySettingsCard } from '@/components/organisms/SecuritySettingsCard';
import { EmergencyAccessCard } from '@/components/organisms/EmergencyAccessCard';
import { TransferCard } from '@/components/organisms/TransferCard';

const SettingsContent: FC = () => {
  const router = useRouter();
  const { settings, updateSettings, items, importItems } = useData();
  const { addToast } = useToast();
  const [theme, setTheme] = useState(settings.theme);
  const [autoLock, setAutoLock] = useState(settings.autoLockTimeout);
  const [clipClear, setClipClear] = useState(settings.clipboardClear);
  const [biometric, setBiometric] = useState(
    Boolean(settings.biometricEnabled)
  );
  const [lockOnClose, setLockOnClose] = useState(Boolean(settings.lockOnClose));

  const handleSave = async (): Promise<void> => {
    await updateSettings({
      theme,
      autoLockTimeout: autoLock,
      clipboardClear: clipClear,
      biometricEnabled: biometric,
      lockOnClose: lockOnClose,
    });
    document.documentElement.setAttribute('data-theme', theme);
    addToast('Settings saved', 'success');
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
        <h1 className="text-lg font-bold">Settings</h1>
      </header>
      <div className="mx-auto max-w-2xl space-y-6 p-6">
        <div className="card bg-base-200 card-body">
          <h2 className="card-title">Appearance</h2>
          <select
            aria-label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full">
            <option value="password-light">Password Light</option>
            <option value="password-dark">Password Dark</option>
          </select>
        </div>
        <MasterPasswordCard />
        <SecuritySettingsCard
          autoLock={autoLock}
          onAutoLockChange={setAutoLock}
          clipClear={clipClear}
          onClipClearChange={setClipClear}
          biometric={biometric}
          onBiometricChange={setBiometric}
          lockOnClose={lockOnClose}
          onLockOnCloseChange={setLockOnClose}
        />
        <EmergencyAccessCard />
        <TransferCard
          items={items}
          onImport={importItems}
          notify={(message, type) => addToast(message, type)}
        />
        <button
          type="button"
          onClick={() => void handleSave()}
          className="btn btn-primary w-full">
          <FiSave className="size-4" /> Save Settings
        </button>
      </div>
    </div>
  );
};

const SettingsPage: FC = () => (
  <Providers>
    <SettingsContent />
  </Providers>
);
export default SettingsPage;
