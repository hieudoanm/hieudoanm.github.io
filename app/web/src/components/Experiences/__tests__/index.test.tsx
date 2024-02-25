import { render } from '@testing-library/react';
import React from 'react';
import ExperiencesSection from '..';

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
