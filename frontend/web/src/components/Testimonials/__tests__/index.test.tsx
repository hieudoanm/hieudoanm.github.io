import { render } from '@testing-library/react';
import React from 'react';

import Testimonials from '../index';

describe('Testimonials', () => {
  test('render default', () => {
    const wrapper = render(
      <Testimonials
        id='id'
        title='title'
        subtitle='subtitle'
        testimonials={[{ quote: '', author: '', position: '' }]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
