import { render, screen } from '@testing-library/react';
import { CategorySection } from '../CategorySection';

describe('CategorySection', () => {
  const categories = [
    { id: 'a', name: 'Engineering', count: 12, description: 'Dev posts.' },
    { id: 'b', name: 'Design', count: 5 },
  ];

  it('renders categories with counts', () => {
    render(<CategorySection categories={categories} />);
    expect(screen.getByText('Browse by category')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Dev posts.')).toBeInTheDocument();
  });

  it('renders custom title and minimal categories', () => {
    render(
      <CategorySection
        categories={[{ id: 'b', name: 'Design', count: 5 }]}
        title="Topics"
      />
    );
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });
});
