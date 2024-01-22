import { render } from '@testing-library/react';
import React from 'react';
import Blog from '..';

describe('Blog', () => {
  test('render default', () => {
    const wrapper = render(<Blog url="" title="" description="" date="" />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
