import { render } from '@testing-library/react';
import { ItemCard } from '../ItemCard';

describe('ItemCard', () => {
  it('should render as a bookmark link', () => {
    const { container } = render(
      <ItemCard href="https://example.com" label="test" emoji="🔥" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with a badge', () => {
    const { container } = render(
      <ItemCard
        label="test"
        href="https://example.com"
        description="test"
        emoji="test"
        color="#ff0000"
        badge="New"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with action buttons', () => {
    const { container } = render(
      <ItemCard
        label="test"
        href="https://example.com"
        description="test"
        emoji="🔥"
        color="#ff0000"
        actions={[
          { label: 'macOS', url: 'https://example.com/macos' },
          { label: 'Windows', url: 'https://example.com/windows' },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
