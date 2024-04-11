import { render } from '@testing-library/react';
import React from 'react';
import { HeroSection } from '..';

describe('Footer', () => {
  test('render default', () => {
    const wrapper = render(
      <HeroSection id="" title="" subtitle="" backgroundImage="" />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
