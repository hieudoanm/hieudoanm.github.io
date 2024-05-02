import { render } from '@testing-library/react';
import React from 'react';
import { LogosCloudSection } from '..';

describe('LogoClouds', () => {
  test('render default', () => {
    const wrapper = render(
      <LogosCloudSection id='id' title='title' subtitle='subtitle' logos={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
