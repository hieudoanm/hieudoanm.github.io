import { render, screen, fireEvent } from '@testing-library/react';
import { ModalProvider, useModal } from '../ModalContext';

describe('ModalContext', () => {
  it('renders children', () => {
    render(
      <ModalProvider>
        <div data-testid="child">Hello</div>
      </ModalProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('throws when useModal is used outside provider', () => {
    expect(() => render(<ThrowsOnMount />)).toThrow(
      'useModal must be used within a ModalProvider'
    );
  });

  it('starts closed with no content', () => {
    render(
      <ModalProvider>
        <Consumer />
      </ModalProvider>
    );
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    expect(screen.getByTestId('modal-content')).toHaveTextContent('');
  });

  it('opens modal with content when openModal is called', () => {
    render(
      <ModalProvider>
        <Consumer />
      </ModalProvider>
    );
    fireEvent.click(screen.getByTestId('open-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    expect(screen.getByTestId('modal-content')).toHaveTextContent(
      'Hello from modal'
    );
  });

  it('closes modal and clears content when closeModal is called', () => {
    render(
      <ModalProvider>
        <Consumer />
      </ModalProvider>
    );
    fireEvent.click(screen.getByTestId('open-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    fireEvent.click(screen.getByTestId('close-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('false');
    expect(screen.getByTestId('modal-content')).toHaveTextContent('');
  });

  it('replaces content when openModal is called again', () => {
    render(
      <ModalProvider>
        <Consumer />
        <Reopener />
      </ModalProvider>
    );
    fireEvent.click(screen.getByTestId('open-btn'));
    fireEvent.click(screen.getByTestId('reopen-btn'));
    expect(screen.getByTestId('is-open')).toHaveTextContent('true');
    expect(screen.getByTestId('modal-content')).toHaveTextContent(
      'Updated content'
    );
  });
});

function ThrowsOnMount() {
  useModal();
  return null;
}

function Consumer() {
  const { isOpen, modalContent, openModal, closeModal } = useModal();
  return (
    <div>
      <span data-testid="is-open">{String(isOpen)}</span>
      <div data-testid="modal-content">{modalContent}</div>
      <button
        data-testid="open-btn"
        onClick={() => openModal(<p>Hello from modal</p>)}>
        Open
      </button>
      <button data-testid="close-btn" onClick={closeModal}>
        Close
      </button>
    </div>
  );
}

function Reopener() {
  const { openModal } = useModal();
  return (
    <button
      data-testid="reopen-btn"
      onClick={() => openModal(<p>Updated content</p>)}>
      Reopen
    </button>
  );
}
