import { render, screen } from '@testing-library/react';
import CardDetail from '../CardDetail';
import type { Card } from '@/types';
import { ToastProvider } from '@/providers/ToastProvider';

const mockCard: Card = {
  id: '1',
  name: 'Main Card',
  number: '4532 1234 5678 1234',
  expiry: '12/28',
  type: 'visa',
  color: 'primary',
  frozen: false,
  cardholderName: 'Alex Johnson',
  spendingLimit: 5000,
  spentThisMonth: 2340.5,
  currency: 'USD',
};

const renderWithProviders = (ui: React.ReactElement) =>
  render(<ToastProvider>{ui}</ToastProvider>);

describe('CardDetail', () => {
  it('renders card name', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('Main Card')).toBeInTheDocument();
  });

  it('renders masked card number', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('•••• •••• •••• 1234')).toBeInTheDocument();
  });

  it('renders card type', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('Visa')).toBeInTheDocument();
  });

  it('renders expiry date', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('12/28')).toBeInTheDocument();
  });

  it('shows Active status when not frozen', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText(/Active/)).toBeInTheDocument();
  });

  it('shows Frozen status when frozen', () => {
    const frozenCard = { ...mockCard, frozen: true };
    renderWithProviders(<CardDetail card={frozenCard} />);
    expect(screen.getByText(/Frozen/)).toBeInTheDocument();
  });

  it('renders cardholder name', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('Alex Johnson')).toBeInTheDocument();
  });

  it('renders spending limit section', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('Spending Limit')).toBeInTheDocument();
  });

  it('renders available balance', () => {
    renderWithProviders(<CardDetail card={mockCard} />);
    expect(screen.getByText('Available balance')).toBeInTheDocument();
  });
});
