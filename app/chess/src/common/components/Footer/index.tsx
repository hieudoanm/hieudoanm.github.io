'use client';

import { Container } from '@chess/common/components/Container';
import { APP_NAME, YEAR } from '@chess/common/constants/app.constants';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t shadow">
      <Container>
        <div className="py-4">
          <p className="uppercase">
            &copy; {YEAR} {APP_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
};
