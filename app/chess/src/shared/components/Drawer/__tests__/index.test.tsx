import { render } from '@testing-library/react';
import { Drawer } from '..';

describe('Drawer', () => {
  it('to match snapshot', () => {
    const { container } = render(<Drawer />);
    expect(container).toMatchSnapshot();
  });
});
