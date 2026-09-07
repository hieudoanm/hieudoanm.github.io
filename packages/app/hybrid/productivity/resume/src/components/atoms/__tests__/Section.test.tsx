import { render, screen } from '@testing-library/react';
import { Section } from '../Section';

describe('Section', () => {
  it('renders a section title and children', () => {
    render(
      <Section title="Experience">
        <p>Body</p>
      </Section>
    );
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders a section divider when provided', () => {
    const { container } = render(
      <Section title="Skills" titleDividerStyle={{ height: 1 }}>
        <p>x</p>
      </Section>
    );
    expect(container.querySelector('div[style*="height: 1px"]')).not.toBeNull();
  });
});
