jest.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: () => Promise.resolve({ toDataURL: () => '', toBlob: () => {} }),
}));

import { fireEvent, render } from '@testing-library/react';
import { SplitBillModal } from '../SplitBillModal';

describe('SplitBillModal', () => {
  it('should render equal split tab', () => {
    const { container } = render(<SplitBillModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch to settle tab', () => {
    const { getByText, container } = render(
      <SplitBillModal onClose={jest.fn()} />
    );
    fireEvent.click(getByText('Who Owes Who'));
    expect(container).toMatchSnapshot();
  });

  it('should compute settlements', () => {
    const { getByText, container } = render(
      <SplitBillModal onClose={jest.fn()} />
    );
    fireEvent.click(getByText('Who Owes Who'));
    fireEvent.click(getByText('Settle Up'));
    expect(container).toMatchSnapshot();
  });

  it('should add a person', () => {
    const { getByText, getAllByPlaceholderText } = render(
      <SplitBillModal onClose={jest.fn()} />
    );
    fireEvent.click(getByText('Who Owes Who'));
    fireEvent.click(getByText('+ Add Person'));
    expect(getAllByPlaceholderText('Name')).toHaveLength(4);
  });

  it('should remove a person', () => {
    const { getByText, getAllByPlaceholderText, getAllByText } = render(
      <SplitBillModal onClose={jest.fn()} />
    );
    fireEvent.click(getByText('Who Owes Who'));
    const removes = getAllByText('✕');
    fireEvent.click(removes[removes.length - 1]);
    expect(getAllByPlaceholderText('Name')).toHaveLength(2);
  });
});
