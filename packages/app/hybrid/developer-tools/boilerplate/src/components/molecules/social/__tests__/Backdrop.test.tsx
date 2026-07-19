import { fireEvent, render, screen } from '@testing-library/react';
import { Backdrop } from '../Backdrop';

describe('Backdrop', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<Backdrop open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders an overlay when open', () => {
    render(<Backdrop open />);
    const overlay = document.querySelector('.fixed');
    expect(overlay).toBeInTheDocument();
  });

  it('calls onClose when the overlay itself is clicked', () => {
    const onClose = jest.fn();
    render(
      <Backdrop open onClose={onClose}>
        <div>Content</div>
      </Backdrop>
    );
    const overlay = document.querySelector('.fixed') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when content is clicked', () => {
    const onClose = jest.fn();
    render(
      <Backdrop open onClose={onClose}>
        <div>Content</div>
      </Backdrop>
    );
    fireEvent.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders an opaque overlay', () => {
    render(<Backdrop open opaque />);
    expect(document.querySelector('.bg-base-100')).toBeInTheDocument();
  });

  it('marks a childless overlay as aria-hidden', () => {
    const { container } = render(<Backdrop open />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});
