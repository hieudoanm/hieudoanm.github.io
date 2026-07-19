import { fireEvent, render, screen } from '@testing-library/react';
import { AccountsTemplate } from '../AccountsTemplate';

describe('AccountsTemplate', () => {
  it('renders accounts and the summary', () => {
    render(<AccountsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Accounts' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 accounts')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getAllByText('2 contacts')).toHaveLength(2);
    expect(
      screen.getAllByRole('button', { name: 'Show contacts' })
    ).toHaveLength(4);
  });

  it('shows and hides account contacts', () => {
    render(<AccountsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Show contacts' })[0]
    );
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Hide contacts' })
    ).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Hide contacts' }));
    expect(screen.queryByText('Ada Lovelace')).not.toBeInTheDocument();
  });
});
