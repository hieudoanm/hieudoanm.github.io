import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import ThroughTheYearsPage from '../page';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => children;

describe('ThroughTheYearsPage', () => {
  it('renders inside a tool shell', () => {
    render(
      <Wrapper>
        <ThroughTheYearsPage />
      </Wrapper>
    );
    expect(
      screen.getByRole('heading', { name: 'Through the Years' })
    ).toBeInTheDocument();
  });
});
