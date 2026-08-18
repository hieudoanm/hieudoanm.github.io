import { fireEvent, render, screen } from '@testing-library/react';
import { EnginePanel } from '../EnginePanel';
import type { BoardMode } from '../../types';

const baseProps = {
  boardMode: 'explore' as BoardMode,
  whiteEval: null,
  evalPercent: 50,
  statusLabel: null as string | null,
  onModeSwitch: jest.fn(),
};

describe('EnginePanel', () => {
  it('shows Stockfish 18 heading', () => {
    render(<EnginePanel {...baseProps} />);
    expect(screen.getByText('Stockfish 18')).toBeInTheDocument();
  });

  it('shows Off badge in explore mode', () => {
    render(<EnginePanel {...baseProps} />);
    expect(screen.getByText('Off')).toBeInTheDocument();
  });

  it('shows Active badge in play mode', () => {
    render(<EnginePanel {...baseProps} boardMode="play" />);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows dash eval in explore mode', () => {
    render(<EnginePanel {...baseProps} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows numeric eval in play mode', () => {
    render(<EnginePanel {...baseProps} boardMode="play" whiteEval={50} />);
    expect(screen.getByText('+0.50')).toBeInTheDocument();
  });

  it('shows negative eval correctly', () => {
    render(<EnginePanel {...baseProps} boardMode="play" whiteEval={-150} />);
    expect(screen.getByText('-1.50')).toBeInTheDocument();
  });

  it('shows Start Engine button in explore mode', () => {
    render(<EnginePanel {...baseProps} />);
    expect(
      screen.getByRole('button', { name: /start engine/i })
    ).toBeInTheDocument();
  });

  it('shows Stop Engine button in play mode', () => {
    render(<EnginePanel {...baseProps} boardMode="play" />);
    expect(
      screen.getByRole('button', { name: /stop engine/i })
    ).toBeInTheDocument();
  });

  it('calls onModeSwitch with play when starting engine', () => {
    const onModeSwitch = jest.fn();
    render(<EnginePanel {...baseProps} onModeSwitch={onModeSwitch} />);
    fireEvent.click(screen.getByRole('button', { name: /start engine/i }));
    expect(onModeSwitch).toHaveBeenCalledWith('play');
  });

  it('calls onModeSwitch with explore when stopping engine', () => {
    const onModeSwitch = jest.fn();
    render(
      <EnginePanel
        {...baseProps}
        boardMode="play"
        onModeSwitch={onModeSwitch}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /stop engine/i }));
    expect(onModeSwitch).toHaveBeenCalledWith('explore');
  });

  it('shows status label when provided', () => {
    render(<EnginePanel {...baseProps} statusLabel="Checkmate!" />);
    expect(screen.getByText('Checkmate!')).toBeInTheDocument();
  });

  it('shows Reset Game button in play mode', () => {
    render(<EnginePanel {...baseProps} boardMode="play" />);
    expect(
      screen.getByRole('button', { name: /reset game/i })
    ).toBeInTheDocument();
  });

  it('hides Reset Game button in explore mode', () => {
    render(<EnginePanel {...baseProps} boardMode="explore" />);
    expect(
      screen.queryByRole('button', { name: /reset game/i })
    ).not.toBeInTheDocument();
  });

  it('shows 0.00 eval for zero', () => {
    render(<EnginePanel {...baseProps} boardMode="play" whiteEval={0} />);
    expect(screen.getByText('0.00')).toBeInTheDocument();
  });

  it('renders Black and White labels', () => {
    render(<EnginePanel {...baseProps} />);
    expect(screen.getByText('Black')).toBeInTheDocument();
    expect(screen.getByText('White')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<EnginePanel {...baseProps} />);
    expect(container).toMatchSnapshot();
  });
});
