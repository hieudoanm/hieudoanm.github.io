import { render } from '@testing-library/react';
import { TitledPlayers } from '..';

describe('TitledPlayers', () => {
  it('to match snapshot', () => {
    const { container } = render(<TitledPlayers players={[]} />);
    expect(container).toMatchSnapshot();
  });
});
