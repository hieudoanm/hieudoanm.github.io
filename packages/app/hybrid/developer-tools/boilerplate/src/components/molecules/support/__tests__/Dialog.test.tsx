import { fireEvent, render, screen } from '@testing-library/react';
import { Dialog } from '../Dialog';

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<Dialog open={false} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, description, children, and footer when open', () => {
    render(
      <Dialog
        open
        onClose={jest.fn()}
        title="Confirm"
        description="Are you sure?"
        footer={<button>OK</button>}>
        <p>Body content</p>
      </Dialog>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('closes via the close button', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via the backdrop by default', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close dialog backdrop' })
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the dialog open on backdrop click when disabled', () => {
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Confirm" closeOnBackdrop={false} />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Close dialog backdrop' })
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
