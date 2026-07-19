import { render, screen } from '@testing-library/react';
import { CourseLanding } from '../CourseLanding';

describe('CourseLanding', () => {
  const curriculum = [
    { id: 'a', title: 'Intro', duration: '10 min' },
    { id: 'b', title: 'Basics', description: 'Core concepts.' },
  ];

  it('renders hero, curriculum, and CTA', () => {
    render(
      <CourseLanding
        title="Learn React"
        description="A complete guide."
        instructor="Jane Doe"
        rating={4.8}
        curriculum={curriculum}
      />
    );
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('A complete guide.')).toBeInTheDocument();
    expect(screen.getByText('By Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Intro')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Enroll now' })
    ).toBeInTheDocument();
  });

  it('renders curriculum items with descriptions', () => {
    render(<CourseLanding title="Course" curriculum={curriculum} />);
    expect(screen.getByText('Basics')).toBeInTheDocument();
    expect(screen.getByText('Core concepts.')).toBeInTheDocument();
    expect(screen.getByText('10 min')).toBeInTheDocument();
  });
});
