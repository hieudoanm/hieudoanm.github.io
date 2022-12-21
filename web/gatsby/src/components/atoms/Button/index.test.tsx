import React from 'react';
import { render } from '@testing-library/react';

import Button from './index';

describe('Button', () => {
  test('render default', () => {
    const wrapper = render(
      <Button type="button" className="">
        Button
      </Button>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
