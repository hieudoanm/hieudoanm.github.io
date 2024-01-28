import { Heading } from '@chakra-ui/react';
import flags from '@chess/common/json/flags.json';

export const CountryHeader: React.FC<{ countryCode: string }> = ({
  countryCode,
}) => {
  return (
    <Heading style={{ wordSpacing: '16px' }}>
      {(flags as Record<string, string>)[countryCode]} {countryCode}
    </Heading>
  );
};
