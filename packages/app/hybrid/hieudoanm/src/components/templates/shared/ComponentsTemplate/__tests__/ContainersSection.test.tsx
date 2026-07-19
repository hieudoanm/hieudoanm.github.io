import { render, screen } from '@testing-library/react';
import { ContainersSection } from '../ContainersSection';

describe('ContainersSection', () => {
  it('renders section heading', () => {
    render(<ContainersSection />);
    expect(screen.getByText('Containers')).toBeInTheDocument();
    expect(screen.getByText('Structured surfaces')).toBeInTheDocument();
  });

  it('renders accordion items', () => {
    render(<ContainersSection />);
    expect(
      screen.getByText('What tokens does DaisyX export?')
    ).toBeInTheDocument();
    expect(screen.getByText('Is it framework-agnostic?')).toBeInTheDocument();
  });

  it('renders calendar', () => {
    render(<ContainersSection />);
    expect(screen.getByText('April 2026')).toBeInTheDocument();
    expect(screen.getByText('Su')).toBeInTheDocument();
    expect(screen.getByText('Mo')).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { container } = render(<ContainersSection />);
    expect(container).toMatchSnapshot();
  });
});
