import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { CountryChart } from '..';

describe('CountryChart', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <CountryChart timeClass={ChessTimeClass.classical} players={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
