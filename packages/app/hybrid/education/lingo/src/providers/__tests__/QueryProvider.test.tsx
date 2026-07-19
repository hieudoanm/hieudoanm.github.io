import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { QueryProvider } from '../QueryProvider';

const Text: FC<{ children: ReactNode }> = ({ children }) => <p>{children}</p>;

describe('QueryProvider', () => {
  it('renders children', () => {
    render(
      <QueryProvider>
        <Text>hello query</Text>
      </QueryProvider>
    );
    expect(screen.getByText('hello query')).toBeInTheDocument();
  });
});
