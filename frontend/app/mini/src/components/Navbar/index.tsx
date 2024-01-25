'use client';

import { Text } from '@chakra-ui/react';
import { Container } from '@mini/components/Container';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <Container>
        <div className="px-8 py-4">
          <Text className="uppercase">Mini</Text>
        </div>
      </Container>
    </nav>
  );
};

Navbar.displayName = 'Navbar';

export default Navbar;
