import { render, screen } from '@testing-library/react';
import { ItineraryList } from '../ItineraryList';

describe('ItineraryList', () => {
  const items = [
    { time: '09:00', title: 'Hoan Kiem Lake', detail: 'Morning walk' },
    { time: '12:00', title: 'Lunch at Old Quarter' },
  ];

  it('renders each itinerary item with time', () => {
    render(<ItineraryList items={items} />);
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Hoan Kiem Lake')).toBeInTheDocument();
    expect(screen.getByText('12:00')).toBeInTheDocument();
    expect(screen.getByText('Lunch at Old Quarter')).toBeInTheDocument();
  });

  it('renders detail text when present', () => {
    render(<ItineraryList items={items} />);
    expect(screen.getByText('Morning walk')).toBeInTheDocument();
  });

  it('omits detail when not provided', () => {
    render(<ItineraryList items={[items[1]]} />);
    expect(screen.queryByText('Morning walk')).not.toBeInTheDocument();
  });

  it('renders an empty list for no items', () => {
    const { container } = render(<ItineraryList items={[]} />);
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li').length).toBe(0);
  });
});
