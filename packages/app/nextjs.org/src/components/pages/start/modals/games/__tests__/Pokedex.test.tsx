import { render } from '@testing-library/react';
import { PokedexModal } from '../PokedexModal';

describe('PokedexModal', () => {
  it('should render', () => {
    const { container } = render(<PokedexModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
