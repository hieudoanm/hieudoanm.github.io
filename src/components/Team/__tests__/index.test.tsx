import { render } from '@testing-library/react';
import React from 'react';
import { TeamSection } from '../index';

describe('TeamSection', () => {
  test('render default', () => {
    const wrapper = render(
      <TeamSection id="id" title="title" subtitle="subtitle" team={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
