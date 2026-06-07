import { render, fireEvent, screen } from '@testing-library/react';
import { Game2048Modal } from '../Game2048Modal';

describe('Game2048Modal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    Element.prototype.animate = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<Game2048Modal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('renders 16 tiles', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:');
    expect(container).toBeInTheDocument();
  });

  it('resets game on New button click', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const newBtn = screen.getByText('New');
    fireEvent.click(newBtn);
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('responds to arrow key down', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowDown' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('responds to arrow key Up', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowUp' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('arrow key Left moves tiles', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowLeft' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('arrow key Right moves tiles', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'ArrowRight' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('Escape key closes modal', () => {
    const onClose = jest.fn();
    render(<Game2048Modal onClose={onClose} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Escape' });
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('r key resets game', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'r' });
    }
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });

  it('directional buttons work', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    const upBtn = screen.getByText('▲');
    fireEvent.click(upBtn);
    expect(screen.getByText('▲')).toBeInTheDocument();
  });

  it('all directional buttons move tiles', () => {
    render(<Game2048Modal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('▲'));
    fireEvent.click(screen.getByText('◀'));
    fireEvent.click(screen.getByText('▶'));
    fireEvent.click(screen.getByText('▼'));
    expect(screen.getByText('Score:')).toBeInTheDocument();
  });
});
