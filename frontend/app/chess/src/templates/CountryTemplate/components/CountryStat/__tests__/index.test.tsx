import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { CountryStat } from '..';

describe('CountryStat', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <CountryStat
        timeClass={ChessTimeClass.blitz}
        average={0}
        max={0}
        icon={FaClock}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
