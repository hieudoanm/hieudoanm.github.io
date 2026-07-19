import { fireEvent, render, screen } from '@testing-library/react';
import { HelpCenterTemplate } from '../HelpCenterTemplate';

describe('HelpCenterTemplate', () => {
  it('renders all category cards and the contact footer', () => {
    render(<HelpCenterTemplate />);
    expect(
      screen.getByRole('button', { name: /Getting Started/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Account/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Troubleshooting/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Contact support/ })
    ).toBeInTheDocument();
    expect(screen.getByText('Need more help?')).toBeInTheDocument();
  });

  it('opens and closes the FAQ accordion for a category', () => {
    render(<HelpCenterTemplate />);
    const card = screen.getByRole('button', { name: /Getting Started/ });
    fireEvent.click(card);
    const summary = screen.getByText('How do I create a workspace?');
    const details = summary.closest('details')!;
    expect(details).not.toHaveAttribute('open');
    fireEvent.click(summary);
    expect(details).toHaveAttribute('open');
    fireEvent.click(card);
    expect(
      screen.queryByText('How do I create a workspace?')
    ).not.toBeInTheDocument();
  });

  it('shows FAQs for the billing category', () => {
    render(<HelpCenterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Billing/ }));
    const summary = screen.getByText('How do I change my plan?');
    expect(summary).toBeInTheDocument();
    fireEvent.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
  });

  it('filters categories by search query against titles', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'Billing' },
    });
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Getting Started/ })
    ).not.toBeInTheDocument();
  });

  it('matches search queries against descriptions', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'invoices' },
    });
    expect(screen.getByRole('button', { name: /Billing/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Troubleshooting/ })
    ).not.toBeInTheDocument();
  });

  it('shows an empty state when search has no matches', () => {
    render(<HelpCenterTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Search help topics...'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No categories found')).toBeInTheDocument();
  });
});
