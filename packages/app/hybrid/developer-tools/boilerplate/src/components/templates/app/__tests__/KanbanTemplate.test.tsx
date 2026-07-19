import { fireEvent, render, screen, within } from '@testing-library/react';
import { KanbanTemplate } from '../KanbanTemplate';

describe('KanbanTemplate', () => {
  it('renders four columns with initial cards and task counts', () => {
    render(<KanbanTemplate />);
    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Todo column')).getByText(
        'Design landing page'
      )
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Done column')).getByText(
        'Set up CI pipeline'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('2 tasks')).toBeInTheDocument();
    expect(screen.getAllByText('1 task')).toHaveLength(3);
  });

  it('adds a card to a column', () => {
    render(<KanbanTemplate />);
    fireEvent.change(screen.getByLabelText('New task for Todo'), {
      target: { value: 'Ship v1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add to Todo' }));
    expect(
      within(screen.getByLabelText('Todo column')).getByText('Ship v1')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('New task for Todo')).toHaveValue('');
  });

  it('adds a card with a fallback title when the input is empty', () => {
    render(<KanbanTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add to Review' }));
    expect(
      within(screen.getByLabelText('Review column')).getByText('Untitled task')
    ).toBeInTheDocument();
  });

  it('moves a card right then left across columns', () => {
    render(<KanbanTemplate />);
    fireEvent.change(screen.getByLabelText('New task for Todo'), {
      target: { value: 'Ship v1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add to Todo' }));
    fireEvent.click(screen.getByRole('button', { name: 'Move Ship v1 right' }));
    expect(
      within(screen.getByLabelText('In Progress column')).getByText('Ship v1')
    ).toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Todo column')).queryByText('Ship v1')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Move Ship v1 left' }));
    expect(
      within(screen.getByLabelText('Todo column')).getByText('Ship v1')
    ).toBeInTheDocument();
  });

  it('ignores moves at the board edges', () => {
    render(<KanbanTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Move Set up CI pipeline right' })
    );
    expect(
      within(screen.getByLabelText('Done column')).getByText(
        'Set up CI pipeline'
      )
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'Move Design landing page left' })
    );
    expect(
      within(screen.getByLabelText('Todo column')).getByText(
        'Design landing page'
      )
    ).toBeInTheDocument();
  });

  it('deletes a card from its column', () => {
    render(<KanbanTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Set up CI pipeline' })
    );
    expect(
      within(screen.getByLabelText('Done column')).queryByText(
        'Set up CI pipeline'
      )
    ).not.toBeInTheDocument();
    expect(
      within(screen.getByLabelText('Done column')).getByText('0 tasks')
    ).toBeInTheDocument();
  });
});
