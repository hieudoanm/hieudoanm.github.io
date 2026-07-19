import { render, screen } from '@testing-library/react';
import QuickActions from '../QuickActions';

describe('QuickActions', () => {
  it('renders all action buttons', () => {
    render(<QuickActions />);
    expect(screen.getByText('Transfer')).toBeInTheDocument();
    expect(screen.getByText('Pay')).toBeInTheDocument();
    expect(screen.getByText('Cards')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
  });

  it('links to correct routes', () => {
    render(<QuickActions />);
    expect(screen.getByText('Transfer').closest('a')).toHaveAttribute(
      'href',
      '/transfer'
    );
    expect(screen.getByText('Pay').closest('a')).toHaveAttribute(
      'href',
      '/pay'
    );
    expect(screen.getByText('Cards').closest('a')).toHaveAttribute(
      'href',
      '/cards'
    );
    expect(screen.getByText('Budget').closest('a')).toHaveAttribute(
      'href',
      '/budget'
    );
  });
});
