import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardActions from '../CardActions';
import { ToastProvider } from '@/providers/ToastProvider';
import type { Card } from '@/types';

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

describe('CardActions', () => {
  it('renders card actions heading', () => {
    renderWithProviders(
      <CardActions card={mockCard} onToggleFreeze={jest.fn()} />
    );
    expect(screen.getByText('Card Actions')).toBeInTheDocument();
  });

  it('shows Freeze Card when not frozen', () => {
    renderWithProviders(
      <CardActions card={mockCard} onToggleFreeze={jest.fn()} />
    );
    expect(screen.getByText('Freeze Card')).toBeInTheDocument();
  });

  it('shows Unfreeze Card when frozen', () => {
    const frozenCard = { ...mockCard, frozen: true };
    renderWithProviders(
      <CardActions card={frozenCard} onToggleFreeze={jest.fn()} />
    );
    expect(screen.getByText('Unfreeze Card')).toBeInTheDocument();
  });

  it('calls onToggleFreeze when freeze button clicked', async () => {
    const onToggleFreeze = jest.fn();
    renderWithProviders(
      <CardActions card={mockCard} onToggleFreeze={onToggleFreeze} />
    );
    await userEvent.click(screen.getByText('Freeze Card'));
    expect(onToggleFreeze).toHaveBeenCalled();
  });

  it('shows More actions button', () => {
    renderWithProviders(
      <CardActions card={mockCard} onToggleFreeze={jest.fn()} />
    );
    expect(screen.getByText('More actions')).toBeInTheDocument();
  });
});
