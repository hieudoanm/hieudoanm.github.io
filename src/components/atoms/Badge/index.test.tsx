import React from 'react';
import { render } from '@testing-library/react';

import Badge from './index';

describe('Badge', () => {
  test('render default', () => {
    const wrapper = render(
      <Badge bgColor="bg-gray-900" className="">
        Badge
      </Badge>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
