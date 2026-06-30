import { render, screen, fireEvent } from '@solidjs/testing-library';
import { Hero } from '../Hero';

describe('Hero', () => {
  it('renders version badge', () => {
    render(() => <Hero />);
    expect(screen.getByText(/v2.4.0/)).toBeInTheDocument();
  });

  it('renders heading', () => {
    render(() => <Hero />);
    expect(screen.getByText(/Build interfaces/)).toBeInTheDocument();
  });

  it('renders description', () => {
    render(() => <Hero />);
    expect(screen.getByText(/Forma is a refined/)).toBeInTheDocument();
  });

  it('renders view demo button', () => {
    render(() => <Hero />);
    expect(screen.getByText(/View demo/)).toBeInTheDocument();
  });

  it('renders read the docs button', () => {
    render(() => <Hero />);
    expect(screen.getByText(/Read the docs/)).toBeInTheDocument();
  });

  it('calls onViewDemoClick when view demo is clicked', () => {
    const onViewDemoClick = vi.fn();
    render(() => <Hero onViewDemoClick={onViewDemoClick} />);
    fireEvent.click(screen.getByText(/View demo/));
    expect(onViewDemoClick).toHaveBeenCalledOnce();
  });

  it('calls onDocsClick when read the docs is clicked', () => {
    const onDocsClick = vi.fn();
    render(() => <Hero onDocsClick={onDocsClick} />);
    fireEvent.click(screen.getByText(/Read the docs/));
    expect(onDocsClick).toHaveBeenCalledOnce();
  });

  it('renders badges', () => {
    render(() => <Hero />);
    expect(screen.getByText(/Stable/)).toBeInTheDocument();
    expect(screen.getByText(/TypeScript/)).toBeInTheDocument();
    expect(screen.getByText(/React 18/)).toBeInTheDocument();
  });
});
