import { render } from '@testing-library/react';
import React from 'react';

import Navbar from './index';

describe('Navbar', () => {
  test('render default', () => {
    const wrapper = render(<Navbar sections={[{ id: 'id' }]}></Navbar>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
