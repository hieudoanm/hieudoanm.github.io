import { fireEvent, render, screen } from '@testing-library/react';
import { ContactsTemplate } from '../ContactsTemplate';

describe('ContactsTemplate', () => {
  it('renders contact rows with avatar initials', () => {
    render(<ContactsTemplate />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('alice@acme.com')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc')).toBeInTheDocument();
    expect(screen.getByText('AC')).toBeInTheDocument();
    expect(screen.getByText('BM')).toBeInTheDocument();
  });

  it('favorites and unfavorites a contact', () => {
    render(<ContactsTemplate />);
    expect(screen.getAllByText('Favorited')).toHaveLength(1);
    fireEvent.click(
      screen.getAllByRole('button', { name: /Toggle favorite for/ })[0]
    );
    expect(screen.getAllByText('Favorited')).toHaveLength(2);
    fireEvent.click(
      screen.getAllByRole('button', { name: /Toggle favorite for/ })[0]
    );
    expect(screen.getAllByText('Favorited')).toHaveLength(1);
  });

  it('filters contacts by search', () => {
    render(<ContactsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search contacts...'), {
      target: { value: 'Acme' },
    });
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.queryByText('Bob Martinez')).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Search contacts...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
  });
});
