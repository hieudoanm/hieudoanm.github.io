import { render, screen, fireEvent } from '@solidjs/testing-library';
import { SplitBillModal } from '../SplitBillModal';

describe('SplitBillModal', () => {
  it('renders Equal Split and Who Owes Who tabs', () => {
    render(() => <SplitBillModal onClose={() => {}} />);
    expect(screen.getByText('Equal Split')).toBeInTheDocument();
    expect(screen.getByText('Who Owes Who')).toBeInTheDocument();
  });

  it('renders Total Bill input', () => {
    render(() => <SplitBillModal onClose={() => {}} />);
    expect(screen.getByText('Total Bill')).toBeInTheDocument();
  });

  it('renders Number of People input', () => {
    render(() => <SplitBillModal onClose={() => {}} />);
    expect(screen.getByText('Number of People')).toBeInTheDocument();
  });

  it('renders Tip and Tax inputs', () => {
    render(() => <SplitBillModal onClose={() => {}} />);
    expect(screen.getByText('Tip (%)')).toBeInTheDocument();
    expect(screen.getByText('Tax (%)')).toBeInTheDocument();
  });

  it('renders Per Person result', () => {
    render(() => <SplitBillModal onClose={() => {}} />);
    expect(screen.getByText('Per Person')).toBeInTheDocument();
  });
});
