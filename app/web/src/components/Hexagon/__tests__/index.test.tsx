import { render } from '@testing-library/react';
import React from 'react';
import { Hexagon } from '..';

describe('Hexagon', () => {
  it('to match snapshot', () => {
    const { container } = render(<Hexagon />);
    expect(container).toMatchSnapshot();
  });
});
