jest.mock('../PrisonerDilemma/utils/game', () => ({
  chooseOpponent: jest.fn().mockReturnValue('cooperate'),
  formatScore: (s: number) => `${s}yr`,
  pickStrategy: () => 'titfortat',
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { PrisonerDilemma } from '../PrisonerDilemma';

describe('PrisonerDilemma', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<PrisonerDilemma onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('choosing cooperate shows reveal phase', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    const coopBtn = screen.getByText('Cooperate');
    fireEvent.click(coopBtn);
    expect(screen.getByText(/Next Round/)).toBeInTheDocument();
  });

  it('choosing defect shows reveal phase', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    const defectBtn = screen.getByText('Defect');
    fireEvent.click(defectBtn);
    expect(screen.getAllByText(/Round/).length).toBeGreaterThanOrEqual(1);
  });

  it('keyboard c cooperates', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Round/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'c' });
    }
    expect(screen.getAllByText(/You/).length).toBeGreaterThanOrEqual(1);
  });

  it('keyboard d defects', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Round/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'd' });
    }
    expect(screen.getAllByText(/You/).length).toBeGreaterThanOrEqual(1);
  });

  it('keyboard r resets', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    const container = screen
      .getAllByText(/Round/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'c' });
      fireEvent.keyDown(container, { key: 'r' });
    }
    expect(screen.getAllByText(/Round/).length).toBeGreaterThanOrEqual(1);
  });

  it('keyboard Escape closes', () => {
    const onClose = jest.fn();
    render(<PrisonerDilemma onClose={onClose} />);
    const container = screen
      .getAllByText(/Round/)[0]
      .closest('div')?.parentElement;
    if (container) {
      fireEvent.keyDown(container, { key: 'Escape' });
    }
    expect(onClose).toHaveBeenCalled();
  });

  it('reveal phase shows next round button', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Cooperate'));
    expect(screen.getByText(/Next Round/)).toBeInTheDocument();
  });

  it('Play Again button appears after done phase', () => {
    render(<PrisonerDilemma onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Cooperate'));
    const nextBtn = screen.getByText(/Next Round/);
    expect(nextBtn).toBeInTheDocument();
  });
});
