import { render } from '@testing-library/react';
import { PlayerStats, Stats } from '..';

describe('PlayerStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayerStats players={[]} stats={{} as Stats} />
    );
    expect(container).toMatchSnapshot();
  });
});
