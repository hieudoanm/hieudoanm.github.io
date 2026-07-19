import { render, screen } from '@testing-library/react';
import HistoryPage from '../page';

describe('HistoryPage', () => {
  it('renders a hub linking to both history games', () => {
    render(<HistoryPage />);
    expect(
      screen.getByRole('heading', { name: 'History games' })
    ).toBeInTheDocument();

    const myth = screen.getByTestId('history-myth-vs-fact');
    expect(myth).toHaveTextContent('Myth vs Fact');
    expect(myth.getAttribute('href')).toContain('/history/myth-vs-fact');

    const years = screen.getByTestId('history-through-the-years');
    expect(years).toHaveTextContent('Through the Years');
    expect(years.getAttribute('href')).toContain('/history/through-the-years');
  });
});
