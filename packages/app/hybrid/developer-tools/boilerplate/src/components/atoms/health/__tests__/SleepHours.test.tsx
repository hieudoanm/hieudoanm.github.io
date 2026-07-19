import { render, screen } from '@testing-library/react';
import { SleepHours } from '../SleepHours';

describe('SleepHours', () => {
  it('renders the sleep hours with one decimal', () => {
    render(<SleepHours hours={7.5} />);
    expect(screen.getByTestId('sleep-hours')).toHaveTextContent('7.5');
    expect(screen.getByTestId('sleep-hours')).toHaveTextContent('h');
  });

  it('renders the default goal', () => {
    render(<SleepHours hours={7.5} />);
    expect(screen.getByTestId('sleep-hours')).toHaveTextContent('Goal 8h');
  });

  it('honors a custom goal', () => {
    render(<SleepHours hours={7.5} goal={9} />);
    expect(screen.getByTestId('sleep-hours')).toHaveTextContent('Goal 9h');
  });

  it('formats whole hours with one decimal', () => {
    render(<SleepHours hours={8} />);
    expect(screen.getByTestId('sleep-hours')).toHaveTextContent('8.0');
  });
});
