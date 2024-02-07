import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { PlayersDistribution } from '..';

describe('PlayersDistribution', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayersDistribution timeClass={ChessTimeClass.classical} players={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
