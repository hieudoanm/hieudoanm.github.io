import { render } from '@testing-library/react';
import React from 'react';

import Team from '../index';

describe('Team', () => {
  test('render default', () => {
    const wrapper = render(
      <Team id='id' title='title' subtitle='subtitle' team={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
