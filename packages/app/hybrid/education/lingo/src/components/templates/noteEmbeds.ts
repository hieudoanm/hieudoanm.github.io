import type { FC } from 'react';

import { PayoffMatrix } from '@/components/molecules/PayoffMatrix';

const EMBEDS: Record<string, FC> = {
  PayoffMatrix,
};

export const resolveEmbed = (name: string): FC => {
  const embed = EMBEDS[name];

  if (!embed) {
    const known = Object.keys(EMBEDS).join(', ') || 'none';

    throw new Error(`note: unknown embed "${name}", expected one of: ${known}`);
  }

  return embed;
};
