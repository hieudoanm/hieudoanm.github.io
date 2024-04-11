import { render } from '@testing-library/react';
import React from 'react';
import { ContactSection } from '..';

describe('Contact', () => {
  test('render default', () => {
    const wrapper = render(
      <ContactSection id="id" title="title" subtitle="subtitle" />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
