'use client';

import { FC, useState } from 'react';
import type { TaxConfig } from '@/types/pos';

interface TaxConfigPanelProps {
  config: TaxConfig;
  onSave: (config: TaxConfig) => void;
}

export const TaxConfigPanel: FC<TaxConfigPanelProps> = ({ config, onSave }) => {
  const [rate, setRate] = useState(config.rate);
  const [name, setName] = useState(config.name);
  const [enabled, setEnabled] = useState(config.enabled);

  const handleSave = () => {
    onSave({ rate, name, enabled });
  };

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title text-sm">Tax Settings</h2>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="checkbox checkbox-sm"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span className="text-sm">Enable tax</span>
          </label>
          <input
            type="text"
            className="input input-bordered input-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!enabled}
            placeholder="Tax name"
          />
          <input
            type="number"
            className="input input-bordered input-sm"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            disabled={!enabled}
            min={0}
            max={100}
            step={0.1}
            placeholder="Tax rate (%)"
          />
          <button className="btn btn-primary btn-sm" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

TaxConfigPanel.displayName = 'TaxConfigPanel';
