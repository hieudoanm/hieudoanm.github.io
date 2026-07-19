import { render, screen } from '@testing-library/react';
import ComingSoonPage from '../page';

describe('ComingSoonPage', () => {
  it('renders coming soon content', () => {
    render(<ComingSoonPage />);
    expect(screen.getByText(/coming soon/i)).toBeInTheDocument();
  });
});
