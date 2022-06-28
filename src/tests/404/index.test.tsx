import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../pages/404';

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

describe('NotFoundPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <NotFoundPage />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
