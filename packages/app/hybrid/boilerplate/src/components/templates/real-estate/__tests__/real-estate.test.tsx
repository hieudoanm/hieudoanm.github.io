import { fireEvent, render, screen, within } from '@testing-library/react';
import { PropertyListingsTemplate } from '../PropertyListingsTemplate';
import { PropertyDetailTemplate } from '../PropertyDetailTemplate';
import { SearchFiltersTemplate } from '../SearchFiltersTemplate';
import { MapViewTemplate } from '../MapViewTemplate';
import { SavedPropertiesTemplate } from '../SavedPropertiesTemplate';
import { MortgageCalculatorTemplate } from '../MortgageCalculatorTemplate';
import { OpenHousesTemplate } from '../OpenHousesTemplate';
import { AgentProfileTemplate } from '../AgentProfileTemplate';
import ListingsPage from '@/app/(templates)/real-estate/listings/page';
import PropertyPage from '@/app/(templates)/real-estate/property/page';
import SearchPage from '@/app/(templates)/real-estate/search/page';
import MapPage from '@/app/(templates)/real-estate/map/page';
import SavedPage from '@/app/(templates)/real-estate/saved/page';
import MortgagePage from '@/app/(templates)/real-estate/mortgage/page';
import OpenHousesPage from '@/app/(templates)/real-estate/open-houses/page';
import AgentsPage from '@/app/(templates)/real-estate/agents/page';

describe('PropertyListingsTemplate', () => {
  it('renders property cards with status badges', () => {
    render(<PropertyListingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Property Listings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse homes for sale.')).toBeInTheDocument();
    expect(screen.getByText('6 properties')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getAllByText('For Sale')).toHaveLength(5);
    expect(screen.getByText('Sold')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove')).toBeInTheDocument();
    expect(screen.getByText('4 beds')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });

  it('saves a property card and toggles back', () => {
    render(<PropertyListingsTemplate />);
    const card = screen.getByText('Maple Grove Family Home').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(screen.getAllByText('Saved')).toHaveLength(1);
    expect(screen.getByText('Saved')).toHaveClass('badge-success');
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(screen.queryAllByText('Saved')).toHaveLength(0);
  });
});

describe('PropertyDetailTemplate', () => {
  it('renders property details with a features grid', () => {
    render(<PropertyDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Property Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('A closer look at this home.')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getByText('Beds')).toBeInTheDocument();
    expect(screen.getByText('Baths')).toBeInTheDocument();
    expect(screen.getByText('Sqft')).toBeInTheDocument();
    expect(screen.getByText('Year Built')).toBeInTheDocument();
    expect(screen.getByText('2,400')).toBeInTheDocument();
    expect(screen.getByText('3 open houses this month')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Schedule tour' })
    ).toBeInTheDocument();
  });

  it('toggles the schedule tour state', () => {
    render(<PropertyDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Schedule tour' }));
    expect(screen.getByText('Tour scheduled')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Schedule tour' }));
    expect(screen.queryByText('Tour scheduled')).not.toBeInTheDocument();
  });
});

describe('SearchFiltersTemplate', () => {
  it('renders the search form and full results', () => {
    render(<SearchFiltersTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Search Filters' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next property.')).toBeInTheDocument();
    expect(screen.getByText('12 properties found')).toBeInTheDocument();
    expect(screen.getByLabelText('Location')).toBeInTheDocument();
    expect(screen.getByLabelText('Price range')).toBeInTheDocument();
    expect(screen.getByLabelText('Bedrooms')).toBeInTheDocument();
    expect(screen.getByLabelText('Type')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('Riverside Condo')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Apply filters' })
    ).toBeInTheDocument();
  });

  it('filters results by location and price range', () => {
    render(<SearchFiltersTemplate />);
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: 'Downtown' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }));
    expect(screen.getByText('2 properties found')).toBeInTheDocument();
    expect(screen.getByText('Downtown Penthouse')).toBeInTheDocument();
    expect(
      screen.queryByText('Maple Grove Family Home')
    ).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Location'), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByLabelText('Price range'), {
      target: { value: 'Over $1M' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }));
    expect(screen.getByText('2 properties found')).toBeInTheDocument();
    expect(screen.getByText('Birchwood Estate')).toBeInTheDocument();
    expect(screen.queryByText('Riverside Condo')).not.toBeInTheDocument();
  });
});

