import { render } from '@testing-library/react';
import { AppCard } from '../AppCard';

describe('AppCard', () => {
  it('should render', () => {
    const { container } = render(
      <AppCard
        label="test"
        description="test description"
        icon={({ className }) => (
          <svg className={className} data-testid="mock-icon" />
        )}
        onClick={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
