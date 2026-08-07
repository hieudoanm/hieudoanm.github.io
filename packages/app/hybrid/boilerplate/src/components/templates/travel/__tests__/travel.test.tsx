import { fireEvent, render, screen, within } from '@testing-library/react';
import { BookingsTemplate } from '../BookingsTemplate';
import { BookingSearchTemplate } from '../BookingSearchTemplate';
import { DestinationsTemplate } from '../DestinationsTemplate';
import { HotelDetailTemplate } from '../HotelDetailTemplate';
import { PackingListTemplate } from '../PackingListTemplate';
import { TravelGuidesTemplate } from '../TravelGuidesTemplate';
import { TravelStoriesTemplate } from '../TravelStoriesTemplate';
import { TripPlannerTemplate } from '../TripPlannerTemplate';
import BookingsPage from '@/app/(main)/travel/bookings/page';
import DestinationsPage from '@/app/(main)/travel/destinations/page';
import GuidesPage from '@/app/(main)/travel/guides/page';
import HotelPage from '@/app/(main)/travel/hotel/page';
import PackingPage from '@/app/(main)/travel/packing/page';
import PlannerPage from '@/app/(main)/travel/planner/page';
import SearchPage from '@/app/(main)/travel/search/page';
import StoriesPage from '@/app/(main)/travel/stories/page';

describe('DestinationsTemplate', () => {
  it('renders destinations with a count summary', () => {
    render(<DestinationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Destinations' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next trip.')).toBeInTheDocument();
    expect(screen.getByText('9 destinations')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('from $840')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(9);
  });

  it('filters destinations by region tab', () => {
    render(<DestinationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Europe' }));
    expect(screen.getByText('3 destinations')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Hanoi')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Asia' }));
    expect(screen.getByText('3 destinations')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
  });

  it('saves a destination card', () => {
    render(<DestinationsTemplate />);
    const card = screen.getByText('Paris').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(within(card as HTMLElement).getByText('Saved')).toHaveClass(
      'badge-success'
    );
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(
      within(card as HTMLElement).queryByText('Saved')
    ).not.toBeInTheDocument();
  });
});

