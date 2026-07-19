import { render } from '@testing-library/react';
import { ToolCard } from '../ToolCard';
import { PiStarFour } from 'react-icons/pi';

describe('ToolCard', () => {
  it('should render as a bookmark link', () => {
    const { container } = render(
      <ToolCard
        href="https://example.com"
        label="test"
        description="test description"
        icon={PiStarFour}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with a badge', () => {
    const { container } = render(
      <ToolCard
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
      <ToolCard
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
