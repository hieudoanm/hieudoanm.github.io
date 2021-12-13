import React from 'react';
import { render } from '@testing-library/react';

import Hero from './index';

describe('Footer', () => {
  test('render default', () => {
    const wrapper = render(
      <Hero id="" title="" subtitle="" backgroundImage="">
        Footer
      </Hero>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
