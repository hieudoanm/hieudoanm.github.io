import { render, screen } from '@testing-library/react';
import { EmptyState } from '@/components/molecules/EmptyState';

describe('EmptyState', () => {
  it('renders title, description, and action', () => {
    render(
      <EmptyState
        icon={<span>icon</span>}
        title="Nothing here"
        description="Load an image to begin."
        action={<button type="button">Go</button>}
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Load an image to begin.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
