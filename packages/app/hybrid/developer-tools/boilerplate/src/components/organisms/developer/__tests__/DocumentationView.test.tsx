import { render, screen } from '@testing-library/react';
import { DocumentationView } from '../DocumentationView';

describe('DocumentationView', () => {
  it('renders navigation and section content', () => {
    render(
      <DocumentationView
        sections={[
          {
            id: 'intro',
            title: 'Introduction',
            content: 'Welcome.',
            path: 'docs/intro',
          },
          { id: 'install', title: 'Installation', content: 'pnpm install.' },
        ]}
      />
    );
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('Welcome.')).toBeInTheDocument();
    expect(screen.getByText('docs/intro')).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Installation' })
    ).toBeInTheDocument();
  });

  it('links navigation to section anchors', () => {
    render(
      <DocumentationView
        sections={[{ id: 'intro', title: 'Introduction', content: 'Welcome.' }]}
      />
    );
    expect(screen.getByRole('link', { name: 'Introduction' })).toHaveAttribute(
      'href',
      '#intro'
    );
  });

  it('shows empty state', () => {
    render(<DocumentationView sections={[]} />);
    expect(screen.getByText('No documentation.')).toBeInTheDocument();
  });
});
