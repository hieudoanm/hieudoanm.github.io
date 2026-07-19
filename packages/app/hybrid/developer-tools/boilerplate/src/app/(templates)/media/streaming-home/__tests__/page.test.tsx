import { render, screen } from '@testing-library/react';
import HomePage from '@/app/(templates)/media/streaming-home/page';

describe('HomePage', () => {
  it('renders the streaming home page', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: 'Streaming' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 featured titles')).toBeInTheDocument();
  });
});
