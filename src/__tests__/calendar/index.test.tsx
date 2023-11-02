import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CalendarPage from '../../pages/calendar';

describe('CalendarPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <CalendarPage />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
