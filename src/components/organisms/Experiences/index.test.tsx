import React from 'react';
import { render } from '@testing-library/react';

import ExperiencesSection from './index';

describe('ExperiencesSection', () => {
  test('render default', () => {
    const wrapper = render(
      <ExperiencesSection
        id="experiences"
        title="title"
        subtitle="subtitle"
        experiences={[]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
