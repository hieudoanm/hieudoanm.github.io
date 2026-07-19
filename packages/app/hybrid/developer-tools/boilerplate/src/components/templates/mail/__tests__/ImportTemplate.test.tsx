import { fireEvent, render, screen } from '@testing-library/react';
import { ImportTemplate } from '../ImportTemplate';

describe('ImportTemplate', () => {
  it('walks through the import wizard steps', () => {
    render(<ImportTemplate />);
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(
      screen.getByRole('heading', { name: 'Map columns' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Back/ }));
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Import complete')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Start over' }));
    expect(
      screen.getByText('Choose a CSV file to get started.')
    ).toBeInTheDocument();
  });

  it('shows the selected file name', () => {
    render(<ImportTemplate />);
    fireEvent.change(screen.getByLabelText('Choose file'), {
      target: { files: [new File(['a,b'], 'contacts.csv')] },
    });
    expect(screen.getByText('contacts.csv')).toBeInTheDocument();
    expect(
      screen.queryByText('Choose a CSV file to get started.')
    ).not.toBeInTheDocument();
  });
});
