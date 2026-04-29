import { render } from '@testing-library/react';
import { CityCard } from '../CityCard';

describe('CityCard', () => {
  it('should render', () => {
    const { container } = render(
      <CityCard label="test" time="test" weather={undefined} index={0} />
    );
    expect(container).toMatchSnapshot();
  });
});
