import SocialPage from '@web/pages';
import { render } from '@testing-library/react';
import React from 'react';

describe('SocialPage', () => {
  test('render default', () => {
    const wrapper = render(<SocialPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
