import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { ChessPlayerStats } from '..';

describe('ChessPlayerStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChessPlayerStats label="" last={0} best={0} icon={FaClock} />
    );
    expect(container).toMatchSnapshot();
  });
});
