import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Calendar } from '..';

describe('Calendar', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <Calendar />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
