import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EnginePanel } from '../components/EnginePanel';

jest.mock('chart.js', () => ({
  Chart: { register: jest.fn() },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Tooltip: jest.fn(),
}));

jest.mock('react-chartjs-2', () => ({
  Line: () => null,
}));

const props = (overrides: Record<string, unknown> = {}) => ({
  boardMode: 'explore' as const,
  whiteEval: null,
  evalPercent: 50,
  statusLabel: null,
  depth: 15,
  side: 'white' as const,
  odds: 'none' as const,
  lines: null,
  linesBusy: false,
  graphPoints: null,
  graphBusy: false,
  onModeSwitch: jest.fn(),
  onDepthChange: jest.fn(),
  onSideChange: jest.fn(),
  onOddsChange: jest.fn(),
  onAnalyzeLines: jest.fn(),
  onComputeGraph: jest.fn(),
  ...overrides,
});

describe('EnginePanel', () => {
  it('renders Stockfish label and Off badge in explore mode', () => {
    render(<EnginePanel {...props()} />);
    expect(screen.getByText('Stockfish 18')).toBeTruthy();
    expect(screen.getByText('Off')).toBeTruthy();
  });

  it('renders Active badge in play mode', () => {
    render(<EnginePanel {...props({ boardMode: 'play' })} />);
    expect(screen.getByText('Active')).toBeTruthy();
  });

  it('calls onModeSwitch when engine button is clicked', async () => {
    const p = props();
    render(<EnginePanel {...p} />);
    await userEvent.click(screen.getByText(/Start Engine/));
    expect(p.onModeSwitch).toHaveBeenCalledWith('play');
  });

  it('calls onModeSwitch with explore when stopping engine', async () => {
    const p = props({ boardMode: 'play' });
    render(<EnginePanel {...p} />);
    await userEvent.click(screen.getByText(/Stop Engine/));
    expect(p.onModeSwitch).toHaveBeenCalledWith('explore');
  });

  it('displays evaluation value when in play mode', () => {
    render(<EnginePanel {...props({ boardMode: 'play', whiteEval: 35 })} />);
    expect(screen.getByText('+0.35')).toBeTruthy();
  });

  it('displays negative evaluation', () => {
    render(<EnginePanel {...props({ boardMode: 'play', whiteEval: -200 })} />);
    expect(screen.getByText('-2.00')).toBeTruthy();
  });

  it('calls onAnalyzeLines when button is clicked', async () => {
    const p = props();
    render(<EnginePanel {...p} />);
    await userEvent.click(screen.getByText(/Analyze Lines/));
    expect(p.onAnalyzeLines).toHaveBeenCalled();
  });

  it('calls onComputeGraph when button is clicked', async () => {
    const p = props();
    render(<EnginePanel {...p} />);
    await userEvent.click(screen.getByText(/Evaluation Graph/));
    expect(p.onComputeGraph).toHaveBeenCalled();
  });

  it('shows statusLabel when provided', () => {
    render(<EnginePanel {...props({ statusLabel: 'Check!' })} />);
    expect(screen.getByText('Check!')).toBeTruthy();
  });

  it('shows reset button in play mode', () => {
    render(<EnginePanel {...props({ boardMode: 'play' })} />);
    expect(screen.getByText(/Reset Game/)).toBeTruthy();
  });

  it('shows analysis lines when provided', () => {
    const lines = [
      { san: 'e4', move: {}, scoreCp: 30, mate: null },
      { san: 'd4', move: {}, scoreCp: 20, mate: null },
    ];
    render(<EnginePanel {...props({ lines })} />);
    expect(screen.getByText(/1\. e4/)).toBeTruthy();
    expect(screen.getByText(/2\. d4/)).toBeTruthy();
  });

  it('shows mate score in analysis lines', () => {
    const lines = [{ san: 'Qh7', move: {}, scoreCp: 99900, mate: 2 }];
    render(<EnginePanel {...props({ lines })} />);
    expect(screen.getByText(/M\+?2/)).toBeTruthy();
  });

  it('shows negative mate score', () => {
    const lines = [{ san: 'Qh7', move: {}, scoreCp: -99900, mate: -3 }];
    render(<EnginePanel {...props({ lines })} />);
    expect(screen.getByText(/M-3/)).toBeTruthy();
  });

  it('disables analyze button when busy', () => {
    render(<EnginePanel {...props({ linesBusy: true })} />);
    expect(screen.getByText('Analyzing…')).toBeDisabled();
  });

  it('disables compute button when busy', () => {
    render(<EnginePanel {...props({ graphBusy: true })} />);
    expect(screen.getByText('Computing…')).toBeDisabled();
  });
});
