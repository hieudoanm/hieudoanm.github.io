import { render } from '@testing-library/react';
import React from 'react';
import Contact from '..';

describe('Contact', () => {
  test('render default', () => {
    const wrapper = render(
      <Contact id="id" title="title" subtitle="subtitle" />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
