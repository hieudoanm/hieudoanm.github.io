import { fireEvent, render, screen } from '@testing-library/react';
import { CrmContactsTemplate } from '../CrmContactsTemplate';

describe('CrmContactsTemplate', () => {
  it('renders all contacts and the summary', () => {
    render(<CrmContactsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Contacts' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 contacts')).toBeInTheDocument();
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Sales Manager at Acme Corp')).toBeInTheDocument();
    expect(screen.getAllByText('Sales')).toHaveLength(4);
  });

  it('filters contacts by team', () => {
    render(<CrmContactsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Engineering' }));
    expect(screen.getByText('2 contacts')).toBeInTheDocument();
    expect(screen.getByText('David Lee')).toBeInTheDocument();
    expect(screen.queryByText('Alice Chen')).not.toBeInTheDocument();
  });

  it('searches contacts and shows the empty state', () => {
    render(<CrmContactsTemplate />);
    fireEvent.change(screen.getByLabelText('Search contacts'), {
      target: { value: 'grace' },
    });
    expect(screen.getByText('1 contacts')).toBeInTheDocument();
    expect(screen.getByText('Grace Kim')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search contacts'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No contacts found')).toBeInTheDocument();
    expect(screen.getByText('0 contacts')).toBeInTheDocument();
  });
});
