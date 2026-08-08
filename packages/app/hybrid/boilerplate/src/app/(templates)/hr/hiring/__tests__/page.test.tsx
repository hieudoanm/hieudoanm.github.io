import { render, screen } from '@testing-library/react';
import HiringPipelinePage from '@/app/(templates)/hr/hiring/page';

describe('HiringPipelinePage', () => {
  it('renders the HiringPipelinePage', () => {
    render(<HiringPipelinePage />);
    expect(screen.getByText('6 candidates')).toBeInTheDocument();
  });
});
