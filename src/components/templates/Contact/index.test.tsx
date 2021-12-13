import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import ContactTemplate from './index';

describe('Contact', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <>
          <ContactTemplate
            sections={[]}
            hero={{
              id: 'id',
              title: 'title',
              subtitle: 'subtitle',
              backgroundImage: '',
            }}
            pricing={{
              id: 'id',
              title: 'title',
              subtitle: 'subtitle',
              plans: [],
            }}
            contact={{
              id: '',
              title: 'title',
            }}
          />
        </>
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
