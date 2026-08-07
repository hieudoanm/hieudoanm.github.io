'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { AtomsLevel } from './levels/AtomsLevel';
import { MoleculesLevel } from './levels/MoleculesLevel';
import { OrganismsLevel } from './levels/OrganismsLevel';
import { TemplatesLevel } from './levels/TemplatesLevel';

const LEVELS = ['Atoms', 'Molecules', 'Organisms', 'Templates'] as const;

type Level = (typeof LEVELS)[number];

const levelClass: Record<Level, string> = {
  Atoms: 'animate-atomic-in',
  Molecules: 'animate-atomic-in',
  Organisms: 'animate-atomic-in',
  Templates: 'animate-atomic-in',
};

export const AtomicDemo: FC = () => {
  const [level, setLevel] = useState<Level>('Atoms');

  return (
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl">Component Library</h2>
          <p className="text-base-content/50 text-sm">
            Four atomic-design levels — {LEVELS.length} tiers, click to
            re-arrange
          </p>
        </div>
        <div
          role="tablist"
          aria-label="Component levels"
          className="tabs tabs-box">
          {LEVELS.map((item) => (
            <button
              key={item}
              role="tab"
              aria-selected={level === item}
              className={`tab ${level === item ? 'tab-active' : ''}`}
              onClick={() => setLevel(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div key={level} className={levelClass[level]}>
        {level === 'Atoms' && <AtomsLevel />}
        {level === 'Molecules' && <MoleculesLevel />}
        {level === 'Organisms' && <OrganismsLevel />}
        {level === 'Templates' && <TemplatesLevel />}
      </div>
    </div>
  );
};

AtomicDemo.displayName = 'AtomicDemo';
