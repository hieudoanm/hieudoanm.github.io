'use client';

import {
  Box,
  Card,
  CardBody,
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
    <Card className="border border-gray-200">
      <CardBody>
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel className="capitalize">{timeClass}</StatLabel>
            <StatNumber>{last ?? 'N/A'}</StatNumber>
            <StatHelpText className="m-0">Best: {best ?? 'N/A'}</StatHelpText>
          </Stat>
          {icon ? (
            <div>
              <Box bgColor={'teal.500'} color={'white'} className="rounded p-2">
                <Icon as={icon} boxSize={6} />
              </Box>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

PlayerStat.displayName = 'PlayerStat';
