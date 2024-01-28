import { ChessTimeClass } from '@prisma/client';
import { render } from '@testing-library/react';
import { TitledChart } from '..';

describe('TitledChart', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <TitledChart timeClass={ChessTimeClass.classical} players={[]} />
    );
    expect(container).toMatchSnapshot();
  });
});
