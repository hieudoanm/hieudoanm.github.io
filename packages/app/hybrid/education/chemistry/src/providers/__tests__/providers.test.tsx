import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { NativeProvider } from '../NativeProvider';
import { QueryProvider } from '../QueryProvider';
import { SWProvider } from '../SWProvider';

const Text: FC<{ children: ReactNode }> = ({ children }) => <p>{children}</p>;

describe('Providers', () => {
  it('SWProvider renders children', () => {
    render(
      <SWProvider>
        <Text>hello sw</Text>
      </SWProvider>
    );
    expect(screen.getByText('hello sw')).toBeInTheDocument();
  });

  it('NativeProvider renders children', () => {
    render(
      <NativeProvider>
        <Text>hello native</Text>
      </NativeProvider>
    );
    expect(screen.getByText('hello native')).toBeInTheDocument();
  });

  it('QueryProvider renders children', () => {
    render(
      <QueryProvider>
        <Text>hello query</Text>
      </QueryProvider>
    );
    expect(screen.getByText('hello query')).toBeInTheDocument();
  });
});
