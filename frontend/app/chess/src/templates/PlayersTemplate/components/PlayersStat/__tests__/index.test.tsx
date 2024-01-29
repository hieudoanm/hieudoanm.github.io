import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { PlayersStat } from '..';

describe('PlayersStat', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <PlayersStat title="GM" average={0} max={0} icon={FaClock} />
    );
    expect(container).toMatchSnapshot();
  });
});
