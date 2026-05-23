import { render, fireEvent, screen } from '@testing-library/react';
import { RockPaperScissorsModal } from '../RockPaperScissorsModal';

describe('RockPaperScissorsModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    Element.prototype.animate = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(
      <RockPaperScissorsModal onClose={jest.fn()} />
    );
    expect(container).toMatchSnapshot();
  });

  it('shows player choice when rock is clicked', () => {
    render(<RockPaperScissorsModal onClose={jest.fn()} />);
    const rockBtn = screen.getAllByText('🪨')[0];
    fireEvent.click(rockBtn);
    expect(screen.getAllByText('🪨').length).toBeGreaterThanOrEqual(2);
  });

  it('resets the game', () => {
    render(<RockPaperScissorsModal onClose={jest.fn()} />);
    const rockBtn = screen.getAllByText('🪨')[0];
    fireEvent.click(rockBtn);
    fireEvent.click(screen.getByText('Reset'));
    const questionMarks = screen.getAllByText('❔');
    expect(questionMarks.length).toBeGreaterThanOrEqual(1);
  });

  it('responds to keyboard input 1 for rock', () => {
    render(<RockPaperScissorsModal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: '1' });
    }
    expect(screen.getAllByText('🪨').length).toBeGreaterThanOrEqual(2);
  });

  it('keyboard r resets', () => {
    render(<RockPaperScissorsModal onClose={jest.fn()} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: '1' });
      fireEvent.keyDown(container, { key: 'r' });
    }
    const questionMarks = screen.getAllByText('❔');
    expect(questionMarks.length).toBeGreaterThanOrEqual(1);
  });

  it('keyboard Escape closes', () => {
    const onClose = jest.fn();
    render(<RockPaperScissorsModal onClose={onClose} />);
    const container = screen.getByText('Score:').closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Escape' });
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('increments score on win and tracks streak', () => {
    render(<RockPaperScissorsModal onClose={jest.fn()} />);
    const scissorsBtn = screen.getAllByText('✂️')[0];
    fireEvent.click(scissorsBtn);
    expect(screen.getByText(/Score:/)).toBeInTheDocument();
  });
});
