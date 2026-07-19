import { render, screen } from '@testing-library/react';
import { Section } from '../Section';

describe('Section', () => {
  it('renders with label, title, sub, and children', () => {
    render(
      <Section id="test" label="TestLabel" title="TestTitle" sub="TestSub">
        <p>child content</p>
      </Section>
    );
    expect(screen.getByText('TestLabel')).toBeInTheDocument();
    expect(screen.getByText('TestTitle')).toBeInTheDocument();
    expect(screen.getByText('TestSub')).toBeInTheDocument();
    expect(screen.getByText('child content')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    const { container } = render(
      <Section>
        <p>only children</p>
      </Section>
    );
    expect(screen.getByText('only children')).toBeInTheDocument();
    expect(container.querySelector('#test')).toBeNull();
  });

  it('centers content when center is true', () => {
    render(
      <Section title="Centered" sub="Centered sub" center>
        <p>content</p>
      </Section>
    );
    const heading = screen.getByText('Centered');
    expect(heading.className).toContain('text-center');
  });

  it('to match snapshot', () => {
    const { container } = render(
      <Section id="snap" label="SnapLabel" title="SnapTitle" sub="SnapSub">
        <button>action</button>
      </Section>
    );
    expect(container).toMatchSnapshot();
  });
});
