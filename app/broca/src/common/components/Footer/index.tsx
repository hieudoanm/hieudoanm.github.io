import { Container } from '@broca/common/components/Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t shadow">
      <Container>
        <div className="px-4 py-2 md:px-8 md:py-4">
          <p>&copy; {new Date().getFullYear()} 🧠 Broca</p>
        </div>
      </Container>
    </footer>
  );
};
