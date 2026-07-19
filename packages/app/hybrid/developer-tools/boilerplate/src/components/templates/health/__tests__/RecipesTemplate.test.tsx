import { fireEvent, render, screen } from '@testing-library/react';
import { RecipesTemplate } from '../RecipesTemplate';

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
