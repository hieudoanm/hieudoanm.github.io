import { render } from '@testing-library/react';
import React from 'react';
import { FeaturesSection } from '..';

describe('FeaturesSection', () => {
  test('render default', () => {
    const wrapper = render(
      <FeaturesSection
        id='id'
        title=''
        subtitle=''
        features={[
          {
            id: 'id',
            title: 'title',
            description: 'description',
            placeholder: '',
            image: '',
          },
        ]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
