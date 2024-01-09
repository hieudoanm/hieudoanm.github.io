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

export const ChessStats: React.FC<{
  label: string;
  last: number;
  best: number;
  icon: any;
}> = ({ label = '', last = 0, best = 0, icon }) => {
  return (
    <Card className="border border-gray-200">
      <CardBody>
        <div className="flex items-center justify-between">
          <Stat>
            <StatLabel>{label}</StatLabel>
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
