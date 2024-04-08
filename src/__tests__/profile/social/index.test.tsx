import SocialPage from '@hieudoanm/pages/profile/social';
import { render } from '@testing-library/react';
import React from 'react';

describe('SocialPage', () => {
  test('render default', () => {
    const wrapper = render(<SocialPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
