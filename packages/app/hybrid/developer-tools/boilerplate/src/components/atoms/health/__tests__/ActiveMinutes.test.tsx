import { render, screen } from '@testing-library/react';
import { ActiveMinutes } from '../ActiveMinutes';

describe('ActiveMinutes', () => {
  it('renders the active minutes with unit', () => {
    render(<ActiveMinutes minutes={45} />);
    expect(screen.getByTestId('active-minutes')).toHaveTextContent('45');
    expect(screen.getByTestId('active-minutes')).toHaveTextContent('min');
  });

  it('renders the default goal', () => {
    render(<ActiveMinutes minutes={45} />);
    expect(screen.getByTestId('active-minutes')).toHaveTextContent(
      'goal 30min'
    );
  });

  it('honors a custom goal', () => {
    render(<ActiveMinutes minutes={45} goal={60} />);
    expect(screen.getByTestId('active-minutes')).toHaveTextContent(
      'goal 60min'
    );
  });

  it('handles zero minutes', () => {
    render(<ActiveMinutes minutes={0} />);
    expect(screen.getByTestId('active-minutes')).toHaveTextContent('0');
  });
});
