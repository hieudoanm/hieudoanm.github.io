import React from 'react';
import { render } from '@testing-library/react';

import Textarea from './index';

describe('Textarea', () => {
  test('render default', () => {
    const wrapper = render(
      <Textarea id="id" name="name" placeholder="placeholder"></Textarea>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
