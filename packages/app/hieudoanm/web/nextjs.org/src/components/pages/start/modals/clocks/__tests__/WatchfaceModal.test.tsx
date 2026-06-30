import { render, fireEvent, screen } from '@testing-library/react';
import { WatchFaceModal } from '../WatchfaceModal';

jest.useFakeTimers();

describe('WatchFaceModal', () => {
  const onClose = jest.fn();

  it('renders modal title', () => {
    render(<WatchFaceModal onClose={onClose} />);
    expect(screen.getByText('Watchface')).toBeInTheDocument();
  });

  it('renders face toggle buttons', () => {
    render(<WatchFaceModal onClose={onClose} />);
    expect(screen.getByText('DOT')).toBeInTheDocument();
    expect(screen.getByText('MINIMAL')).toBeInTheDocument();
  });

  it('switches to minimal face on button click', () => {
    render(<WatchFaceModal onClose={onClose} />);
    expect(screen.getByText('DOT').className).toContain('btn-primary');
    fireEvent.click(screen.getByText('MINIMAL'));
    expect(screen.getByText('MINIMAL').className).toContain('btn-primary');
  });

  it('switches back to dot face', () => {
    render(<WatchFaceModal onClose={onClose} />);
    fireEvent.click(screen.getByText('MINIMAL'));
    fireEvent.click(screen.getByText('DOT'));
    expect(screen.getByText('DOT').className).toContain('btn-primary');
  });

  it('DOT button is primary by default', () => {
    render(<WatchFaceModal onClose={onClose} />);
    const dotBtn = screen.getByText('DOT');
    expect(dotBtn.className).toContain('btn-primary');
  });
});
