import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import { NativeProvider } from '../NativeProvider';

const Text: FC<{ children: ReactNode }> = ({ children }) => <p>{children}</p>;

describe('NativeProvider', () => {
  it('renders children', () => {
    render(
      <NativeProvider>
        <Text>hello native</Text>
      </NativeProvider>
    );
    expect(screen.getByText('hello native')).toBeInTheDocument();
  });
});
