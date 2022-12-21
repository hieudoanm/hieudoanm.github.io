import { render } from '@testing-library/react';
import React from 'react';
import Navbar from './index';

jest.mock('gatsby', () => {
  return {
    graphql: jest.fn(),
    Link: jest.fn().mockImplementation(
      // these props are invalid for an `a` tag
      ({ to, ...rest }: { to: string }) =>
        React.createElement('a', {
          ...rest,
          href: to,
        })
    ),
  };
});

describe('Navbar', () => {
  test('render default', () => {
    const wrapper = render(<Navbar sections={[{ id: 'id' }]}></Navbar>);
    expect(wrapper.container).toMatchSnapshot();
  });
});
