import { render, screen } from '@testing-library/react';
import { EmptyPlaceholder } from '../EmptyPlaceholder';

describe('EmptyPlaceholder', () => {
  it('renders the default title', () => {
    render(<EmptyPlaceholder />);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('renders icon, title, description, and action', () => {
    render(
      <EmptyPlaceholder
        icon="🗂"
        title="No files"
        description="Drop files to get started."
        action={<button>Add</button>}
      />
    );
    expect(screen.getByText('No files')).toBeInTheDocument();
    expect(screen.getByText('Drop files to get started.')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});
