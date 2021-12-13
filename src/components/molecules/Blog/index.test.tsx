import React from 'react';
import { render } from '@testing-library/react';

import Blog from './index';

describe('Blog', () => {
  test('render default', () => {
    const wrapper = render(
      <Blog url="" title="" description="" date=""></Blog>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
