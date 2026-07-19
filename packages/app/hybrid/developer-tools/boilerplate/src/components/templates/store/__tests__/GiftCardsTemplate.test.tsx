import { fireEvent, render, screen } from '@testing-library/react';
import GiftCardsPage from '@/app/(templates)/store/gift-cards/page';
import { GiftCardsTemplate } from '../GiftCardsTemplate';

describe('GiftCardsTemplate', () => {
  it('renders amount options and the form', () => {
    render(<GiftCardsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Gift cards' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$25' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$50' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '$100' })).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('friend@example.com')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Buy gift card' })
    ).toBeInTheDocument();
  });

  it('highlights the selected amount', () => {
    render(<GiftCardsTemplate />);
    expect(screen.getByRole('button', { name: '$50' })).toHaveClass(
      'btn-primary'
    );
    fireEvent.click(screen.getByRole('button', { name: '$100' }));
    expect(screen.getByRole('button', { name: '$100' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('button', { name: '$50' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('shows an error when the email is empty', () => {
    render(<GiftCardsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('shows an error for an invalid email', () => {
    render(<GiftCardsTemplate />);
    fireEvent.change(screen.getByPlaceholderText('friend@example.com'), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
  });

  it('purchases a gift card with the selected amount', () => {
    render(<GiftCardsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: '$100' }));
    fireEvent.change(screen.getByPlaceholderText('friend@example.com'), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Buy gift card' }));
    expect(
      screen.getByRole('heading', { name: 'Gift card purchased' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('A $100 gift card is on its way to jane@example.com.')
    ).toBeInTheDocument();
  });

  it('renders the GiftCardsPage', () => {
    render(<GiftCardsPage />);
    expect(
      screen.getByRole('heading', { name: 'Gift cards' })
    ).toBeInTheDocument();
  });
});
