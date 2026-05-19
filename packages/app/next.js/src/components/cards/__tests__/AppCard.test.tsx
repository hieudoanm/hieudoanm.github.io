import { render } from '@testing-library/react';
import { AppCard } from '../AppCard';

describe('AppCard', () => {
  it('should render', () => {
    const { container } = render(
      <AppCard href="https://example.com" name="test" emoji="🔥" />
    );
    expect(container).toMatchSnapshot();
  });
});
