import { render } from '@testing-library/react';
import { Trends } from './Trends';

describe('Trends', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <Trends country='' queries={[]} defaultChecked={false} />
    );
    expect(container).toMatchSnapshot();
  });
});
