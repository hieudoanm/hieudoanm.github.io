import { render } from '@testing-library/react';
import { ToolCard } from '../ToolCard';

describe('ToolCard', () => {
  it('should render', () => {
    const { container } = render(
      <ToolCard
        label="test"
        description="test description"
        emoji="😀"
        onClick={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
