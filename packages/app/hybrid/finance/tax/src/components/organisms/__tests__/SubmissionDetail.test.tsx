import { render, screen } from '@testing-library/react';
import { SubmissionDetail } from '../SubmissionDetail';
import { MOCK_SUBMISSIONS } from '@/data/mock';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), back: jest.fn() }),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('SubmissionDetail', () => {
  it('renders submission information', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('Cong Ty TNHH TechViet Solutions')).toBeTruthy();
    expect(screen.getByText(/Đã nộp/)).toBeTruthy();
  });

  it('renders tax type label', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText(/PIT/)).toBeTruthy();
  });

  it('renders documents', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('01-KK/TNCN Thang 12')).toBeTruthy();
    expect(screen.getByText('Bang luong thang 12')).toBeTruthy();
  });

  it('renders draft submission', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[2]} />);
    expect(screen.getByText(/Nháp/)).toBeTruthy();
  });

  it('renders notes when present', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[3]} />);
    expect(screen.getByText('Thieu chung tu ho tro')).toBeTruthy();
  });

  it('renders empty documents', () => {
    const sub = { ...MOCK_SUBMISSIONS[0], documents: [] };
    render(<SubmissionDetail submission={sub} />);
    expect(screen.getByText('Chua co ho so')).toBeTruthy();
  });

  it('shows Chua nop when no submittedAt', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[2]} />);
    expect(screen.getByText('Chua nop')).toBeTruthy();
  });

  it('shows Chua tinh when totalTaxAmount is 0', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[2]} />);
    expect(screen.getByText('Chua tinh')).toBeTruthy();
  });

  it('renders period', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('2025-12')).toBeTruthy();
  });

  it('renders document status using getAllByText', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    const verified = screen.getAllByText('verified');
    expect(verified.length).toBe(2);
  });

  it('renders pending document status', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[2]} />);
    expect(screen.getByText('pending')).toBeTruthy();
  });

  it('renders submitted date', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('Ngay nop')).toBeTruthy();
  });

  it('renders period label', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('Ky ke khai')).toBeTruthy();
  });

  it('renders deadline', () => {
    render(<SubmissionDetail submission={MOCK_SUBMISSIONS[0]} />);
    expect(screen.getByText('Han nop')).toBeTruthy();
  });
});
