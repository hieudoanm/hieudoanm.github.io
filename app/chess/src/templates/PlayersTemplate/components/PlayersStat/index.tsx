'use client';

import {
  Icon,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

export const PlayersStat: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: IconType;
}> = ({ title = '', average = 0, max = 0, icon }) => {
  return (
    <div className="card border border-gray-200 shadow">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel>Average {title}</StatLabel>
            <StatNumber>{average}</StatNumber>
            <StatHelpText>Highest: {max}</StatHelpText>
          </Stat>{' '}
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

PlayersStat.displayName = 'PlayersStat';
