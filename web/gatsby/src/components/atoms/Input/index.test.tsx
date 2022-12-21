import React from 'react';
import { render } from '@testing-library/react';

import Input from './index';

describe('Input', () => {
  test('render default', () => {
    const wrapper = render(
      <Input id="id" name="name" placeholder="placeholder"></Input>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
