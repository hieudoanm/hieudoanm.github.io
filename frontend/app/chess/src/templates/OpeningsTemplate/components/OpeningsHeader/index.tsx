import { Heading } from '@chakra-ui/react';

export type OpeningsHeaderProperties = {
  total: number;
};

export const OpeningsHeader: React.FC<OpeningsHeaderProperties> = ({
  total = 0,
}) => {
  return <Heading>Openings ({total})</Heading>;
};
