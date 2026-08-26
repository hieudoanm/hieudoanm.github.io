import { render, fireEvent, act } from '@testing-library/react';
import { Maze } from '../index';

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

const mockCtx = {
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  set fillStyle(_v: string) {},
  set strokeStyle(_v: string) {},
  set lineWidth(_v: number) {},
};

beforeEach(() => {
  jest.clearAllMocks();
  HTMLCanvasElement.prototype.getContext = jest.fn(() => mockCtx) as any;
});

describe('Maze component', () => {
  it('renders without crashing', () => {
    render(<Maze />);
  });

  it('renders size label', () => {
    const { getByText } = render(<Maze />);
    expect(getByText(/Size:/)).toBeInTheDocument();
  });

  it('renders New Maze button', () => {
    const { getByText } = render(<Maze />);
    expect(getByText('New Maze')).toBeInTheDocument();
  });

  it('renders Solve button', () => {
    const { getByText } = render(<Maze />);
    expect(getByText('Solve')).toBeInTheDocument();
  });

  it('renders How to Play button', () => {
    const { getByText } = render(<Maze />);
    expect(getByText('How to Play')).toBeInTheDocument();
  });

  it('renders canvas', () => {
    const { container } = render(<Maze />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('opens help modal on How to Play click', () => {
    const { getByText } = render(<Maze />);
    fireEvent.click(getByText('How to Play'));
    expect(getByText('Got it!')).toBeInTheDocument();
  });

  it('closes help modal on Got it click', () => {
    const { getByText, queryByText } = render(<Maze />);
    fireEvent.click(getByText('How to Play'));
    fireEvent.click(getByText('Got it!'));
    expect(queryByText('Got it!')).not.toBeInTheDocument();
  });

  it('regenerates maze on New Maze click', () => {
    const { getByText } = render(<Maze />);
    const btn = getByText('New Maze');
    fireEvent.click(btn);
    fireEvent.click(btn);
  });

  it('changes size via slider', () => {
    const { container } = render(<Maze />);
    const slider = container.querySelector('input[type="range"]')!;
    fireEvent.change(slider, { target: { value: '15' } });
  });

  it('handles keyboard R to regenerate', () => {
    const { container } = render(<Maze />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'r' });
  });

  it('handles keyboard Escape', () => {
    const push = jest.fn();
    jest
      .spyOn(require('next/navigation'), 'useRouter')
      .mockReturnValue({ push });
    const { container } = render(<Maze />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 'Escape' });
    expect(push).toHaveBeenCalledWith('/');
  });

  it('handles keyboard S to solve', () => {
    const { container, getByText } = render(<Maze />);
    const div = container.querySelector('[tabindex="0"]')!;
    fireEvent.keyDown(div, { key: 's' });
  });
});
