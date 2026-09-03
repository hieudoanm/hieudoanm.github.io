import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="Diagram Studio"
        description="Design and export diagrams"
        version="v1.1.3"
        items={[{ label: 'Renderer', value: 'Mermaid' }]}
      />
    );
    expect(screen.getByText('Diagram Studio')).toBeInTheDocument();
    expect(
      screen.getByText('Design and export diagrams')
    ).toBeInTheDocument();
    expect(screen.getByText('Renderer')).toBeInTheDocument();
    expect(screen.getByText('Mermaid')).toBeInTheDocument();
    expect(screen.getByText('v1.1.3')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
