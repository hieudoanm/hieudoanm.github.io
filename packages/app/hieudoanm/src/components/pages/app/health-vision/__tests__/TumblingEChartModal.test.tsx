import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TumblingEChartModal } from '../TumblingEChartModal';

jest.mock('../TumblingEChartModal/utils/chart', () => ({
  generateChart: jest.fn().mockReturnValue([
    { size: 'text-[9rem]', count: 1, label: '20/200', directions: ['up'] },
    {
      size: 'text-[6rem]',
      count: 2,
      label: '20/100',
      directions: ['right', 'down'],
    },
    {
      size: 'text-[4.5rem]',
      count: 3,
      label: '20/70',
      directions: ['left', 'up', 'down'],
    },
  ]),
}));

describe('TumblingEChartModal', () => {
  it('should render the chart component', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    expect(screen.getByText(/Tumbling E Visual Acuity/)).toBeInTheDocument();
  });

  it('should display the current line label', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    expect(screen.getByText('20/200')).toBeInTheDocument();
  });

  it('should display E character', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    const es = screen.getAllByText('E');
    expect(es.length).toBeGreaterThanOrEqual(1);
  });

  it('should navigate to next line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });

  it('should navigate to previous line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });

  it('should toggle reveal', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    const btn = screen.getByText('Reveal Answer');
    fireEvent.click(btn);
    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Hide Answer'));
    expect(screen.getByText('Reveal Answer')).toBeInTheDocument();
  });

  it('should show rotation direction when revealed', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Reveal Answer'));
    expect(screen.getByText('↑')).toBeInTheDocument();
  });

  it('should score direction correctly - up arrow button shown for count=1 line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    const upBtn = screen.getByText('↑');
    fireEvent.click(upBtn);
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<TumblingEChartModal onClose={onClose} />);
    fireEvent.click(screen.getByText('✕'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should navigate with ArrowDown key when not revealed', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });

  it('should answer with ArrowUp key for single-E line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowUp' });
    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('should not go below first line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    const prevBtn = screen.getByText('Prev');
    expect(prevBtn).toBeDisabled();
  });

  it('should not go beyond last line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('should reset scores', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('↑'));
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.queryByText(/correct/)).not.toBeInTheDocument();
  });

  it('should answer with left direction button on single-E line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('←'));
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('should answer with ArrowRight key for single-E line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('should answer with ArrowLeft key for single-E line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('should answer with right direction button', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('→'));
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('should answer with down direction button', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('↓'));
    expect(screen.getByText('✗')).toBeInTheDocument();
  });

  it('should not navigate on ArrowDown when revealed', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Reveal Answer'));
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByText('20/200')).toBeInTheDocument();
  });

  it('should navigate with ArrowDown key on multi-E line', () => {
    render(<TumblingEChartModal onClose={jest.fn()} />);
    fireEvent.keyDown(window, { key: 'ArrowDown' });
    expect(screen.getByText('20/100')).toBeInTheDocument();
  });
});
