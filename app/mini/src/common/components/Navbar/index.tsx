'use client';

import { Text } from '@chakra-ui/react';
import { Container } from '@mini/common/components/Container';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-4 md:px-8 py-2 md:py-4">
          <Text className="uppercase">Mini</Text>
        </div>
      </Container>
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
