import { render } from '@testing-library/react';
import { PlayersTitlesTable } from '..';

describe('PlayersTitlesTable', () => {
  it('to match snapshot', () => {
    const { container } = render(<PlayersTitlesTable titles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
