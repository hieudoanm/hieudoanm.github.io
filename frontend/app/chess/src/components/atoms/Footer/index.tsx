import { Text } from '@chakra-ui/react';
import { APP_NAME, YEAR } from '@chess/common/constants';
import { Container } from '@chess/components/atoms/Container';

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
