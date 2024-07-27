import { render } from '@testing-library/react';
import { PlayerStats } from '..';

describe('PlayerStats', () => {
  it('to match snapshot', () => {
    const { container } = render(<PlayerStats stats={[]} />);
    expect(container).toMatchSnapshot();
  });
});
