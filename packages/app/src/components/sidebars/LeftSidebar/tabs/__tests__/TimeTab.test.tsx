import { render } from '@testing-library/react';
import { TimeTab } from '../TimeTab';

describe('TimeTab', () => {
  it('should render', () => {
    const { container } = render(<TimeTab />);
    expect(container).toMatchSnapshot();
  });
});
