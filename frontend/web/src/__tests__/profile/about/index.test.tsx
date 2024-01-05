import { render } from '@testing-library/react';
import React from 'react';
import AboutPage from '@hieudoanm/pages/profile/about';

describe('AboutPage', () => {
  test('render default', () => {
    const wrapper = render(<AboutPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
