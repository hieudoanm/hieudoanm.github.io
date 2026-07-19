import { fireEvent, render, screen } from '@testing-library/react';
import { RecipeDetailTemplate } from '../RecipeDetailTemplate';

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
