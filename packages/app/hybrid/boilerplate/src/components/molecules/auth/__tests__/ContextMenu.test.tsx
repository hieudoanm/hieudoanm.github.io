import { fireEvent, render, screen } from '@testing-library/react';
import { ContextMenu } from '../ContextMenu';

describe('ContextMenu', () => {
  const items = [{ label: 'Copy', onClick: jest.fn() }];

  it('opens the menu on right click', () => {
    render(<ContextMenu trigger={<span>Right-click me</span>} items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText('Right-click me'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
  });

  it('invokes the item action and closes the menu', () => {
    const onCopy = jest.fn();
    render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={[{ label: 'Copy', onClick: onCopy }]}
      />
    );
    fireEvent.contextMenu(screen.getByText('Trigger'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape', () => {
    render(<ContextMenu trigger={<span>Trigger</span>} items={items} />);
    fireEvent.contextMenu(screen.getByText('Trigger'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
