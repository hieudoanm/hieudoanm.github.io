import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from '../Alert';

describe('Alert', () => {
  it('renders title and description with default info variant', () => {
    render(<Alert title="Note" description="Saved" />);
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it.each(['success', 'warning', 'error'] as const)(
    'applies %s variant',
    (variant) => {
      render(<Alert variant={variant}>Body</Alert>);
      expect(screen.getByRole('alert')).toHaveClass(`alert-${variant}`);
    }
  );

  it('renders dismiss button and calls onClose', () => {
    const onClose = jest.fn();
    render(<Alert dismissible onClose={onClose} title="Note" />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button by default', () => {
    render(<Alert title="Note" />);
    expect(
      screen.queryByRole('button', { name: 'Dismiss alert' })
    ).not.toBeInTheDocument();
  });
});
