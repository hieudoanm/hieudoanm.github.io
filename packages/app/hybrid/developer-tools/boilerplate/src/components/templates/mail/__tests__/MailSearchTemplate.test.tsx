import { fireEvent, render, screen } from '@testing-library/react';
import { MailSearchTemplate } from '../MailSearchTemplate';

describe('MailSearchTemplate', () => {
  it('renders all results by default', () => {
    render(<MailSearchTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Mail Search' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 results')).toBeInTheDocument();
    expect(screen.getByText('GitHub: Build passed')).toBeInTheDocument();
  });

  it('filters results by query', () => {
    render(<MailSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'stripe' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Stripe: Payment received')).toBeInTheDocument();
    expect(screen.queryByText('GitHub: Build passed')).not.toBeInTheDocument();
  });

  it('shows the no-results state', () => {
    render(<MailSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});
