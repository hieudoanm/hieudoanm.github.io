import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { PlayerStat } from '..';

describe('PlayerStat', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayerStat
        timeClass={ChessTimeClass.classical}
        last={0}
        best={0}
        icon={<FaClock />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
