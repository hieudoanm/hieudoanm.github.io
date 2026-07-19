import { render, screen } from '@testing-library/react';
import ComparePage from '@/app/(templates)/store/compare/page';

describe('ComparePage', () => {
  it('renders the compare page', () => {
    render(<ComparePage />);
    expect(screen.getByText('Compare (3)')).toBeInTheDocument();
  });
});
