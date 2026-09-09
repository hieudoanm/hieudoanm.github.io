import { render, screen } from '@testing-library/react';
import MusicPage from '@/app/(games)/music/page';

describe('MusicPage', () => {
  it('Tool page renders inside a tool shell', () => {
    render(<MusicPage />);
    expect(screen.getByText(/Level/)).toBeInTheDocument();
  });
});
