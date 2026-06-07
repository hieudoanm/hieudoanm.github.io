import { render } from '@testing-library/react';
import { LinkCard } from '../LinkCard';

describe('LinkCard', () => {
  it('should render with minimal props', () => {
    const { container } = render(
      <LinkCard href="https://example.com" label="test" emoji="🔥" />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with all props', () => {
    const { container } = render(
      <LinkCard
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
});
