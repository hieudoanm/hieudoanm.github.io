import { render } from '@testing-library/react';
import { FaClock } from 'react-icons/fa';
import { TitledStat } from '..';

describe('TitledStat', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <TitledStat title="GM" average={0} max={0} icon={FaClock} />
    );
    expect(container).toMatchSnapshot();
  });
});
