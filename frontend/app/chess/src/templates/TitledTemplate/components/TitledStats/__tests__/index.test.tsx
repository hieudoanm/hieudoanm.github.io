import { render } from '@testing-library/react';
import { Stats, TitledStats } from '..';

describe('TitledStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <TitledStats players={[]} stats={{} as Stats} />
    );
    expect(container).toMatchSnapshot();
  });
});
