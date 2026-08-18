import { fireEvent, render, screen } from '@testing-library/react';
import { DraftsTemplate } from '../DraftsTemplate';

describe('DraftsTemplate', () => {
  it('renders drafts and the summary', () => {
    render(<DraftsTemplate />);
    expect(screen.getByRole('heading', { name: 'Drafts' })).toBeInTheDocument();
    expect(screen.getByText('4 drafts')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Budget proposal')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(4);
  });

  it('deletes all drafts and shows the empty state', () => {
    render(<DraftsTemplate />);
    const deleteButtons = screen.getAllByRole('button', { name: 'Delete' });
    deleteButtons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('No drafts')).toBeInTheDocument();
    expect(screen.getByText('0 drafts')).toBeInTheDocument();
  });
});
