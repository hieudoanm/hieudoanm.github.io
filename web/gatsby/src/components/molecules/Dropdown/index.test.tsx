import React from 'react';
import { render } from '@testing-library/react';

import Dropdown from './index';

describe('Dropdown', () => {
  test('render default', () => {
    const wrapper = render(<Dropdown label="Label" options={[]} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
