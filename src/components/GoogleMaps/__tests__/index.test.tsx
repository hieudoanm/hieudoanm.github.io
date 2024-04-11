import { render } from '@testing-library/react';
import React from 'react';
import { GoogleMaps } from '..';

describe('GoogleMaps', () => {
  test('render default', () => {
    const wrapper = render(<GoogleMaps source="" title="" />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
