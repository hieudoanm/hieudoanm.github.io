import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import MythVsFactPage from '../page';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => children;

describe('MythVsFactPage', () => {
  it('renders inside a tool shell', () => {
    render(
      <Wrapper>
        <MythVsFactPage />
      </Wrapper>
    );
    expect(screen.getByText('Myth')).toBeInTheDocument();
    expect(screen.getByText('Fact')).toBeInTheDocument();
  });
});
