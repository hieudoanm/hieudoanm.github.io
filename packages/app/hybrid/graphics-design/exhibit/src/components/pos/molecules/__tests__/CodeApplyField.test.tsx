import { render, screen, fireEvent } from '@testing-library/react';
import { CodeApplyField } from '@/components/pos/molecules/CodeApplyField';

const renderComponent = (
  props: Partial<React.ComponentProps<typeof CodeApplyField>> = {}
) => {
  const defaultProps = {
    label: 'Discount Code',
    placeholder: 'Enter code',
    value: '',
    onChange: jest.fn(),
    onApply: jest.fn(),
    ...props,
  };
  return { ...render(<CodeApplyField {...defaultProps} />), ...defaultProps };
};

describe('CodeApplyField', () => {
  it('renders the label and placeholder', () => {
    renderComponent();
    expect(screen.getByText('Discount Code')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter code')).toBeInTheDocument();
  });

  it('reports input changes', () => {
    const { onChange } = renderComponent();
    fireEvent.change(screen.getByPlaceholderText('Enter code'), {
      target: { value: 'SAVE10' },
    });
    expect(onChange).toHaveBeenCalledWith('SAVE10');
  });

  it('calls onApply when Apply is pressed', () => {
    const { onApply } = renderComponent();
    fireEvent.click(screen.getByText('Apply'));
    expect(onApply).toHaveBeenCalledTimes(1);
  });

  it('renders feedback when provided', () => {
    renderComponent({ feedback: 'Applied: SAVE10 (10% off)' });
    expect(screen.getByText('Applied: SAVE10 (10% off)')).toBeInTheDocument();
  });

  it('omits feedback when not provided', () => {
    renderComponent();
    expect(screen.queryByText(/Applied:/)).not.toBeInTheDocument();
  });
});
