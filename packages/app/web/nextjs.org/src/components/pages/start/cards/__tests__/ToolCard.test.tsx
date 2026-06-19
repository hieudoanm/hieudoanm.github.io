import { render } from '@testing-library/react';
import { ToolCard } from '../ToolCard';

describe('ToolCard', () => {
  it('should render', () => {
    const { container } = render(
      <ToolCard
        label="test"
        description="test"
        emoji="test"
        color="test"
        onClick={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
