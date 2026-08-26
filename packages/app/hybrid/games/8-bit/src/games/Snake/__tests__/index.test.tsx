import { render, fireEvent, act } from '@testing-library/react';
import { Snake } from '../index';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('Snake component', () => {
  it('renders without crashing', () => {
    render(<Snake />);
  });

  it('renders score', () => {
    const { getByText } = render(<Snake />);
    expect(getByText('Score:')).toBeInTheDocument();
  });

  it('renders grid size label', () => {
    const { getByText } = render(<Snake />);
    expect(getByText('12×12')).toBeInTheDocument();
  });

  it('renders Pause button', () => {
    const { getByText } = render(<Snake />);
    expect(getByText('Pause')).toBeInTheDocument();
  });

  it('renders New Game button', () => {
    const { getByText } = render(<Snake />);
    expect(getByText('New Game')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    const { getByText } = render(<Snake />);
    expect(getByText('How to Play')).toBeInTheDocument();
  });

  it('renders speed slider', () => {
    const { container } = render(<Snake />);
    expect(container.querySelector('input[type="range"]')).toBeInTheDocument();
  });

  it('toggles pause on button click', () => {
    const { getByText } = render(<Snake />);
    fireEvent.click(getByText('Pause'));
    expect(getByText('Resume')).toBeInTheDocument();
    expect(getByText('Paused')).toBeInTheDocument();
  });

  it('resumes from paused state', () => {
    const { getByText } = render(<Snake />);
    fireEvent.click(getByText('Pause'));
    fireEvent.click(getByText('Resume'));
    expect(getByText('Pause')).toBeInTheDocument();
  });

  it('opens help modal', () => {
    const { getByText } = render(<Snake />);
    fireEvent.click(getByText('How to Play'));
    expect(getByText('Got it!')).toBeInTheDocument();
  });

  it('handles keyboard Space for pause', () => {
    const { container, getByText } = render(<Snake />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: ' ' });
    expect(getByText('Resume')).toBeInTheDocument();
  });

  it('handles keyboard Escape', () => {
    const push = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push });
    const { container } = render(<Snake />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('handles arrow key input', () => {
    const { container } = render(<Snake />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'ArrowUp' });
    fireEvent.keyDown(div, { key: 'ArrowLeft' });
    fireEvent.keyDown(div, { key: 'ArrowDown' });
    fireEvent.keyDown(div, { key: 'ArrowRight' });
  });

  it('ignores arrow keys when paused', () => {
    const { container, getByText } = render(<Snake />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.click(getByText('Pause'));
    fireEvent.keyDown(div, { key: 'ArrowUp' });
  });

  it('changes speed via slider', () => {
    const { container } = render(<Snake />);
    const slider = container.querySelector('input[type="range"]')!;
    fireEvent.change(slider, { target: { value: '3' } });
  });

  it('resets game on New Game click', () => {
    const { getByText } = render(<Snake />);
    fireEvent.click(getByText('New Game'));
  });

  it('advances game tick', () => {
    render(<Snake />);
    act(() => {
      jest.advanceTimersByTime(200);
    });
  });

  it('renders keyboard hint', () => {
    const { getByText } = render(<Snake />);
    expect(
      getByText('Arrow keys move · Space pause · Esc close')
    ).toBeInTheDocument();
  });
});
