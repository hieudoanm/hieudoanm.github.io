import { render } from '@testing-library/react';
import { PlayersTitles } from '..';

describe('PlayersTitles', () => {
  it('to match snapshot', () => {
    const { container } = render(<PlayersTitles titles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
