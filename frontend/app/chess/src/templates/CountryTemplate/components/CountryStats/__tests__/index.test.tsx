import { render } from '@testing-library/react';
import { CountryStats, Stats } from '..';

describe('CountryStats', () => {
  it('to match snapshot', () => {
    const { container } = render(<CountryStats stats={{} as Stats} />);
    expect(container).toMatchSnapshot();
  });
});
