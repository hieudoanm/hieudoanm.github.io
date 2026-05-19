import { render } from '@testing-library/react';
import { JSONSchemaModal } from '../JSONSchemaModal';

describe('JSONSchemaModal', () => {
  it('should render', () => {
    const { container } = render(<JSONSchemaModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
