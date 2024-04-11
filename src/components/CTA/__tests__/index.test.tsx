import { render } from '@testing-library/react';
import React from 'react';
import { CallToActionSection } from '..';

describe('CallToActionSection', () => {
  test('render default', () => {
    const wrapper = render(
      <CallToActionSection
        id="id"
        title="title"
        subtitle="subtitle"
        backgroundImage=""
        cta="CTA"
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
