import { fireEvent, render, screen } from '@testing-library/react';
import { FiTrash } from 'react-icons/fi';
import { Dropdown } from '../Dropdown';
import { Menu } from '../Menu';

describe('Dropdown', () => {
  const items = [
    { label: 'Edit', onClick: jest.fn() },
    { label: 'Delete', onClick: jest.fn(), danger: true, icon: <FiTrash /> },
  ];

  it('hides menu initially and opens on trigger click', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('calls item onClick and closes on select', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('marks danger items', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveClass(
      'text-error'
    );
  });

  it('renders item icons', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }).querySelector('svg')
    ).toBeInTheDocument();
  });

  it('closes on outside click', () => {
    render(
      <>
        <div>Outside</div>
        <Dropdown trigger={<button>Menu</button>} items={items} />
      </>
    );
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
