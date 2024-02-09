import { render } from '@testing-library/react';
import { PlayersStats, Stats } from '..';

describe('PlayersStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayersStats players={[]} stats={{} as Stats} />
    );
    expect(container).toMatchSnapshot();
  });
});
