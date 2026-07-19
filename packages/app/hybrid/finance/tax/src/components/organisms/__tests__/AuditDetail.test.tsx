import { render, screen } from '@testing-library/react';
import { AuditDetail } from '../AuditDetail';
import { MOCK_AUDITS } from '@/data/mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('AuditDetail', () => {
  it('renders company name and status', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText('Cong Ty TNHH TechViet Solutions')).toBeTruthy();
    expect(screen.getByText(/Hoàn thành/)).toBeTruthy();
  });

  it('renders findings with severity', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText(/Chenh lech giua tien thue/)).toBeTruthy();
    expect(screen.getByText('medium')).toBeTruthy();
  });

  it('renders check details section', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText('Kiem tra')).toBeTruthy();
    expect(screen.getByText('Ho so day du')).toBeTruthy();
    expect(screen.getByText('Tinh toan dung')).toBeTruthy();
  });

  it('renders flagged audit', () => {
    render(<AuditDetail audit={MOCK_AUDITS[1]} />);
    expect(screen.getByText(/Có vấn đề/)).toBeTruthy();
    expect(screen.getByText('critical')).toBeTruthy();
  });

  it('renders audit without findings section when empty', () => {
    render(<AuditDetail audit={MOCK_AUDITS[2]} />);
    expect(screen.queryByText(/Van de phat hien/)).toBeNull();
  });

  it('renders Dang tien hanh when no endDate', () => {
    render(<AuditDetail audit={MOCK_AUDITS[1]} />);
    expect(screen.getByText('Dang tien hanh')).toBeTruthy();
  });

  it('renders notes', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText('Ghi chu:')).toBeTruthy();
  });

  it('renders risk score', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText('35/100')).toBeTruthy();
  });

  it('renders high risk score', () => {
    render(<AuditDetail audit={MOCK_AUDITS[1]} />);
    expect(screen.getByText('85/100')).toBeTruthy();
  });

  it('renders resolved and unresolved findings', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getAllByText('✅').length).toBeGreaterThanOrEqual(1);
  });

  it('renders unresolved findings with warning', () => {
    render(<AuditDetail audit={MOCK_AUDITS[1]} />);
    expect(screen.getAllByText('⚠️').length).toBeGreaterThanOrEqual(1);
  });

  it('renders check with details', () => {
    render(<AuditDetail audit={MOCK_AUDITS[1]} />);
    expect(screen.getByText('Thieu bang luong chi tiet')).toBeTruthy();
  });

  it('renders endDate when present', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText('Ngay ket thuc')).toBeTruthy();
  });

  it('renders auditor info', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText(/Kiem toan vien: He thong/)).toBeTruthy();
  });

  it('renders audit type', () => {
    render(<AuditDetail audit={MOCK_AUDITS[0]} />);
    expect(screen.getByText(/automated/)).toBeTruthy();
  });
});
