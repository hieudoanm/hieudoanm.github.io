import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Blogs from './index';

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
