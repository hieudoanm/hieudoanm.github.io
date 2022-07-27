import React from 'react';
import { render } from '@testing-library/react';

import Newsletter from './index';

describe('Newsletter', () => {
  test('render default', () => {
    const wrapper = render(
      <Newsletter id="id" title="title" subtitle="subtitle"></Newsletter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
