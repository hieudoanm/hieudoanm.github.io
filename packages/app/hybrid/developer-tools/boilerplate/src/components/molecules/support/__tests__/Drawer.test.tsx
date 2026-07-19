import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer } from '../Drawer';

describe('Drawer', () => {
  it('opens and shows title and children', () => {
    render(
      <Drawer open title="Filters" onClose={jest.fn()}>
        Content
      </Drawer>
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders closed state with an unchecked toggle', () => {
    render(<Drawer open={false} title="Filters" onClose={jest.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onClose from the close button', () => {
    const onClose = jest.fn();
    render(<Drawer open title="Filters" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose from the overlay and supports the right side', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer open side="right" onClose={onClose} />
    );
    expect(container.querySelector('.drawer-end')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close drawer overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Drawer open onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a footer', () => {
    render(<Drawer open onClose={jest.fn()} footer={<button>Apply</button>} />);
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});
