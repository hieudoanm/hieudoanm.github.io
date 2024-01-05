import React from 'react';
import { render } from '@testing-library/react';

import Team from '../index';

describe('Team', () => {
  test('render default', () => {
    const wrapper = render(
      <Team id="id" title="title" subtitle="subtitle" team={[]}></Team>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
