import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/gallery/molecules/EmptyState';

describe('EmptyState', () => {
  it('renders a title without a hint', () => {
    render(<EmptyState title="No photos" />);
    expect(screen.getByText('No photos')).toBeInTheDocument();
  });

  it('renders an optional hint', () => {
    render(<EmptyState title="No photos" hint="Upload one" />);
    expect(screen.getByText('Upload one')).toBeInTheDocument();
  });
});
