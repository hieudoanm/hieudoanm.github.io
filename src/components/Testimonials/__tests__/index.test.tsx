import { render } from '@testing-library/react';
import React from 'react';
import { TestimonialsSection } from '../index';

describe('Testimonials', () => {
  test('render default', () => {
    const wrapper = render(
      <TestimonialsSection
        id='id'
        title='title'
        subtitle='subtitle'
        testimonials={[{ quote: '', author: '', position: '' }]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
