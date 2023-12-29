import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppsPage from '../../pages/apps';

describe('AppsPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <AppsPage />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
