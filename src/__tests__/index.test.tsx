import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages';

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

describe('HomePage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
