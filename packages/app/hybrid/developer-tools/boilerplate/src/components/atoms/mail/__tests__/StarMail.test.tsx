import { fireEvent, render, screen } from '@testing-library/react';
import { StarMail } from '../StarMail';

describe('StarMail', () => {
  it('renders as an unstarred toggle button', () => {
    render(<StarMail starred={false} />);
    const button = screen.getByRole('button', { name: 'Star mail' });
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders a filled star when starred', () => {
    render(<StarMail starred />);
    expect(screen.getByRole('button', { name: 'Unstar mail' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByTestId('star-mail-icon')).toHaveClass('fill-yellow-500');
  });

  it('calls onToggle with the new state on click', () => {
    const onToggle = jest.fn();
    render(<StarMail starred={false} onToggle={onToggle} />);
    fireEvent.click(screen.getByRole('button', { name: 'Star mail' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
