import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CuisineList } from '../index';
import { CUISINES, FOODS } from '@/data';

describe('CuisineList', () => {
  it('renders every dish and the total count', () => {
    render(<CuisineList />);
    expect(screen.getAllByTestId('cuisine-row')).toHaveLength(FOODS.length);
    expect(screen.getByTestId('cuisine-count')).toHaveTextContent(
      `${FOODS.length} of ${FOODS.length} dishes`
    );
  });

  it('searches dishes by name', async () => {
    const user = userEvent.setup();
    render(<CuisineList />);
    await user.type(screen.getByTestId('cuisine-search'), 'sushi');
    const rows = screen.getAllByTestId('cuisine-row');
    expect(rows).toHaveLength(1);
    expect(within(rows[0]).getByText('Sushi')).toBeInTheDocument();
  });

  it('filters by cuisine', async () => {
    const user = userEvent.setup();
    render(<CuisineList />);
    await user.selectOptions(screen.getByTestId('cuisine-filter'), 'japanese');
    const rows = screen.getAllByTestId('cuisine-row');
    expect(rows.length).toBeGreaterThan(0);
    rows.forEach((row) => {
      expect(within(row).getByText(/Japan/)).toBeInTheDocument();
    });
  });

  it('shows an empty state when nothing matches', async () => {
    const user = userEvent.setup();
    render(<CuisineList />);
    await user.type(screen.getByTestId('cuisine-search'), 'zzzzz');
    expect(screen.queryAllByTestId('cuisine-row')).toHaveLength(0);
    expect(screen.getByText('No dishes match your search')).toBeInTheDocument();
    expect(screen.getByTestId('cuisine-count')).toHaveTextContent(
      `0 of ${FOODS.length} dishes`
    );
  });

  it('lists one option per cuisine in the filter', () => {
    render(<CuisineList />);
    CUISINES.forEach((cuisine) => {
      expect(
        screen.getByRole('option', {
          name: `${cuisine.emoji} ${cuisine.label}`,
        })
      ).toBeInTheDocument();
    });
  });
});
