import { render } from '@testing-library/react';
import React from 'react';
import Header from '..';

describe('Header', () => {
  test('render default', () => {
    const wrapper = render(<Header>Header</Header>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
