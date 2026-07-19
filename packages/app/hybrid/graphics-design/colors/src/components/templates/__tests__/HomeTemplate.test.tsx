import { render, screen } from '@testing-library/react';
import { HomeTemplate, ColorToolItem } from '../HomeTemplate';

const StubIcon = () => null;

const items: ColorToolItem[] = [
  {
    label: 'Wheel',
    description: 'Color wheel',
    icon: StubIcon,
    href: '/tools/wheel',
  },
  {
    label: 'Picker',
    description: 'Color picker',
    icon: StubIcon,
    href: '/tools/picker',
  },
];

describe('HomeTemplate', () => {
  it('renders the title and description', () => {
    render(
      <HomeTemplate title="Colors" description="Design tools" items={[]} />
    );
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Design tools')).toBeInTheDocument();
  });

  it('renders each tool card with label and link', () => {
    render(
      <HomeTemplate title="Colors" description="Design tools" items={items} />
    );
    expect(screen.getByText('Wheel')).toBeInTheDocument();
    expect(screen.getByText('Color wheel')).toBeInTheDocument();
    expect(screen.getByText('Picker')).toBeInTheDocument();
    expect(screen.getByText('Color picker')).toBeInTheDocument();

    const wheelLink = screen.getByTestId('tool-card-toolswheel');
    expect(wheelLink).toHaveAttribute('href', '/tools/wheel');

    const pickerLink = screen.getByTestId('tool-card-toolspicker');
    expect(pickerLink).toHaveAttribute('href', '/tools/picker');
  });

  it('renders no cards when items is empty', () => {
    const { container } = render(
      <HomeTemplate title="Colors" description="Design tools" items={[]} />
    );
    expect(
      container.querySelectorAll('[data-testid^="tool-card-"]').length
    ).toBe(0);
  });
});
