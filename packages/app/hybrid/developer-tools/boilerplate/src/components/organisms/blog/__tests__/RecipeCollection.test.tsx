import { render, screen } from '@testing-library/react';
import { RecipeCollection } from '../RecipeCollection';

describe('RecipeCollection', () => {
  it('renders recipe details', () => {
    render(
      <RecipeCollection
        recipes={[
          {
            id: '1',
            name: 'Banana bread',
            description: 'Moist and easy.',
            time: '45 min',
            difficulty: 'Easy',
            servings: 8,
          },
        ]}
      />
    );
    expect(screen.getByText('Featured recipes')).toBeInTheDocument();
    expect(screen.getByText('Banana bread')).toBeInTheDocument();
    expect(screen.getByText('Moist and easy.')).toBeInTheDocument();
    expect(screen.getByText('45 min')).toBeInTheDocument();
    expect(screen.getByText('Serves 8')).toBeInTheDocument();
  });

  it('renders recipes without optional fields', () => {
    render(<RecipeCollection recipes={[{ id: '2', name: 'Toast' }]} />);
    expect(screen.getByText('Toast')).toBeInTheDocument();
    expect(screen.queryByText('Serves 8')).not.toBeInTheDocument();
  });
});
