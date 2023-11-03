import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PomodoroPage from '../../../pages/apps/pomodoro';

describe('PomodoroPage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <PomodoroPage />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
