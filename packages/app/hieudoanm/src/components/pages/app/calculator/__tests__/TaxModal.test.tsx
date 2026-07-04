import { fireEvent, render } from '@testing-library/react';
import { TaxModal } from '../TaxModal';

describe('TaxModal', () => {
  it('should render input tab', () => {
    const { container } = render(<TaxModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch to results tab', () => {
    const { getByText, container } = render(<TaxModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Results'));
    expect(container).toMatchSnapshot();
  });

  it('should toggle salary mode', () => {
    const { getByText } = render(<TaxModal onClose={jest.fn()} />);
    const toggle = getByText('Gross → Net');
    fireEvent.click(toggle);
    expect(getByText('Net → Gross')).toBeTruthy();
  });

  it('should toggle insurance', () => {
    const { container } = render(<TaxModal onClose={jest.fn()} />);
    const toggle = container.querySelector('.toggle');
    expect(toggle).toBeTruthy();
    fireEvent.click(toggle!);
    expect(toggle).not.toBeChecked();
  });

  it('should update income', () => {
    const { getByDisplayValue } = render(<TaxModal onClose={jest.fn()} />);
    const input = getByDisplayValue('20000000');
    fireEvent.change(input, { target: { value: '30000000' } });
    expect(getByDisplayValue('30000000')).toBeTruthy();
  });

  it('should update dependents', () => {
    const { getByDisplayValue } = render(<TaxModal onClose={jest.fn()} />);
    const input = getByDisplayValue('0');
    fireEvent.change(input, { target: { value: '2' } });
    expect(getByDisplayValue('2')).toBeTruthy();
  });

  it('should show results with computed values', () => {
    const { getByText, container } = render(<TaxModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Results'));
    expect(container).toMatchSnapshot();
  });

  it('should change period to annual', () => {
    const { getByText } = render(<TaxModal onClose={jest.fn()} />);
    fireEvent.click(getByText('🗓️ Năm'));
    fireEvent.click(getByText('Results'));
    expect(getByText('Results')).toBeTruthy();
  });

  it('should show net to gross mode results', () => {
    const { getByText, container } = render(<TaxModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Gross → Net'));
    fireEvent.click(getByText('Results'));
    expect(container).toMatchSnapshot();
  });
});
