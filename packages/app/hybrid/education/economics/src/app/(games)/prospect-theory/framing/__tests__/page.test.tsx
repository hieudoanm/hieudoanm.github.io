import FramingPage from '@/app/(games)/prospect-theory/framing/page';
import { render, screen } from '@testing-library/react';

describe('FramingPage', () => {
  it('renders the framing game', () => {
    render(<FramingPage />);
    expect(
      screen.getByRole('heading', { name: /Framing Game/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Scenario A/)).toBeInTheDocument();
  });
});
