import { render, screen } from '@testing-library/react';
import PackingPage from '@/app/(templates)/travel/packing/page';

describe('PackingPage', () => {
  it('renders the packing list page', () => {
    render(<PackingPage />);
    expect(screen.getByText('6 items')).toBeInTheDocument();
  });
});
