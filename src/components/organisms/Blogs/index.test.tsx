import React from 'react';
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
      <Blogs
        id="id"
        title="title"
        subtitle="subtitle"
        blogs={[
          {
            id: 'id',
            url: 'url',
            title: 'title',
            description: '',
            date: 'date',
          },
        ]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  test('render without urlToImage', () => {
    const wrapper = render(
      <Blogs
        id="id"
        title="title"
        subtitle="subtitle"
        blogs={[
          {
            id: 'id',
            url: 'url',
            title: 'title',
            description: '',
            date: 'date',
          },
        ]}
      ></Blogs>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  test('render without blogs', () => {
    const wrapper = render(
      <Blogs id="id" title="title" subtitle="subtitle"></Blogs>
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  test('render without backgroundImage', () => {
    const wrapper = render(
      <Blogs
        id="id"
        title="title"
        subtitle="subtitle"
        blogs={[
          {
            id: 'id',
            title: 'title',
            description: '',
            url: 'url',
            date: 'date',
          },
        ]}
      ></Blogs>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
