import { Container } from '@broca/common/components/Container';
import { Footer } from '@broca/common/components/Footer';
import { Navbar } from '@broca/common/components/Navbar';
import { ReactNode } from 'react';

export type LayoutTemplateProperties = {
  children?: ReactNode;
};

export const LayoutTemplate: React.FC<LayoutTemplateProperties> = ({
  children = <></>,
}) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="grow">
        <div className="p-4 md:p-8">
          <Container>{children}</Container>
        </div>
      </div>
      <Footer />
    </div>
  );
};
