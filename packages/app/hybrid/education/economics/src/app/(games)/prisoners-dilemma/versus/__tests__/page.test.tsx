import PrisonerDilemmaPage from '@/app/(games)/prisoners-dilemma/versus/page';
import { render, screen } from '@testing-library/react';

describe('PrisonerDilemmaPage', () => {
  it('Tool page renders inside a tool shell', () => {
    render(<PrisonerDilemmaPage />);
    expect(screen.getByText('Cooperate')).toBeInTheDocument();
  });
});
