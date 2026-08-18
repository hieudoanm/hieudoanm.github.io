import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

const items = [
  { label: 'Version', value: '1.0.0' },
  { label: 'Author', value: 'Alice' },
];

describe('AboutTemplate', () => {
  it('renders About heading', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders name', () => {
    render(
      <AboutTemplate
        name="Memory Games"
        description="Desc"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('Memory Games')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(
      <AboutTemplate
        name="Test"
        description="A description"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('renders all info items', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getAllByText('1.0.0').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('renders version badge', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getAllByText('1.0.0').length).toBeGreaterThanOrEqual(1);
  });

  it('renders Stable badge', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders empty items list', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="1.0.0"
        items={[]}
      />
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('has displayName', () => {
    expect(AboutTemplate.displayName).toBe('AboutTemplate');
  });
});
