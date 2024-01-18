import { render } from '@testing-library/react';
import React from 'react';
import CallToAction from '..';

describe('CallToAction', () => {
  test('render default', () => {
    const wrapper = render(
      <CallToAction
        id='id'
        title='title'
        subtitle='subtitle'
        backgroundImage=''
        cta='CTA'
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
