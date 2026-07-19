import { fireEvent, render, screen } from '@testing-library/react';
import { InlineAlert } from '../InlineAlert';

describe('InlineAlert', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)(
    'applies the %s accent',
    (variant) => {
      render(<InlineAlert variant={variant}>Heads up</InlineAlert>);
      expect(screen.getByRole('status')).toHaveClass(`text-${variant}`);
    }
  );

  it('renders the message', () => {
    render(<InlineAlert>Something changed</InlineAlert>);
    expect(screen.getByText('Something changed')).toBeInTheDocument();
  });

  it('renders a dismiss button and calls onClose', () => {
    const onClose = jest.fn();
    render(<InlineAlert onClose={onClose}>Heads up</InlineAlert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render a dismiss button by default', () => {
    render(<InlineAlert>Heads up</InlineAlert>);
    expect(
      screen.queryByRole('button', { name: 'Dismiss alert' })
    ).not.toBeInTheDocument();
  });
});