describe('MapViewTemplate', () => {
  it('renders the map with neighborhoods', () => {
    render(<MapViewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Map View' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Explore neighborhoods by price.')
    ).toBeInTheDocument();
    expect(screen.getByText('4 neighborhoods')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove')).toBeInTheDocument();
    expect(screen.getByText('Riverside')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();
    expect(screen.getByText('Birchwood Hills')).toBeInTheDocument();
    expect(screen.getByText('Avg. price $650K - $900K')).toBeInTheDocument();
    expect(screen.getByText('Standard view map area')).toBeInTheDocument();
    expect(screen.getByText('Map is closed')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Open map' })
    ).toBeInTheDocument();
  });

  it('toggles the map layer and open state', () => {
    render(<MapViewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Satellite' }));
    expect(screen.getByText('Satellite view map area')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Standard' }));
    expect(screen.getByText('Standard view map area')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open map' }));
    expect(screen.getByText('Map is open')).toBeInTheDocument();
  });
});

describe('SavedPropertiesTemplate', () => {
  it('renders saved properties with remove buttons', () => {
    render(<SavedPropertiesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Saved Properties' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your shortlist.')).toBeInTheDocument();
    expect(screen.getByText('4 saved properties')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getAllByText('Saved')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(4);
  });

  it('removes all saved properties and shows the empty state', () => {
    render(<SavedPropertiesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('3 saved properties')).toBeInTheDocument();
    expect(
      screen.queryByText('Maple Grove Family Home')
    ).not.toBeInTheDocument();
    for (let i = 0; i < 3; i += 1) {
      fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    }
    expect(screen.getByText('0 saved properties')).toBeInTheDocument();
    expect(screen.getByText('No saved properties yet')).toBeInTheDocument();
  });
});

describe('MortgageCalculatorTemplate', () => {
  it('renders the calculator form', () => {
    render(<MortgageCalculatorTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Mortgage Calculator' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Estimate your monthly payment.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Home price')).toBeInTheDocument();
    expect(screen.getByLabelText('Down payment')).toBeInTheDocument();
    expect(screen.getByLabelText('Interest rate')).toBeInTheDocument();
    expect(screen.getByLabelText('Loan term (years)')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Calculate' })
    ).toBeInTheDocument();
    expect(screen.queryByText('$3,212/mo')).not.toBeInTheDocument();
  });

  it('shows the monthly payment after calculating', () => {
    render(<MortgageCalculatorTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Calculate' }));
    expect(screen.getByText('$3,212/mo')).toBeInTheDocument();
    expect(screen.getByText('$600,000')).toBeInTheDocument();
    expect(screen.getByText('360')).toBeInTheDocument();
    expect(screen.getByText('360 payments over 30 years')).toBeInTheDocument();
    expect(screen.getByText('$750,000')).toBeInTheDocument();
    expect(screen.getByText('$150,000')).toBeInTheDocument();
  });
});

describe('OpenHousesTemplate', () => {
  it('renders open house events', () => {
    render(<OpenHousesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Open Houses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Tour homes this week.')).toBeInTheDocument();
    expect(screen.getByText('5 open houses this week')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(
      screen.getByText('Sat, Aug 15 · 10:00 AM - 12:00 PM')
    ).toBeInTheDocument();
    expect(screen.getByText('12 Maple Lane, Maple Grove')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Add to calendar' })
    ).toHaveLength(5);
  });

  it('adds an event to the calendar and toggles back', () => {
    render(<OpenHousesTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Add to calendar' })[0]
    );
    expect(screen.getAllByText('Added')).toHaveLength(1);
    expect(screen.getByText('Added')).toHaveClass('badge-success');
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Add to calendar' })[0]
    );
    expect(screen.queryAllByText('Added')).toHaveLength(0);
  });
});

describe('AgentProfileTemplate', () => {
  it('renders the agent profile with credentials', () => {
    render(<AgentProfileTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Agent Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your local expert.')).toBeInTheDocument();
    expect(screen.getByText('Sarah Mitchell')).toBeInTheDocument();
    expect(screen.getByText('4.9 rating')).toBeInTheDocument();
    expect(screen.getByText('42 active listings')).toBeInTheDocument();
    expect(screen.getByText('Licensed Realtor')).toBeInTheDocument();
    expect(screen.getByText('Top 1% Producer')).toBeInTheDocument();
    expect(
      screen.getByText('Certified Negotiation Expert')
    ).toBeInTheDocument();
    expect(screen.getByText('12 Years Experience')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Contact agent' })
    ).toBeInTheDocument();
  });

  it('contacts the agent and toggles back', () => {
    render(<AgentProfileTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Contact agent' }));
    expect(screen.getByText('Message sent')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Contact agent' }));
    expect(screen.queryByText('Message sent')).not.toBeInTheDocument();
  });
});

describe('RealEstatePages', () => {
  it('renders the listings page', () => {
    render(<ListingsPage />);
    expect(
      screen.getByRole('heading', { name: 'Property Listings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse homes for sale.')).toBeInTheDocument();
  });

  it('renders the property detail page', () => {
    render(<PropertyPage />);
    expect(
      screen.getByRole('heading', { name: 'Property Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('A closer look at this home.')).toBeInTheDocument();
  });

  it('renders the search filters page', () => {
    render(<SearchPage />);
    expect(
      screen.getByRole('heading', { name: 'Search Filters' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next property.')).toBeInTheDocument();
  });

  it('renders the map view page', () => {
    render(<MapPage />);
    expect(
      screen.getByRole('heading', { name: 'Map View' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Explore neighborhoods by price.')
    ).toBeInTheDocument();
  });

  it('renders the saved properties page', () => {
    render(<SavedPage />);
    expect(
      screen.getByRole('heading', { name: 'Saved Properties' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your shortlist.')).toBeInTheDocument();
  });

  it('renders the mortgage calculator page', () => {
    render(<MortgagePage />);
    expect(
      screen.getByRole('heading', { name: 'Mortgage Calculator' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Estimate your monthly payment.')
    ).toBeInTheDocument();
  });

  it('renders the open houses page', () => {
    render(<OpenHousesPage />);
    expect(
      screen.getByRole('heading', { name: 'Open Houses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Tour homes this week.')).toBeInTheDocument();
  });

  it('renders the agents page', () => {
    render(<AgentsPage />);
    expect(
      screen.getByRole('heading', { name: 'Agent Profile' })
    ).toBeInTheDocument();
    expect(screen.getByText('Meet your local expert.')).toBeInTheDocument();
  });
});
