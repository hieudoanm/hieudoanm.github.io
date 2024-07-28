import { render } from '@testing-library/react';
import { CryptoTemplate } from './Crypto';

describe('CryptoTemplate', () => {
  test('render default', () => {
    const wrapper = render(<CryptoTemplate />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
