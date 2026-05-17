jest.mock('../PokerModal/utils/poker', () => ({
  runSimulation: jest.fn().mockReturnValue({ hero: 3000, tie: 500 }),
}));

import { act, render, fireEvent, screen } from '@testing-library/react';
import { PokerModal } from '../PokerModal';
import { ITERATIONS } from '../PokerModal/constants';
import { runSimulation } from '../PokerModal/utils/poker';

const mockRunSimulation = runSimulation as jest.Mock;

const getGridButtons = (container: HTMLElement) => {
  const buttons = container.querySelectorAll('button');
  return Array.from(buttons).filter(
    (b) => !b.classList.contains('btn') && /[♠♣♥♦]/.test(b.textContent || '')
  );
};

const selectCards = (container: HTMLElement) => {
  const grid = getGridButtons(container);
  for (let i = 0; i < 2; i++) fireEvent.click(grid[i]);
  for (let i = 52; i < 55; i++) fireEvent.click(grid[i]);
};

const runCalc = async (container: HTMLElement) => {
  const calcBtn = screen.getByText('Calculate Equity');
  await act(async () => {
    fireEvent.click(calcBtn);
    await new Promise((r) => setTimeout(r, 200));
  });
};

describe('PokerModal', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    mockRunSimulation.mockReturnValue({ hero: 3000, tie: 500 });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('shows player selection message', () => {
    render(<PokerModal onClose={jest.fn()} />);
    expect(screen.getByText(/Select your hand/)).toBeInTheDocument();
  });

  it('shows Calculate Equity button', () => {
    render(<PokerModal onClose={jest.fn()} />);
    expect(screen.getByText('Calculate Equity')).toBeInTheDocument();
  });

  it('calculate button is disabled when no cards selected', () => {
    render(<PokerModal onClose={jest.fn()} />);
    expect(screen.getByText('Calculate Equity')).toBeDisabled();
  });

  it('selects cards and enables calculate', () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    const calcBtn = screen.getByText('Calculate Equity');
    expect(calcBtn).not.toBeDisabled();
  });

  it('button is disabled while calculating', () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    const calcBtn = screen.getByText('Calculate Equity');
    fireEvent.click(calcBtn);
    expect(calcBtn).toBeDisabled();
  });

  it('shows loading state while calculating', () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    const calcBtn = screen.getByText('Calculate Equity');
    fireEvent.click(calcBtn);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });

  it('shows results after calculation', async () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    expect(container.querySelector('.space-y-2')).toBeInTheDocument();
  });

  it('displays equity percentage value', async () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    expect(container.querySelector('.space-y-2')?.textContent).toContain('%');
  });

  it('shows win and tie stats', async () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    expect(screen.getByText(/Win/)).toBeInTheDocument();
    expect(screen.getByText(/Tie/)).toBeInTheDocument();
  });

  it('button returns to Calculate after completion', async () => {
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    expect(screen.getByText('Calculate Equity')).toBeInTheDocument();
  });

  it('equity color is green when > 50%', async () => {
    mockRunSimulation.mockReturnValue({ hero: 3000, tie: 500 });
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    const equitySpan = container.querySelector(
      '.space-y-2 .font-normal'
    ) as HTMLElement;
    expect(equitySpan?.textContent).toContain('%');
    expect(equitySpan?.style.color).toBe('rgb(34, 197, 94)');
  });

  it('equity color is yellow when between 25% and 50%', async () => {
    mockRunSimulation.mockReturnValue({ hero: 1300, tie: 0 });
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    const equitySpan = container.querySelector(
      '.space-y-2 .font-normal'
    ) as HTMLElement;
    expect(equitySpan?.textContent).toContain('%');
    expect(equitySpan?.style.color).toBe('rgb(245, 158, 11)');
  });

  it('equity color is red when <= 25%', async () => {
    mockRunSimulation.mockReturnValue({ hero: 500, tie: 0 });
    const { container } = render(<PokerModal onClose={jest.fn()} />);
    selectCards(container);
    await runCalc(container);
    const equitySpan = container.querySelector(
      '.space-y-2 .font-normal'
    ) as HTMLElement;
    expect(equitySpan?.textContent).toContain('%');
    expect(equitySpan?.style.color).toBe('rgb(239, 68, 68)');
  });

  it('player count buttons work', () => {
    render(<PokerModal onClose={jest.fn()} />);
    const btn2 = screen.getByText('2');
    fireEvent.click(btn2);
    const btn9 = screen.getByText('9');
    fireEvent.click(btn9);
  });

  it('player count shows active state', () => {
    render(<PokerModal onClose={jest.fn()} />);
    const btn3 = screen.getByText('3');
    fireEvent.click(btn3);
    expect(btn3.classList.contains('btn-primary')).toBe(true);
  });

  it('shows Monte Carlo simulation note', () => {
    render(<PokerModal onClose={jest.fn()} />);
    expect(
      screen.getByText(
        new RegExp(`Monte Carlo simulation.*${ITERATIONS.toLocaleString()}`)
      )
    ).toBeInTheDocument();
  });
});
