import { render, screen } from '@testing-library/react';
import { SubmissionList } from '../SubmissionList';
import { MOCK_SUBMISSIONS } from '@/data/mock';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('SubmissionList', () => {
  it('renders submission cards', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    const companies = screen.getAllByText('Cong Ty TNHH TechViet Solutions');
    expect(companies.length).toBeGreaterThan(0);
  });

  it('renders empty state', () => {
    render(<SubmissionList submissions={[]} />);
    expect(screen.getByText('Chua co khai bao nao')).toBeTruthy();
  });

  it('renders create new link when empty', () => {
    render(<SubmissionList submissions={[]} />);
    expect(screen.getByText('Tao khai bao moi')).toBeTruthy();
  });

  it('renders status badges', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    expect(screen.getAllByText(/Đã nộp/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Chấp nhận/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Nháp/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Từ chối/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders links to submission detail', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(MOCK_SUBMISSIONS.length);
  });

  it('renders tax amount using regex', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    expect(screen.getByText(/125.*000/)).toBeTruthy();
  });

  it('renders company names for different companies', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    expect(
      screen.getAllByText('Cong Ty CP Digital Marketing VN').length
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders period info', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    expect(screen.getAllByText(/Ky:/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders document count', () => {
    render(<SubmissionList submissions={MOCK_SUBMISSIONS} />);
    expect(screen.getAllByText(/ho so/).length).toBeGreaterThan(0);
  });
});
