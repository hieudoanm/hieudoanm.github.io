import React from 'react';
import { render } from '@testing-library/react';

import LogoClouds from './index';

describe('LogoClouds', () => {
  test('render default', () => {
    const wrapper = render(
      <LogoClouds id="id" title="title" subtitle="subtitle" logos={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
