import { render } from '@testing-library/react';
import { UUIDModal } from '../UUIDModal';

jest.mock('uuid', () => {
  return { v1: jest.fn(), v4: jest.fn(), v7: jest.fn() };
});

describe('UUIDModal', () => {
  it('should render', () => {
    const { container } = render(<UUIDModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
