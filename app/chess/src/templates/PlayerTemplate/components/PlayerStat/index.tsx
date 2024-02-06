'use client';

import {
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { ChessTimeClass } from '@prisma/client';
import { IconType } from 'react-icons';

export type PlayerStatProperties = {
  timeClass: ChessTimeClass;
  last: number;
  best: number;
  icon: IconType;
};

export const PlayerStat: React.FC<PlayerStatProperties> = ({
  timeClass,
  last = 0,
  best = 0,
  icon,
}) => {
  return (
    <div className="card border border-gray-200">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel className="capitalize">{timeClass}</StatLabel>
            <StatNumber>{last ?? 'N/A'}</StatNumber>
            <StatHelpText className="m-0">Best: {best ?? 'N/A'}</StatHelpText>
          </Stat>
          {icon ? (
            <div>
              <div className="rounded p-2 text-white bg-teal-500">
                <Icon as={icon} boxSize={6} />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

PlayerStat.displayName = 'PlayerStat';
