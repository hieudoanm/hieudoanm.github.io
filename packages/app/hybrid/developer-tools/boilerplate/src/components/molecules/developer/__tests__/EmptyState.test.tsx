import { render, screen } from '@testing-library/react';
import { FiTrash } from 'react-icons/fi';
import { EmptyState } from '../EmptyState';

describe('EmptyState', () => {
  it('renders icon, title, and description', () => {
    render(
      <EmptyState icon={<FiTrash />} title="No data" description="Empty" />
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState
        icon={<FiTrash />}
        title="No data"
        action={<button>Add</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});
