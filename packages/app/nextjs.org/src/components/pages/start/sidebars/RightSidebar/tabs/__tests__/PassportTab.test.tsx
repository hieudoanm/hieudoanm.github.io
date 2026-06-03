import { render } from '@testing-library/react';
import { PassportTab } from '../PassportTab';

describe('PassportTab', () => {
  it('should render', () => {
    const { container } = render(<PassportTab />);
    expect(container).toMatchSnapshot();
  });
});
