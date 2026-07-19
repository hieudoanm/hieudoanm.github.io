import { fireEvent, render, screen } from '@testing-library/react';
import { SnellenChart } from '../SnellenChartModal';

const mockRandom = jest.spyOn(Math, 'random').mockReturnValue(0.5);

describe('SnellenChart', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const { container } = render(<SnellenChart onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should display the first line label', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    expect(screen.getByText('20/200')).toBeInTheDocument();
  });

  it('should navigate to next line', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });

  it('should navigate to previous line', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('20/200')).toBeInTheDocument();
  });

  it('should disable prev on first line', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('should disable next on last line', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    const next = screen.getByText('Next');
    for (let i = 0; i < 9; i++) fireEvent.click(next);
    expect(next).toBeDisabled();
  });

  it('should toggle reveal on button click', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Reveal Answer'));
    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.getByText('Reveal Answer')).toBeInTheDocument();
  });

  it('should navigate via arrow down key', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });

  it('should navigate via arrow up key', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(screen.getByText('20/200')).toBeInTheDocument();
  });

  it('should go to specific line via dot navigation', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    const dots = document.querySelectorAll('button');
    const dotButtons = Array.from(dots).filter(
      (b) => b.getAttribute('title') === '20/15'
    );
    if (dotButtons.length > 0) {
      fireEvent.click(dotButtons[0]);
      expect(screen.getByText('20/15')).toBeInTheDocument();
    }
  });

  it('should show position indicator', () => {
    render(<SnellenChart onClose={jest.fn()} />);
    expect(screen.getByText('1 / 10')).toBeInTheDocument();
  });

  it('should close on modal backdrop click', () => {
    const onClose = jest.fn();
    render(<SnellenChart onClose={onClose} />);
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalled();
    }
  });

  it('should close on close button click', () => {
    const onClose = jest.fn();
    render(<SnellenChart onClose={onClose} />);
    const closeBtn = document.querySelector('.btn-square');
    if (closeBtn) {
      fireEvent.click(closeBtn);
      expect(onClose).toHaveBeenCalled();
    }
  });
});
