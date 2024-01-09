import { render } from '@testing-library/react';
import { ChessHeader } from '..';

describe('ChessHeader', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChessHeader
        title=""
        name=""
        username=""
        verified={true}
        is_streamer={true}
        twitch_url=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
