import { render } from '@testing-library/react';
import React from 'react';
import { Banner } from '..';

describe('Banner', () => {
  test('render default', () => {
    const wrapper = render(<Banner>Banner</Banner>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
