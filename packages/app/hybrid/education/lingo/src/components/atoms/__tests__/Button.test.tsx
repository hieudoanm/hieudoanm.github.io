import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('applies variant and size classes', () => {
    const { container, rerender } = render(
      <Button variant="outline" size="lg">
        big
      </Button>
    );
    expect(container.firstChild).toHaveClass('btn', 'btn-outline', 'btn-lg');

    rerender(
      <Button variant="ghost" size="sm">
        small
      </Button>
    );
    expect(screen.getByText('small')).toHaveClass('btn-sm');
  });

  it('forwards native props and handles clicks', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>go</Button>);
    fireEvent.click(screen.getByText('go'));
    expect(onClick).toHaveBeenCalled();
  });

  it('supports disabled state', () => {
    render(
      <Button disabled type="submit">
        blocked
      </Button>
    );
    expect((screen.getByText('blocked') as HTMLButtonElement).disabled).toBe(
      true
    );
  });
});
