import { render } from '@testing-library/react';
import React from 'react';
import CTA from '..';

describe('CTA', () => {
  test('render default', () => {
    const wrapper = render(
      <CTA
        id="id"
        title="title"
        subtitle="subtitle"
        backgroundImage=""
        cta="CTA"
      ></CTA>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
