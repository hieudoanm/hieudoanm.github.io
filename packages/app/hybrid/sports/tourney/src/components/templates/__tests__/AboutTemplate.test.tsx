import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="Tourney"
        description="Organize and run tournaments"
        version="v0.9.2"
        items={[{ label: 'Format', value: 'Swiss' }]}
      />
    );
    expect(screen.getByText('Tourney')).toBeInTheDocument();
    expect(
      screen.getByText('Organize and run tournaments')
    ).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Swiss')).toBeInTheDocument();
    expect(screen.getByText('v0.9.2')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
