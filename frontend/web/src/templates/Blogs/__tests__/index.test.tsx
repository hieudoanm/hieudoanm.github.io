import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Blogs from '..';

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
