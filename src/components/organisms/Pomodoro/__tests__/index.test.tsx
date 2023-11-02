import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Pomodoro } from '..';

describe('Pomodoro', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <Pomodoro />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
