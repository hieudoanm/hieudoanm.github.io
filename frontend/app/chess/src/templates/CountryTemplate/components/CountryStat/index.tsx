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

export type CountryStatsProperties = {
  timeClass: ChessTimeClass;
  average: number;
  max: number;
  icon: IconType;
};

export const CountryStat: React.FC<CountryStatsProperties> = ({
  timeClass,
  average = 0,
  max = 0,
  icon,
}) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardBody>
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel>
              Average <span className="capitalize">{timeClass}</span>
            </StatLabel>
            <StatNumber>{average.toLocaleString()}</StatNumber>
            <StatHelpText>Highest: {max}</StatHelpText>
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

CountryStat.displayName = 'CountryStat';
