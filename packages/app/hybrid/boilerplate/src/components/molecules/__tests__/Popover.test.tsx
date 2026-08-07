import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '../../atoms/Button';
import { Menu } from '../Menu';
import { Popover } from '../Popover';

describe('Popover', () => {
  it('opens and closes on trigger click', () => {
    render(
      <Popover trigger={<Button size="sm">Actions</Button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('dialog')).toHaveTextContent('Popover content');
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('adds aria-expanded to the trigger', () => {
    render(
      <Popover trigger={<button type="button">Menu</button>}>
        <p>Body</p>
      </Popover>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });
});
