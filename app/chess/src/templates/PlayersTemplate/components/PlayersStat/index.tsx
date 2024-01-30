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
import { IconType } from 'react-icons';

export const PlayersStat: React.FC<{
  title: string;
  average: number;
  max: number;
  icon: IconType;
}> = ({ title = '', average = 0, max = 0, icon }) => {
  return (
    <Card className="border border-gray-200 shadow">
      <CardBody>
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel>Average {title}</StatLabel>
            <StatNumber>{average}</StatNumber>
            <StatHelpText>Highest: {max}</StatHelpText>
          </Stat>{' '}
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

PlayersStat.displayName = 'PlayersStat';
