import { render, screen } from '@testing-library/react';
import { FC, ReactNode } from 'react';
import PrisonerDilemmaPage from '@/app/(games)/prisoners-dilemma/page';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => children;

describe('Tool pages', () => {
  it('Tool page renders inside a tool shell', () => {
    render(
      <Wrapper>
        <PrisonerDilemmaPage />
      </Wrapper>
    );
    expect(screen.getByText('Cooperate')).toBeInTheDocument();
  });
});
