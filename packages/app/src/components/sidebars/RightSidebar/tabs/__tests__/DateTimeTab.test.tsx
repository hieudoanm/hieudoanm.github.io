import { render } from '@testing-library/react';
import { DateTimeTab } from '../DateTimeTab';

describe('DateTimeTab', () => {
  it('should render', () => {
    const { container } = render(
      <DateTimeTab times={[]} weatherQueries={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
