import { fireEvent, render, screen } from '@testing-library/react';
import { Menubar } from '../Menubar';

describe('Menubar', () => {
  const items = [
    { label: 'File', children: <div>File menu</div> },
    { label: 'Edit', children: <div>Edit menu</div> },
    { label: 'Help' },
  ];

  it('renders each top-level label', () => {
    render(<Menubar items={items} />);
    expect(screen.getByRole('button', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Help' })).toBeInTheDocument();
  });

  it('opens the dropdown for an item with children', () => {
    render(<Menubar items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'File' }));
    expect(screen.getByText('File menu')).toBeInTheDocument();
  });

  it('toggles the dropdown closed on a second click', () => {
    render(<Menubar items={items} />);
    const trigger = screen.getByRole('button', { name: 'File' });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByText('File menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown when clicking outside', () => {
    render(
      <div>
        <Menubar items={items} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: 'File' }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByText('File menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown on Escape', () => {
    render(<Menubar items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'Edit' }), {
      key: 'Escape',
    });
    expect(screen.queryByText('Edit menu')).not.toBeInTheDocument();
  });
});
