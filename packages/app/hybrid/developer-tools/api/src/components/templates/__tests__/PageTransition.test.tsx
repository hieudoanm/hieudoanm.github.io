import { render, screen } from '@testing-library/react';
import { PageTransition } from '@/components/templates/PageTransition';

describe('PageTransition', () => {
  it('renders children', () => {
    render(<PageTransition>content</PageTransition>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
