import { render } from '@testing-library/react';
import React from 'react';
import Blog from '..';

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

describe('Blog', () => {
  test('render default', () => {
    const wrapper = render(
      <Blog url="" title="" description="" date=""></Blog>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
