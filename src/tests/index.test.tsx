import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from '../pages';

jest.mock('gatsby', () => {
  return { graphql: jest.fn() };
});

describe('HomePage', () => {
  test('render default', () => {
    const wrapper = render(
      <BrowserRouter>
        <HomePage data={{ site: { siteMetadata: { profiles: [] } } }} />
      </BrowserRouter>
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
