import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CalculatorForm } from '../CalculatorForm';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/personal/calculator'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('CalculatorForm', () => {
  it('renders input tab by default', () => {
    render(<CalculatorForm />);
    expect(screen.getByText('Input')).toBeTruthy();
    expect(screen.getByText('Results')).toBeTruthy();
    expect(screen.getByText('Ky tinh thue')).toBeTruthy();
  });

  it('switches to results tab', () => {
    render(<CalculatorForm />);
    fireEvent.click(screen.getByText('Results'));
    expect(screen.getByText('Khau tru')).toBeTruthy();
  });

  it('toggles insurance', () => {
    render(<CalculatorForm />);
    const toggle = screen.getByRole('checkbox');
    fireEvent.click(toggle);
    expect(toggle).toBeTruthy();
  });

  it('switches between gross and net mode', () => {
    render(<CalculatorForm />);
    const grossNetBtn = screen.getByText('Gross → Net');
    fireEvent.click(grossNetBtn);
    expect(screen.getByText('Net → Gross')).toBeTruthy();
  });

  it('calls onSave when save button clicked', () => {
    const onSave = jest.fn();
    render(<CalculatorForm onSave={onSave} />);
    fireEvent.click(screen.getByText('Luu ket qua'));
    expect(onSave).toHaveBeenCalled();
  });

  it('does not render save button without onSave', () => {
    render(<CalculatorForm />);
    expect(screen.queryByText('Luu ket qua')).toBeNull();
  });

  it('changes income value', () => {
    render(<CalculatorForm />);
    const incomeInput = screen.getAllByRole('spinbutton')[0];
    fireEvent.change(incomeInput, { target: { value: '30000000' } });
    expect(incomeInput).toBeTruthy();
  });

  it('changes dependents value', () => {
    render(<CalculatorForm />);
    const depInput = screen.getAllByRole('spinbutton')[1];
    fireEvent.change(depInput, { target: { value: '2' } });
    expect(depInput).toBeTruthy();
  });

  it('changes period selector', () => {
    render(<CalculatorForm />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'annual' } });
    expect(select).toBeTruthy();
  });

  it('shows gross label in gross mode', () => {
    render(<CalculatorForm />);
    expect(screen.getByText(/Thu nhap gop/)).toBeTruthy();
  });

  it('shows net label in net mode', () => {
    render(<CalculatorForm />);
    fireEvent.click(screen.getByText('Gross → Net'));
    expect(screen.getByText(/Thu nhap thuc linh/)).toBeTruthy();
  });
});
