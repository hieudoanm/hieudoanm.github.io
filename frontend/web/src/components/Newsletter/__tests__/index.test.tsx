import { render } from '@testing-library/react';
import React from 'react';
import Newsletter from '..';

describe('Newsletter', () => {
  test('render default', () => {
    const wrapper = render(
      <Newsletter id='id' title='title' subtitle='subtitle' />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
