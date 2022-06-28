import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Blogs from './index';

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

describe('Blogs', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <Blogs
          hero={{ id: '', title: '', subtitle: '', backgroundImage: '' }}
          title=""
          subtitle=""
          blogs={[]}
        />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
