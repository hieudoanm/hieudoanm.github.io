import { render } from '@testing-library/react';
import React from 'react';
import Stats from '..';

describe('Stats', () => {
  test('render default', () => {
    const wrapper = render(
      <Stats id="id" title="title" subtitle="subtitle" stats={[]}></Stats>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
