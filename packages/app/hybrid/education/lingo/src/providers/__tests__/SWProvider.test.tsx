import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { SWProvider } from '../SWProvider';

const Text: FC<{ children: ReactNode }> = ({ children }) => <p>{children}</p>;

describe('SWProvider', () => {
  it('renders children', () => {
    render(
      <SWProvider>
        <Text>hello sw</Text>
      </SWProvider>
    );
    expect(screen.getByText('hello sw')).toBeInTheDocument();
  });
});
