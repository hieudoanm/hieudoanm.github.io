import HomePage from '@broca/app/page';
import { render } from '@testing-library/react';

describe('HomePage', () => {
  it('to match snapshot', () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
