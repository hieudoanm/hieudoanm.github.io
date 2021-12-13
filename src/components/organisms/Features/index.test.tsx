import { render } from '@testing-library/react';
import React from 'react';

import Features from './index';

describe('Features', () => {
  test('render default', () => {
    const wrapper = render(
      <Features
        id="id"
        title=""
        subtitle=""
        features={[
          {
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
