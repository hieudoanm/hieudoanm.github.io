import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { LogMARChart } from '../LogMARChartModal';

jest.mock('../LogMARChartModal/utils/chart', () => ({
  generateChart: jest.fn().mockReturnValue([
    {
      size: 'text-[2rem]',
      logmar: '0.0',
      snellen: '6/6',
      letters: 'ABC',
      score: 0.1,
    },
    {
      size: 'text-[3rem]',
      logmar: '0.1',
      snellen: '6/7.5',
      letters: 'DEF',
      score: 0.1,
    },
    {
      size: 'text-[4rem]',
      logmar: '0.2',
      snellen: '6/9.5',
      letters: 'GHI',
      score: 0.1,
    },
  ]),
}));

describe('LogMARChart', () => {
  it('should render the chart component', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    expect(screen.getByText(/LogMAR Visual Acuity/)).toBeInTheDocument();
  });

  it('should display LogMAR value', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    expect(screen.getByText('0.0')).toBeInTheDocument();
  });

  it('should display Snellen value', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    expect(screen.getByText('6/6')).toBeInTheDocument();
  });

  it('should display line number', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    expect(screen.getByText(/1 \/ 3/)).toBeInTheDocument();
  });

  it('should display letters', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    expect(screen.getByText('A B C')).toBeInTheDocument();
  });

  it('should navigate to next line', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('D E F')).toBeInTheDocument();
  });

  it('should navigate to previous line', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('D E F')).toBeInTheDocument();
    expect(screen.getByText(/2 \/ 3/)).toBeInTheDocument();
  });

  it('should toggle reveal', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    const btn = screen.getByText('Reveal Answer');
    fireEvent.click(btn);
    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.getByText('Reveal Answer')).toBeInTheDocument();
  });

  it('should score letters correctly', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    const buttons = screen.getAllByText('3');
    const scoreBtn = buttons[buttons.length - 1];
    fireEvent.click(scoreBtn);
    expect(screen.getByText(/1 lines/)).toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<LogMARChart onClose={onClose} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should navigate with ArrowDown key', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByText('D E F')).toBeInTheDocument();
  });

  it('should navigate with ArrowUp key', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(screen.getByText('A B C')).toBeInTheDocument();
  });

  it('should not go below first line', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeDisabled();
  });

  it('should not go beyond last line', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should reset scores', () => {
    render(<LogMARChart onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.queryByText(/1 lines/)).not.toBeInTheDocument();
  });
});
