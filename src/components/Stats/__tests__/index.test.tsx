import { render } from '@testing-library/react';
import React from 'react';
import { StatsSection } from '..';

describe('StatsSection', () => {
  test('render default', () => {
    const wrapper = render(
      <StatsSection id="id" title="title" subtitle="subtitle" stats={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
