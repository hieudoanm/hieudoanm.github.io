import { fireEvent, render, screen } from '@testing-library/react';
import { Sheet } from '../Sheet';

describe('Sheet', () => {
  it('returns null when closed', () => {
    const { container } = render(<Sheet open={false} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and children with side panel', () => {
    render(
      <Sheet open onClose={jest.fn()} title="Filters" side="left">
        <p>Content</p>
      </Sheet>
    );
    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('left-0');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose via close button and backdrop', () => {
    const onClose = jest.fn();
    render(
      <Sheet open onClose={onClose} title="Settings">
        <p>Body</p>
      </Sheet>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close sheet' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close sheet backdrop' })
    );
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Sheet open onClose={onClose} title="Settings" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a footer', () => {
    render(
      <Sheet
        open
        onClose={jest.fn()}
        title="Settings"
        footer={<button>Apply</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});
