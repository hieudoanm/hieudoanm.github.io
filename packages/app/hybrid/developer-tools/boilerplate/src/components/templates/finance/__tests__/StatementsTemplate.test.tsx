import { fireEvent, render, screen } from '@testing-library/react';
import { StatementsTemplate } from '../StatementsTemplate';

describe('StatementsTemplate', () => {
  it('renders statement cards with balances and activity', () => {
    render(<StatementsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Statements' })
    ).toBeInTheDocument();
    expect(screen.getByText('July 2026')).toBeInTheDocument();
    expect(screen.getByText('$24,800')).toBeInTheDocument();
    expect(screen.getByText('142 transactions')).toBeInTheDocument();
    expect(screen.getByText('105 transactions')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(5);
  });

  it('downloads a statement and swaps the button for a badge', () => {
    render(<StatementsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[1]);
    expect(screen.getByText('Downloaded')).toBeInTheDocument();
    expect(screen.getByText('Statement downloaded')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Download' })).toHaveLength(4);
  });

  it('keeps only the most recently downloaded statement marked', () => {
    render(<StatementsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(screen.getAllByText('Downloaded')).toHaveLength(1);
    fireEvent.click(screen.getAllByRole('button', { name: 'Download' })[0]);
    expect(screen.getAllByText('Downloaded')).toHaveLength(1);
  });
});
