import { render } from '@testing-library/react';
import React from 'react';
import ContactPage from '@hieudoanm/pages/profile/contact';

describe('ContactPage', () => {
  test('render default', () => {
    const wrapper = render(<ContactPage />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
