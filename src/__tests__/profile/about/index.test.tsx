import AboutPage from '@hieudoanm/pages/profile/about';
import { render } from '@testing-library/react';
import React from 'react';

describe('AboutPage', () => {
  test('render default', () => {
    const wrapper = render(<AboutPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
