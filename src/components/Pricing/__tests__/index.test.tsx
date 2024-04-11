import { render } from '@testing-library/react';
import React from 'react';
import { PricingSection } from '..';

describe('PricingSection', () => {
  test('render default', () => {
    const wrapper = render(
      <PricingSection id="id" title="title" subtitle="subtitle" plans={[]} />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
