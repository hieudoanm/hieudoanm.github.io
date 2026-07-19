import { render, screen } from '@testing-library/react';
import PrisonerDilemmaPage from '@/app/(games)/prisoners-dilemma/page';

describe('PrisonerDilemmaPage', () => {
  it('Tool page renders inside a tool shell', () => {
    render(<PrisonerDilemmaPage />);
    expect(screen.getByText('Cooperate')).toBeInTheDocument();
  });
});
