import { render, screen, fireEvent } from '@solidjs/testing-library';
import { TaxModal } from '../TaxModal';

describe('TaxModal', () => {
  it('renders Input and Results tabs', () => {
    render(() => <TaxModal onClose={() => {}} />);
    expect(screen.getByText('Input')).toBeInTheDocument();
    expect(screen.getByText('Results')).toBeInTheDocument();
  });

  it('renders period selector', () => {
    render(() => <TaxModal onClose={() => {}} />);
    expect(screen.getByText(/Kỳ tính thuế/)).toBeInTheDocument();
  });

  it('renders toggle button for Gross/Net', () => {
    render(() => <TaxModal onClose={() => {}} />);
    const labels = screen.getAllByText(/Gross/);
    expect(labels.length).toBeGreaterThan(0);
  });

  it('renders income input', () => {
    render(() => <TaxModal onClose={() => {}} />);
    expect(screen.getByText(/Thu nhập/)).toBeInTheDocument();
  });

  it('renders dependents input', () => {
    render(() => <TaxModal onClose={() => {}} />);
    expect(screen.getByText(/Người phụ thuộc/)).toBeInTheDocument();
  });
});
