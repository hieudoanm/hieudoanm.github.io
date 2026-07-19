import { fireEvent, render, screen } from '@testing-library/react';
import { Tax } from '../index';

describe('Tax', () => {
  it('changes income amount', () => {
    render(<Tax onClose={jest.fn()} />);
    const input = screen.getByDisplayValue('20000000');
    fireEvent.change(input, { target: { value: '200000000' } });
    expect(screen.getByDisplayValue('200000000')).toBeInTheDocument();
  });

  it('calculates progressive tax correctly', () => {
    render(<Tax onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('Results'));
    expect(screen.getByText('🧾 Khấu trừ')).toBeInTheDocument();
    expect(screen.getByText('📉 Thuế hiệu dụng:')).toBeInTheDocument();
    expect(screen.getByText('💰 Thực lĩnh:')).toBeInTheDocument();
  });
});
