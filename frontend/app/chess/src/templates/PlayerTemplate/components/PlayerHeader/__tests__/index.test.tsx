import { ChessTitle } from '@prisma/client';
import { render } from '@testing-library/react';
import { PlayerHeader } from '..';

describe('PlayerHeader', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayerHeader
        title={ChessTitle.GM}
        name=""
        username=""
        avatar=""
        verified={true}
        is_streamer={true}
        twitch_url=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
