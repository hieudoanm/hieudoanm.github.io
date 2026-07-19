import { render, screen } from '@testing-library/react';
import { TagCloud } from '../TagCloud';

describe('TagCloud', () => {
  it('renders tags with their labels', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 10 },
          { label: 'typescript', weight: 3 },
        ]}
      />
    );
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('scales font size by weight', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 10 },
          { label: 'typescript', weight: 0 },
        ]}
      />
    );
    const heavy = screen.getByText('react');
    const light = screen.getByText('typescript');
    expect(parseFloat(heavy.style.fontSize)).toBeGreaterThan(
      parseFloat(light.style.fontSize)
    );
  });

  it('returns null when there are no tags', () => {
    const { container } = render(<TagCloud tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('handles equal weights without division errors', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 5 },
          { label: 'next', weight: 5 },
        ]}
      />
    );
    expect(screen.getByText('react').style.fontSize).toBe(
      screen.getByText('next').style.fontSize
    );
  });
});
