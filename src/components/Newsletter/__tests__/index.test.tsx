import { render } from '@testing-library/react';
import React from 'react';
import { NewsletterSection } from '..';

describe('Newsletter', () => {
  test('render default', () => {
    const wrapper = render(
      <NewsletterSection id="id" title="title" subtitle="subtitle" />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
