'use client';

import { motion } from 'motion/react';
import type { FC } from 'react';
import { useState } from 'react';
import { ATOMS_COUNT, AtomsLevel } from './levels/AtomsLevel';
import { MOLECULES_COUNT, MoleculesLevel } from './levels/MoleculesLevel';
import { ORGANISMS_COUNT, OrganismsLevel } from './levels/OrganismsLevel';
import { TEMPLATE_COUNT, TemplatesLevel } from './levels/TemplatesLevel';

const LEVELS = ['Atoms', 'Molecules', 'Organisms', 'Templates'] as const;

type Level = (typeof LEVELS)[number];

const LEVEL_COUNTS: Record<Level, number> = {
  Atoms: ATOMS_COUNT,
  Molecules: MOLECULES_COUNT,
  Organisms: ORGANISMS_COUNT,
  Templates: TEMPLATE_COUNT,
};

const totalCount = LEVELS.reduce((sum, level) => sum + LEVEL_COUNTS[level], 0);

export const Atomic: FC = () => {
  const [level, setLevel] = useState<Level>('Atoms');

  return (
    <div className="flex w-full flex-col gap-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl">Component Library</h2>
          <p className="text-base-content/50 text-sm">
            Four atomic-design levels — {LEVELS.length} tiers, {totalCount}{' '}
            components, click to re-arrange
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
              <span
                aria-hidden="true"
                className="badge badge-ghost badge-sm ml-1">
                {LEVEL_COUNTS[item]}
              </span>
            </button>
          ))}
        </div>
      </div>

      <motion.div
        key={level}
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}>
        {level === 'Atoms' && <AtomsLevel />}
        {level === 'Molecules' && <MoleculesLevel />}
        {level === 'Organisms' && <OrganismsLevel />}
        {level === 'Templates' && <TemplatesLevel />}
      </motion.div>
    </div>
  );
};

Atomic.displayName = 'Atomic';
