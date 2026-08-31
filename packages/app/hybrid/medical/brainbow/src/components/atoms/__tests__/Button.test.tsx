import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/Button';

describe('Button', () => {
  it('renders children and handles clicks', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Open</Button>);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant class names', () => {
    render(<Button variant="secondary">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'btn-secondary'
    );
  });
});
