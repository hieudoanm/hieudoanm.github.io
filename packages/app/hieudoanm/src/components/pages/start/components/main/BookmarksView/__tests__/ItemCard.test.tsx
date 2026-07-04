import { render } from '@testing-library/react';
import { ItemCard } from '../ItemCard';
import { PiStarFour } from 'react-icons/pi';

describe('ItemCard', () => {
  it('should render as a bookmark link', () => {
    const { container } = render(
      <ItemCard href="https://example.com" label="test" icon={PiStarFour} />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with a badge', () => {
    const { container } = render(
      <ItemCard
        label="test"
        href="/test"
        description="test description"
        icon={PiStarFour}
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
        icon={PiStarFour}
        actions={[{ label: 'Custom action', url: 'https://example.com' }]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
