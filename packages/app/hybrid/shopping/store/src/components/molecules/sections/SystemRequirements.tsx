'use client';

import { getSystemRequirements } from '@/lib/requirements';
import { PLATFORM_LABELS } from '@/lib/os';
import type { AppData } from '@/lib/downloads';
import type { FC } from 'react';

interface SystemRequirementsProps {
  app: AppData;
}

export const SystemRequirements: FC<SystemRequirementsProps> = ({ app }) => {
  const requirements = getSystemRequirements(app);

  return (
    <div className="border-base-300 mb-8 border-t pt-6">
      <h2 className="text-base-content/70 mb-3 font-mono text-xs tracking-widest uppercase">
        System Requirements
      </h2>
      <div className="overflow-x-auto">
        <table className="table text-sm">
          <thead>
            <tr>
              <th>Platform</th>
              <th>OS</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Disk</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map((r) => (
              <tr key={r.platform}>
                <td>{PLATFORM_LABELS[r.platform]}</td>
                <td>{r.os}</td>
                <td>{r.cpu}</td>
                <td>{r.memory}</td>
                <td>{r.disk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

SystemRequirements.displayName = 'SystemRequirements';
