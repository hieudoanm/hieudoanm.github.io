import React from 'react';
import { render } from '@testing-library/react';

import CTA from './index';

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
