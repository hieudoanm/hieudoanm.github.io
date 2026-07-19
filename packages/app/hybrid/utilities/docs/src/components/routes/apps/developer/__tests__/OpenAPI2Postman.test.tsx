import { render } from '@testing-library/react';
import { OpenAPI2Postman } from '../OpenAPI2Postman';

describe('OpenAPI2Postman', () => {
  it('should render', () => {
    const { container } = render(<OpenAPI2Postman onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
