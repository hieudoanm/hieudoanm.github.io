import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { PlayerStat } from '..';

describe('PlayerStat', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayerStat title="GM" average={0} max={0} icon={FaClock} />
    );
    expect(container).toMatchSnapshot();
  });
});
