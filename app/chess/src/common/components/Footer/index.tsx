'use client';

import { Text } from '@chakra-ui/react';
import { Container } from '@chess/common/components/Container';
import { APP_NAME, YEAR } from '@chess/common/constants/app.constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t shadow">
      <Container>
        <div className="py-4">
          <Text textTransform={'uppercase'}>
            &copy; {YEAR} {APP_NAME}
          </Text>
        </div>
      </Container>
    </footer>
  );
};
