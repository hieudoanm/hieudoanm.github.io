import { fireEvent, render, screen, within } from '@testing-library/react';
import { RestaurantListTemplate } from '../RestaurantListTemplate';
import { RestaurantDetailTemplate } from '../RestaurantDetailTemplate';
import { MenuTemplate } from '../MenuTemplate';
import { ReservationsTemplate } from '../ReservationsTemplate';
import { RecipesTemplate } from '../RecipesTemplate';
import { RecipeDetailTemplate } from '../RecipeDetailTemplate';
import { FoodDeliveryTemplate } from '../FoodDeliveryTemplate';
import { WineListTemplate } from '../WineListTemplate';
import RestaurantListPage from '@/app/(main)/food/restaurants/page';
import RestaurantDetailPage from '@/app/(main)/food/restaurant/page';
import MenuPage from '@/app/(main)/food/menu/page';
import ReservationsPage from '@/app/(main)/food/reservations/page';
import RecipesPage from '@/app/(main)/food/recipes/page';
import RecipeDetailPage from '@/app/(main)/food/recipe/page';
import FoodDeliveryPage from '@/app/(main)/food/delivery/page';
import WineListPage from '@/app/(main)/food/wine/page';

describe('RestaurantListTemplate', () => {
  it('renders restaurant cards with ratings and delivery times', () => {
    render(<RestaurantListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Restaurants' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
    expect(screen.getByText('25 min')).toBeInTheDocument();
  });

  it('filters restaurants by cuisine tab and search', () => {
    render(<RestaurantListTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Italian' }));
    expect(screen.getByText('2 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.queryByText('Sakura House')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search restaurants'), {
      target: { value: 'fiore' },
    });
    expect(screen.getByText('1 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.queryByText('Casa del Sole')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<RestaurantListTemplate />);
    fireEvent.change(screen.getByLabelText('Search restaurants'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No restaurants found')).toBeInTheDocument();
    expect(screen.getByText('0 restaurants')).toBeInTheDocument();
  });
});

describe('RestaurantDetailTemplate', () => {
  it('renders the restaurant details', () => {
    render(<RestaurantDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Restaurant' })
    ).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
    expect(screen.getByText('12 Harbor Street')).toBeInTheDocument();
    expect(screen.getByText('Mon-Fri: 11:00 - 22:00')).toBeInTheDocument();
  });

  it('books the table', () => {
    render(<RestaurantDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Book table' }));
    expect(screen.getByText('Booked')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Book table' })
    ).not.toBeInTheDocument();
  });

  it('favorites the restaurant', () => {
    render(<RestaurantDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Favorite' }));
    expect(screen.getByText('Favorited')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Favorite' })
    ).not.toBeInTheDocument();
  });
});

describe('MenuTemplate', () => {
  it('renders the menu with dishes and prices', () => {
    render(<MenuTemplate />);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByText('Wild Mushroom Risotto')).toBeInTheDocument();
    expect(screen.getAllByText('$18')).toHaveLength(3);
    expect(screen.getByText('0 items · $0')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(7);
  });

  it('filters dishes by category tab', () => {
    render(<MenuTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Desserts' }));
    expect(screen.getByText('Tiramisu')).toBeInTheDocument();
    expect(screen.queryByText('Ribeye Steak')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Add' })).toHaveLength(2);
  });

  it('adds dishes to the cart and totals the price', () => {
    render(<MenuTemplate />);
    const addDish = (name: string) => {
      const row = screen.getByText(name).closest('li');
      fireEvent.click(
        within(row as HTMLElement).getByRole('button', { name: 'Add' })
      );
    };
    addDish('Wild Mushroom Risotto');
    addDish('Grilled Salmon');
    addDish('Ribeye Steak');
    expect(screen.getByText('3 items · $54')).toBeInTheDocument();
  });
});

describe('ReservationsTemplate', () => {
  it('renders upcoming reservations', () => {
    render(<ReservationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Reservations' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
    expect(screen.getByText('Trattoria Fiore')).toBeInTheDocument();
    expect(screen.getByText('Aug 15, 2026')).toBeInTheDocument();
    expect(screen.getByText('19:30')).toBeInTheDocument();
    expect(screen.getByText('4 guests')).toBeInTheDocument();
    expect(screen.getAllByText('Confirmed')).toHaveLength(2);
    expect(screen.getAllByText('Pending')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(2);
  });

  it('cancels a pending reservation', () => {
    render(<ReservationsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Cancel' })[0]);
    expect(screen.getAllByText('Cancelled')).toHaveLength(1);
    expect(screen.getAllByText('Pending')).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Cancel' })).toHaveLength(1);
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
  });
});

describe('RecipesTemplate', () => {
  it('renders recipe cards with cook times and ratings', () => {
    render(<RecipesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Recipes' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 recipes')).toBeInTheDocument();
    expect(screen.getByText('Fluffy Pancakes')).toBeInTheDocument();
    expect(screen.getByText('4.6 rating')).toBeInTheDocument();
    expect(screen.getByText('20 min')).toBeInTheDocument();
    expect(screen.getAllByText('4 servings')).toHaveLength(3);
  });

  it('filters recipes by search', () => {
    render(<RecipesTemplate />);
    fireEvent.change(screen.getByLabelText('Search recipes'), {
      target: { value: 'salmon' },
    });
    expect(screen.getByText('1 recipes')).toBeInTheDocument();
    expect(screen.getByText('Garlic Butter Salmon')).toBeInTheDocument();
    expect(screen.queryByText('Fluffy Pancakes')).not.toBeInTheDocument();
  });

  it('shows the empty state when nothing matches', () => {
    render(<RecipesTemplate />);
    fireEvent.change(screen.getByLabelText('Search recipes'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No recipes found')).toBeInTheDocument();
    expect(screen.getByText('0 recipes')).toBeInTheDocument();
  });
});

describe('RecipeDetailTemplate', () => {
  it('renders the recipe details and ingredients', () => {
    render(<RecipeDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Recipe' })).toBeInTheDocument();
    expect(screen.getByText('Garlic Butter Salmon')).toBeInTheDocument();
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('4 servings')).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Salmon fillets' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox')).toHaveLength(5);
  });

  it('toggles ingredient checkboxes', () => {
    render(<RecipeDetailTemplate />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Salmon fillets' }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Garlic cloves' }));
    expect(
      screen.getByRole('checkbox', { name: 'Salmon fillets' })
    ).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: 'Garlic cloves' })
    ).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'Lemon' })).not.toBeChecked();
  });

  it('starts cooking', () => {
    render(<RecipeDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Start cooking' }));
    expect(screen.getByText('Cooking in progress')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Start cooking' })
    ).not.toBeInTheDocument();
  });
});

describe('FoodDeliveryTemplate', () => {
  it('renders delivery restaurants with fees and ETAs', () => {
    render(<FoodDeliveryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Delivery' })
    ).toBeInTheDocument();
    expect(screen.getByText('5 restaurants')).toBeInTheDocument();
    expect(screen.getByText('Golden Dragon')).toBeInTheDocument();
    expect(screen.getAllByText('$2.99 delivery')).toHaveLength(2);
    expect(screen.getByText('20-30 min')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View menu' })).toHaveLength(
      5
    );
  });

  it('toggles an inline mini menu', () => {
    render(<FoodDeliveryTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View menu' })[0]);
    expect(screen.getByText('Kung Pao Chicken')).toBeInTheDocument();
    expect(screen.getByText('Spring Rolls')).toBeInTheDocument();
    expect(screen.queryByText('Pad Thai')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByText('Kung Pao Chicken')).not.toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View menu' })).toHaveLength(
      5
    );
  });
});

describe('WineListTemplate', () => {
  it('renders the wine list with vintages and prices', () => {
    render(<WineListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Wine List' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 wines')).toBeInTheDocument();
    expect(screen.getByText('Barolo Riserva')).toBeInTheDocument();
    expect(screen.getByText('$42')).toBeInTheDocument();
    expect(screen.getAllByText('2021')).toHaveLength(2);
    expect(screen.getAllByText('Sommelier pick')).toHaveLength(3);
  });

  it('filters wines by type tab', () => {
    render(<WineListTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'White' }));
    expect(screen.getByText('2 wines')).toBeInTheDocument();
    expect(screen.getByText('Chablis Premier Cru')).toBeInTheDocument();
    expect(screen.queryByText('Barolo Riserva')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sparkling' }));
    expect(screen.getByText('2 wines')).toBeInTheDocument();
    expect(screen.getByText('Champagne Brut')).toBeInTheDocument();
    expect(screen.getAllByText('Sommelier pick')).toHaveLength(1);
  });
});

describe('Food pages', () => {
  it('renders the RestaurantListPage', () => {
    render(<RestaurantListPage />);
    expect(screen.getByText('6 restaurants')).toBeInTheDocument();
  });

  it('renders the RestaurantDetailPage', () => {
    render(<RestaurantDetailPage />);
    expect(screen.getByText('4.5 rating')).toBeInTheDocument();
  });

  it('renders the MenuPage', () => {
    render(<MenuPage />);
    expect(screen.getByText('0 items · $0')).toBeInTheDocument();
  });

  it('renders the ReservationsPage', () => {
    render(<ReservationsPage />);
    expect(screen.getByText('4 reservations')).toBeInTheDocument();
  });

  it('renders the RecipesPage', () => {
    render(<RecipesPage />);
    expect(screen.getByText('6 recipes')).toBeInTheDocument();
  });

  it('renders the RecipeDetailPage', () => {
    render(<RecipeDetailPage />);
    expect(screen.getByText('4.7 rating')).toBeInTheDocument();
  });

  it('renders the FoodDeliveryPage', () => {
    render(<FoodDeliveryPage />);
    expect(screen.getByText('5 restaurants')).toBeInTheDocument();
  });

  it('renders the WineListPage', () => {
    render(<WineListPage />);
    expect(screen.getByText('7 wines')).toBeInTheDocument();
  });
});
