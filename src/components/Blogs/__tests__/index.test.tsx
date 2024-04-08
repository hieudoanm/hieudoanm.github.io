import { render } from '@testing-library/react';
import React from 'react';
import Blogs from '..';

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
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });

  test('render without blogs', () => {
    const wrapper = render(<Blogs id="id" title="title" subtitle="subtitle" />);
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
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
