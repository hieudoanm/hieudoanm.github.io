import { Container } from '@chess/components/atoms/Container';

export type ErrorTemplateProperties = {
  status: number;
  message: string;
};

export const ErrorTemplate: React.FC<ErrorTemplateProperties> = ({
  status = 500,
  message = 'Error',
}) => {
  return (
    <Container>
      <div className="py-4 md:py-8">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="text-9xl font-bold">{status}</div>
            <div className="text-3xl uppercase">{message}</div>
          </div>
        </div>
      </div>
    </Container>
  );
};
