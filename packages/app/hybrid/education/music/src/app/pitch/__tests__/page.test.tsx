import { render, screen } from '@testing-library/react';
import PitchPage from '@/app/pitch/page';

describe('PitchPage', () => {
  it('Tool page renders inside a tool shell', () => {
    render(<PitchPage />);
    expect(screen.getByText(/Level/)).toBeInTheDocument();
  });
});
