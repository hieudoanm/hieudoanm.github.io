import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { ChessTitledStats } from '..';

describe('ChessPlayerStats', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChessTitledStats title="GM" average={0} max={0} icon={FaClock} />
    );
    expect(container).toMatchSnapshot();
  });
});
