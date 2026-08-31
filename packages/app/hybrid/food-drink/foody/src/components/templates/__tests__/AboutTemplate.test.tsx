import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and detail rows', () => {
    render(
      <AboutTemplate
        name="Foody"
        description="A food randomizer"
        version="v1.2.3"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Language', value: 'TypeScript' },
        ]}
      />
    );
    expect(screen.getByRole('heading', { name: 'Foody' })).toBeInTheDocument();
    expect(screen.getByText('A food randomizer')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('v1.2.3')).toBeInTheDocument();
  });
});
