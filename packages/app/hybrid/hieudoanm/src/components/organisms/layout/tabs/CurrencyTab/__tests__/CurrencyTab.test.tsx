import { render } from '@testing-library/react';
import { CurrencyTab } from '../index';

describe('CurrencyTab', () => {
  it('should render', () => {
    const { container } = render(<CurrencyTab />);
    expect(container).toMatchSnapshot();
  });
});