describe('TripPlannerTemplate', () => {
  it('renders day tabs with activities', () => {
    render(<TripPlannerTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Trip Planner' })
    ).toBeInTheDocument();
    expect(screen.getByText('Plan your itinerary.')).toBeInTheDocument();
    expect(screen.getByText('3 days')).toBeInTheDocument();
    expect(screen.getAllByText('Day 1')).toHaveLength(2);
    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.getByText('Day 3')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Ho Chi Minh Mausoleum')).toBeInTheDocument();
    expect(screen.getByText('Ba Dinh')).toBeInTheDocument();
  });

  it('adds an activity to the active day', () => {
    render(<TripPlannerTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add activity' }));
    expect(screen.getByText('New activity')).toBeInTheDocument();
    expect(screen.getByText('4 activities')).toBeInTheDocument();
  });

  it('removes an activity from the active day', () => {
    render(<TripPlannerTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.queryByText('Ho Chi Minh Mausoleum')).not.toBeInTheDocument();
    expect(screen.getByText('Pho Street Lunch')).toBeInTheDocument();
  });
});

describe('BookingSearchTemplate', () => {
  it('renders hotel results by default', () => {
    render(<BookingSearchTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Booking Search' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find hotels and flights.')).toBeInTheDocument();
    expect(screen.getByLabelText('Search bookings')).toBeInTheDocument();
    expect(screen.getByText('4 results')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.getByText('$120/night')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
  });

  it('switches to flight results', () => {
    render(<BookingSearchTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Flights' }));
    expect(screen.getByText('3 results')).toBeInTheDocument();
    expect(screen.getByText('Vietnam Airlines')).toBeInTheDocument();
    expect(screen.getByText('Hanoi → Tokyo')).toBeInTheDocument();
    expect(screen.getByText('$520')).toBeInTheDocument();
    expect(screen.queryByText('Hotel Sunset')).not.toBeInTheDocument();
  });

  it('filters results and shows the empty state', () => {
    render(<BookingSearchTemplate />);
    fireEvent.change(screen.getByLabelText('Search bookings'), {
      target: { value: 'sunset' },
    });
    expect(screen.getByText('1 results')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search bookings'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('0 results')).toBeInTheDocument();
    expect(screen.getByText('No results for "zzz"')).toBeInTheDocument();
  });
});

describe('HotelDetailTemplate', () => {
  it('renders hotel details with amenities', () => {
    render(<HotelDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Hotel' })).toBeInTheDocument();
    expect(screen.getByText('Hotel details.')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('4.6 rating')).toBeInTheDocument();
    expect(screen.getByText('$120/night')).toBeInTheDocument();
    expect(screen.getByText('Free WiFi')).toBeInTheDocument();
    expect(screen.getByText('Pool')).toBeInTheDocument();
    expect(screen.getByText('Gym')).toBeInTheDocument();
    expect(screen.getByText('Breakfast')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Favorite' })
    ).toBeInTheDocument();
  });

  it('toggles the book state', () => {
    render(<HotelDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    expect(screen.getByText('Booked')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Book' }));
    expect(screen.queryByText('Booked')).not.toBeInTheDocument();
  });

  it('toggles the favorite state', () => {
    render(<HotelDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.getByText('Favorited')).toHaveClass('badge-error');
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.queryByText('Favorited')).not.toBeInTheDocument();
  });
});

describe('TravelGuidesTemplate', () => {
  it('renders guides with a count summary', () => {
    render(<TravelGuidesTemplate />);
    expect(screen.getByRole('heading', { name: 'Guides' })).toBeInTheDocument();
    expect(screen.getByText('Travel tips and guides.')).toBeInTheDocument();
    expect(screen.getByText('5 guides')).toBeInTheDocument();
    expect(screen.getByText('Street Food Tour of Hanoi')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('8 min read')).toBeInTheDocument();
    expect(screen.getAllByText('Culture')).toHaveLength(2);
    expect(screen.getAllByText('Outdoors')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Save guide' })).toHaveLength(
      5
    );
  });

  it('saves a guide card', () => {
    render(<TravelGuidesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Save guide' })[0]);
    expect(screen.getAllByText('Saved')).toHaveLength(1);
    expect(screen.getByText('Saved')).toHaveClass('badge-success');
  });
});

describe('BookingsTemplate', () => {
  it('renders bookings with status badges', () => {
    render(<BookingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Bookings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your reservations.')).toBeInTheDocument();
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
    expect(screen.getByText('Hotel Sunset')).toBeInTheDocument();
    expect(screen.getByText('Aug 20, 2026')).toBeInTheDocument();
    expect(screen.getByText('Flight HN-TYO')).toBeInTheDocument();
    expect(screen.getByText('Hanoi → Tokyo')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('cancels a pending booking', () => {
    render(<BookingsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getByText('Cancelled')).toHaveClass('badge-error');
    expect(screen.getAllByText('Pending')).toHaveLength(1);
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
  });
});

describe('PackingListTemplate', () => {
  it('renders items with category badges', () => {
    render(<PackingListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Packing List' })
    ).toBeInTheDocument();
    expect(screen.getByText('What to pack.')).toBeInTheDocument();
    expect(screen.getByText('6 items')).toBeInTheDocument();
    expect(screen.getByText('0 of 6 packed')).toBeInTheDocument();
    expect(screen.getByLabelText('Passport')).toBeInTheDocument();
    expect(screen.getByLabelText('Camera')).toBeInTheDocument();
    expect(screen.getAllByText('Essentials')).toHaveLength(2);
    expect(screen.getAllByText('Tech')).toHaveLength(2);
  });

  it('toggles a checkbox and updates the packed summary', () => {
    render(<PackingListTemplate />);
    fireEvent.click(screen.getByLabelText('Passport'));
    expect(screen.getByText('1 of 6 packed')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Passport'));
    expect(screen.getByText('0 of 6 packed')).toBeInTheDocument();
  });

  it('adds an item and tracks its packed state', () => {
    render(<PackingListTemplate />);
    fireEvent.change(screen.getByLabelText('Item name'), {
      target: { value: 'Sunglasses' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('7 items')).toBeInTheDocument();
    expect(screen.getByText('0 of 7 packed')).toBeInTheDocument();
    expect(screen.getByLabelText('Sunglasses')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Sunglasses'));
    expect(screen.getByText('1 of 7 packed')).toBeInTheDocument();
  });
});

describe('TravelStoriesTemplate', () => {
  it('renders stories with like counts', () => {
    render(<TravelStoriesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Stories' })
    ).toBeInTheDocument();
    expect(screen.getByText('Community adventures.')).toBeInTheDocument();
    expect(screen.getByText('4 stories')).toBeInTheDocument();
    expect(screen.getByText('The Long Way Home')).toBeInTheDocument();
    expect(screen.getByText('Mai Nguyen')).toBeInTheDocument();
    expect(screen.getByText('Hanoi, Vietnam')).toBeInTheDocument();
    expect(screen.getByText('128 likes')).toBeInTheDocument();
    expect(screen.getByText('96 likes')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Like' })).toHaveLength(4);
  });

  it('increments the like count on a story', () => {
    render(<TravelStoriesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Like' })[0]);
    expect(screen.getByText('129 likes')).toBeInTheDocument();
    expect(screen.getByText('96 likes')).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole('button', { name: 'Like' })[0]);
    expect(screen.getByText('130 likes')).toBeInTheDocument();
  });
});

describe('Travel pages', () => {
  it('renders the destinations page', () => {
    render(<DestinationsPage />);
    expect(screen.getByText('9 destinations')).toBeInTheDocument();
  });

  it('renders the trip planner page', () => {
    render(<PlannerPage />);
    expect(screen.getByText('3 days')).toBeInTheDocument();
  });

  it('renders the booking search page', () => {
    render(<SearchPage />);
    expect(screen.getByText('4 results')).toBeInTheDocument();
  });

  it('renders the hotel detail page', () => {
    render(<HotelPage />);
    expect(screen.getByText('4.6 rating')).toBeInTheDocument();
  });

  it('renders the travel guides page', () => {
    render(<GuidesPage />);
    expect(screen.getByText('5 guides')).toBeInTheDocument();
  });

  it('renders the bookings page', () => {
    render(<BookingsPage />);
    expect(screen.getByText('4 bookings')).toBeInTheDocument();
  });

  it('renders the packing list page', () => {
    render(<PackingPage />);
    expect(screen.getByText('6 items')).toBeInTheDocument();
  });

  it('renders the travel stories page', () => {
    render(<StoriesPage />);
    expect(screen.getByText('4 stories')).toBeInTheDocument();
  });
});
