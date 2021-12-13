import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NotFoundPage from '../../pages/404';

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
