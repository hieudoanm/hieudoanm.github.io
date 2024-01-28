import { render } from '@testing-library/react';
import { CountryPlayers } from '..';

describe('CountryPlayers', () => {
  it('to match snapshot', () => {
    const { container } = render(<CountryPlayers total={0} players={[]} />);
    expect(container).toMatchSnapshot();
  });
});
