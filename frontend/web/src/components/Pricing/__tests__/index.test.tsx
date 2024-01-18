import { render } from '@testing-library/react';
import React from 'react';
import Pricing from '..';

describe('Pricing', () => {
  test('render default', () => {
    const wrapper = render(
      <Pricing id='id' title='title' subtitle='subtitle' plans={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
