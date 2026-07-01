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
        href="/test"
        description="test description"
        emoji="😀"
        badge="AI"
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with action buttons', () => {
    const { container } = render(
      <ItemCard
        label="test"
        href="/test"
        description="test description"
        emoji="😀"
        actions={[{ label: 'Custom action', url: 'https://example.com' }]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
