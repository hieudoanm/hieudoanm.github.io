import { render, screen } from '@testing-library/react';
import { TrainingCatalog } from '../TrainingCatalog';

describe('TrainingCatalog', () => {
  const courses = [
    {
      id: '1',
      title: 'Leadership Basics',
      category: 'Management',
      level: 'beginner' as const,
      duration: '2h',
      enrolled: 45,
    },
    {
      id: '2',
      title: 'Advanced SQL',
      category: 'Data',
      level: 'advanced' as const,
      duration: '4h',
      enrolled: 12,
    },
  ];

  it('renders course cards with details', () => {
    render(<TrainingCatalog courses={courses} />);
    expect(screen.getByText('Leadership Basics')).toBeInTheDocument();
    expect(screen.getByText('45 enrolled')).toBeInTheDocument();
  });

  it('applies the level badge class', () => {
    render(<TrainingCatalog courses={courses} />);
    expect(screen.getByText('beginner')).toHaveClass('badge-success');
    expect(screen.getByText('advanced')).toHaveClass('badge-error');
  });

  it('shows an empty state when no courses exist', () => {
    render(<TrainingCatalog courses={[]} />);
    expect(screen.getByText('No courses available')).toBeInTheDocument();
  });
});
