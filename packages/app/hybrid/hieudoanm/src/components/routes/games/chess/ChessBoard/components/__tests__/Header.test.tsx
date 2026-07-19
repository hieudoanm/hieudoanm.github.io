import { fireEvent, render, screen } from '@testing-library/react';
import { Header } from '../Header';
import type { BoardMode, SidePanel } from '../../types';

jest.mock('@lodash/ts', () => ({
  range: () => [0, 1, 2],
}));

jest.mock('@lodashx/ts', () => ({
  padZero: (n: number) => String(n).padStart(3, '0'),
}));

const baseProps = {
  positionId: 0,
  panel: 'position' as SidePanel,
  boardMode: 'explore' as BoardMode,
  ecoOpening: undefined,
  on960IdChange: jest.fn(),
  onRandomize: jest.fn(),
  onReset: jest.fn(),
  onModeSwitch: jest.fn(),
};

describe('Header', () => {
  it('renders title', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByText('Chess')).toBeInTheDocument();
  });

  it('renders 960 position selector', () => {
    render(<Header {...baseProps} />);
    const select = screen.getByDisplayValue('000');
    expect(select).toBeInTheDocument();
  });

  it('renders randomize and reset buttons', () => {
    render(<Header {...baseProps} />);
    expect(screen.getByTitle('Randomize')).toBeInTheDocument();
    expect(screen.getByTitle('Reset')).toBeInTheDocument();
  });

  it('shows tabs in non-openings panel', () => {
    render(<Header {...baseProps} panel="position" />);
    expect(screen.getByRole('tab', { name: /explore/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /stockfish/i })).toBeInTheDocument();
  });

  it('highlights Explore tab as active', () => {
    render(<Header {...baseProps} panel="position" boardMode="explore" />);
    const tab = screen.getByRole('tab', { name: /explore/i });
    expect(tab.className).toContain('tab-active');
  });

  it('highlights vs Stockfish tab as active', () => {
    render(<Header {...baseProps} panel="position" boardMode="play" />);
    const tab = screen.getByRole('tab', { name: /stockfish/i });
    expect(tab.className).toContain('tab-active');
  });

  it('hides tabs in openings panel', () => {
    render(<Header {...baseProps} panel="openings" />);
    expect(
      screen.queryByRole('tab', { name: /explore/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('tab', { name: /stockfish/i })
    ).not.toBeInTheDocument();
  });

  it('shows ECO opening info in openings panel', () => {
    render(
      <Header
        {...baseProps}
        panel="openings"
        ecoOpening={{
          eco: 'B03',
          group: 'Alekhine Defense',
          subgroup: 'Balogh Variation',
          name: 'Alekhine Defense: Balogh Variation',
          pgn: '1. e4 Nf6 2. e5 Nd5 3. d4 d6 4. Bc4',
          first: 'e4-Nf6',
          half_moves: 7,
          fen: '...',
        }}
      />
    );
    expect(screen.getByText('B03')).toBeInTheDocument();
    expect(
      screen.getByText('Alekhine Defense: Balogh Variation')
    ).toBeInTheDocument();
  });

  it('calls onModeSwitch when Explore tab clicked', () => {
    const onModeSwitch = jest.fn();
    render(
      <Header
        {...baseProps}
        panel="position"
        boardMode="play"
        onModeSwitch={onModeSwitch}
      />
    );
    fireEvent.click(screen.getByRole('tab', { name: /explore/i }));
    expect(onModeSwitch).toHaveBeenCalledWith('explore');
  });

  it('calls onModeSwitch when vs Stockfish tab clicked', () => {
    const onModeSwitch = jest.fn();
    render(
      <Header {...baseProps} panel="position" onModeSwitch={onModeSwitch} />
    );
    fireEvent.click(screen.getByRole('tab', { name: /stockfish/i }));
    expect(onModeSwitch).toHaveBeenCalledWith('play');
  });

  it('calls onRandomize when randomize button clicked', () => {
    const onRandomize = jest.fn();
    render(<Header {...baseProps} onRandomize={onRandomize} />);
    fireEvent.click(screen.getByTitle('Randomize'));
    expect(onRandomize).toHaveBeenCalled();
  });

  it('calls onReset when reset button clicked', () => {
    const onReset = jest.fn();
    render(<Header {...baseProps} onReset={onReset} />);
    fireEvent.click(screen.getByTitle('Reset'));
    expect(onReset).toHaveBeenCalled();
  });

  it('to match snapshot', () => {
    const { container } = render(<Header {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
