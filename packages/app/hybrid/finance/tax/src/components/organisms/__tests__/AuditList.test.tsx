import { render, screen } from '@testing-library/react';
import { AuditList } from '../AuditList';
import { MOCK_AUDITS } from '@/data/mock';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('AuditList', () => {
  it('renders audit cards', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    const companies = screen.getAllByText('Cong Ty TNHH TechViet Solutions');
    expect(companies.length).toBeGreaterThan(0);
  });

  it('renders audit type labels', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(screen.getAllByText(/Loai: automated/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Loai: internal/).length).toBeGreaterThan(0);
  });

  it('renders empty state', () => {
    render(<AuditList audits={[]} />);
    expect(screen.getByText('Chua co kiem toan nao')).toBeTruthy();
  });

  it('renders risk scores', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(screen.getByText('35')).toBeTruthy();
    expect(screen.getByText('85')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
  });

  it('renders status badges using getAllByText', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(screen.getAllByText(/Hoàn thành/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getAllByText(/Có vấn đề/).length).toBe(1);
  });

  it('renders links to audit detail', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(MOCK_AUDITS.length);
  });

  it('renders findings count', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(screen.getByText(/1 van de/)).toBeTruthy();
    expect(screen.getByText(/2 van de/)).toBeTruthy();
    expect(screen.getByText(/0 van de/)).toBeTruthy();
  });

  it('renders auditor info', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(
      screen.getAllByText(/Kiem toan vien: He thong/).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Kiem toan vien: Phong tai chinh/).length).toBe(
      1
    );
  });

  it('renders start date', () => {
    render(<AuditList audits={MOCK_AUDITS} />);
    expect(screen.getAllByText(/Bat dau:/).length).toBeGreaterThan(0);
  });
});
