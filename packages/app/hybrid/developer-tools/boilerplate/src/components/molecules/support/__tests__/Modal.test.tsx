import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('returns null when closed', () => {
    const { container } = render(<Modal open={false}>Body</Modal>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, children, and action when open', () => {
    render(
      <Modal open title="Confirm" action={<button>Ok</button>}>
        Body
      </Modal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Ok')).toBeInTheDocument();
  });

  it('calls onClose from backdrop button', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        Body
      </Modal>
    );
    fireEvent.click(screen.getByText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
