import { fireEvent, render, screen } from '@testing-library/react';
import { ModalsTemplate } from '../ModalsTemplate';

describe('ModalsTemplate', () => {
  it('renders trigger buttons and empty saved list', () => {
    render(<ModalsTemplate />);
    expect(
      screen.getByRole('button', { name: 'Basic modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirm modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Form modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Full-screen modal' })
    ).toBeInTheDocument();
    expect(screen.getByText('No saved items yet.')).toBeInTheDocument();
  });

  it('opens and closes the basic modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Basic modal' }));
    expect(
      screen.getByText('This is a simple modal with a message.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText('This is a simple modal with a message.')
    ).not.toBeInTheDocument();
  });

  it('cancels the confirm modal without a toast', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm modal' }));
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    expect(screen.queryByText('Item deleted')).not.toBeInTheDocument();
  });

  it('deletes from the confirm modal and shows a toast', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm modal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    expect(screen.getByText('Item deleted')).toBeInTheDocument();
  });

  it('saves an item from the form modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Apple' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item name')).toHaveValue('');
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByPlaceholderText('Item name')).not.toBeInTheDocument();
  });

  it('ignores blank saves', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('No saved items yet.')).toBeInTheDocument();
  });

  it('removes a saved item', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Apple' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Pear' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove Apple' }));
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Pear')).toBeInTheDocument();
  });

  it('opens and closes the full-screen modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Full-screen modal' }));
    expect(
      screen.getByText(
        'This modal fills the entire screen for immersive content.'
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(
        'This modal fills the entire screen for immersive content.'
      )
    ).not.toBeInTheDocument();
  });
});
