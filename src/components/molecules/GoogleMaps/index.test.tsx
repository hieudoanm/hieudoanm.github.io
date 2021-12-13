import React from 'react';
import { render } from '@testing-library/react';

import GoogleMaps from './index';

describe('GoogleMaps', () => {
  test('render default', () => {
    const wrapper = render(<GoogleMaps src="" title="" />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
