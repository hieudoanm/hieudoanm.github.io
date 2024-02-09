import { APP_NAME } from '@sunil/common/constants/app.constants';
import { Container } from '../Container';

export const Footer: React.FC = () => {
  const year: number = new Date().getFullYear();

  return (
    <footer className="border-t shadow">
      <Container>
        <div className="px-4 md:px-8 py-2 md:py-4">
          <p className="uppercase">
            &copy; {year} {APP_NAME}
          </p>
        </div>
      </Container>
    </footer>
  );
};
