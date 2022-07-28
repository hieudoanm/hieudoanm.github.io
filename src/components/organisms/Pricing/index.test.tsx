import React from 'react';
import { render } from '@testing-library/react';

import Pricing from './index';

describe('Pricing', () => {
  test('render default', () => {
    const wrapper = render(
      <Pricing id="id" title="title" subtitle="subtitle" plans={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
