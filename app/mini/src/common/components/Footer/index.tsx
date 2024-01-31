import Container from '../Container';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t shadow">
      <Container>
        <div className="px-4 md:px-8 py-2 md:py-4">
          <p className="uppercase">Mini</p>
        </div>
      </Container>
    </footer>
  );
};
