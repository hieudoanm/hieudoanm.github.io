import React from 'react';
import { render } from '@testing-library/react';

import Banner from './index';

describe('Banner', () => {
  test('render default', () => {
    const wrapper = render(<Banner>Banner</Banner>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
