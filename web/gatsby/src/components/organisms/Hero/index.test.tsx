import React from 'react';
import { render } from '@testing-library/react';

import HeroSection from './index';

describe('Footer', () => {
  test('render default', () => {
    const wrapper = render(
      <HeroSection id="" title="" subtitle="" backgroundImage="" />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
