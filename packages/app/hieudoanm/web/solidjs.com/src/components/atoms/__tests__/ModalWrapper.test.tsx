import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ModalWrapper } from '../ModalWrapper';

describe('ModalWrapper', () => {
  it('renders children', () => {
    render(() => (
      <ModalWrapper onClose={() => {}}>
        <p>Modal content</p>
      </ModalWrapper>
    ));
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('renders a close button', () => {
    render(() => (
      <ModalWrapper onClose={() => {}}>
        <p>Content</p>
      </ModalWrapper>
    ));
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(() => (
      <ModalWrapper onClose={onClose}>
        <p>Content</p>
      </ModalWrapper>
    ));
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when overlay is clicked', () => {
    const onClose = vi.fn();
    render(() => (
      <ModalWrapper onClose={onClose}>
        <p>Content</p>
      </ModalWrapper>
    ));
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
    expect(overlay).toBeInTheDocument();
    fireEvent.click(overlay!);
    expect(onClose).toHaveBeenCalledOnce();
  });
});
