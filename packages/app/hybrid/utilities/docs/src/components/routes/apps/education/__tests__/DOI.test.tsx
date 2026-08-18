import { render } from '@testing-library/react';
import { DOI } from '../DOI';

describe('DOI', () => {
  it('should render', () => {
    const { container } = render(<DOI onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
