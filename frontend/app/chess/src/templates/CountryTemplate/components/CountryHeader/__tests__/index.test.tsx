import { render } from '@testing-library/react';
import { CountryHeader } from '..';

describe('CountryChart', () => {
  it('to match snapshot', () => {
    const { container } = render(<CountryHeader countryCode="US" />);
    expect(container).toMatchSnapshot();
  });
});
