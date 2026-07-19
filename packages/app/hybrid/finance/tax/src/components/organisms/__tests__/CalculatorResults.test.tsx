import { render, screen } from '@testing-library/react';
import { CalculatorResults } from '../CalculatorResults';

const mockData = {
  grossMonthly: 20_000_000,
  insuranceBase: 20_000_000,
  employeeInsurance: 2_100_000,
  employerInsurance: 4_300_000,
  personalDeduction: 11_000_000,
  dependentDeduction: 4_400_000,
  totalDeductions: 17_500_000,
  taxableIncome: 2_500_000,
  breakdown: [{ rate: 0.05, taxable: 2_500_000, tax: 125_000 }],
  totalTax: 125_000,
  netMonthly: 17_775_000,
  effectiveTaxRate: 0.00625,
  totalLaborCost: 24_300_000,
};

describe('CalculatorResults', () => {
  it('renders deductions breakdown', () => {
    render(<CalculatorResults data={mockData} insuranceEnabled={true} />);
    expect(screen.getByText('Khau tru')).toBeTruthy();
    expect(screen.getByText('Ca nhan:')).toBeTruthy();
    expect(screen.getByText('Phu thuoc:')).toBeTruthy();
    expect(screen.getByText('Bao hiem NLĐ:')).toBeTruthy();
    expect(screen.getByText('Tong:')).toBeTruthy();
  });

  it('renders tax details', () => {
    render(<CalculatorResults data={mockData} insuranceEnabled={true} />);
    expect(screen.getByText('Thu nhap chiu thue:')).toBeTruthy();
    expect(screen.getByText('Thue hieu dung:')).toBeTruthy();
    expect(screen.getByText('Thuc linh:')).toBeTruthy();
    expect(screen.getByText('Tong chi phi DN:')).toBeTruthy();
  });

  it('renders breakdown table', () => {
    render(<CalculatorResults data={mockData} insuranceEnabled={true} />);
    expect(screen.getByText('Chi tiet thue')).toBeTruthy();
    expect(screen.getByText('5%')).toBeTruthy();
  });

  it('shows insurance cap message when applicable', () => {
    const data = {
      ...mockData,
      insuranceBase: 36_000_000,
      grossMonthly: 50_000_000,
    };
    render(<CalculatorResults data={data} insuranceEnabled={true} />);
    expect(screen.getByText('Ap dung truong bao hiem')).toBeTruthy();
  });

  it('hides insurance cap message when insurance disabled', () => {
    const data = {
      ...mockData,
      insuranceBase: 36_000_000,
      grossMonthly: 50_000_000,
    };
    render(<CalculatorResults data={data} insuranceEnabled={false} />);
    expect(screen.queryByText('Ap dung truong bao hiem')).toBeNull();
  });

  it('renders with empty breakdown', () => {
    const data = { ...mockData, breakdown: [] };
    render(<CalculatorResults data={data} insuranceEnabled={true} />);
    expect(screen.queryByText('Chi tiet thue')).toBeNull();
  });

  it('renders multiple breakdown rows', () => {
    const data = {
      ...mockData,
      breakdown: [
        { rate: 0.05, taxable: 5_000_000, tax: 250_000 },
        { rate: 0.1, taxable: 5_000_000, tax: 500_000 },
      ],
    };
    render(<CalculatorResults data={data} insuranceEnabled={true} />);
    expect(screen.getByText('5%')).toBeTruthy();
    expect(screen.getByText('10%')).toBeTruthy();
  });
});
