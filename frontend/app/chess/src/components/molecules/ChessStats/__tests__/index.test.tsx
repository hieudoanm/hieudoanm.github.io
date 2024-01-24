import { render } from '@testing-library/react';
import { ChessStats } from '..';

describe('ChessStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChessStats label="" last={0} best={0} icon={undefined} />
    );
    expect(container).toMatchSnapshot();
  });
});
