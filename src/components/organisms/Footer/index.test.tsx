import React from 'react';
import { render } from '@testing-library/react';

import Footer from './index';

describe('Footer', () => {
  test('render default', () => {
    const wrapper = render(<Footer>Footer</Footer>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
