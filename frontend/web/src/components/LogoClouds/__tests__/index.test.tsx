import { render } from '@testing-library/react';
import React from 'react';
import LogoClouds from '..';

describe('LogoClouds', () => {
  test('render default', () => {
    const wrapper = render(
      <LogoClouds id="id" title="title" subtitle="subtitle" logos={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
