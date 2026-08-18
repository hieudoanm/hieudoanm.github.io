import { render, screen } from '@testing-library/react';
import SubmissionPage from '../business/submission/page';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business/submission'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
}));

const mockUseData = jest.fn();

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('SubmissionPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      submissions: [],
      loading: false,
    });
    render(<SubmissionPage />);
    expect(screen.getByText('Chua co khai bao nao')).toBeTruthy();
  });

  it('renders submissions list with data', () => {
    mockUseData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      submissions: [
        {
          id: 's1',
          companyId: 'c1',
          companyName: 'TechViet',
          taxType: 'PIT',
          status: 'submitted',
          deadline: '2026-01-30',
          totalTaxAmount: 125000000,
          documents: [],
          createdAt: '2026-01-15',
          updatedAt: '2026-01-20',
        },
        {
          id: 's2',
          companyId: 'c1',
          companyName: 'TechViet',
          taxType: 'VAT',
          status: 'draft',
          deadline: '2026-01-30',
          totalTaxAmount: 350000000,
          documents: [],
          createdAt: '2026-01-10',
          updatedAt: '2026-01-25',
        },
      ],
      loading: false,
    });
    render(<SubmissionPage />);
    expect(screen.getByText('Khai Bao Thue')).toBeTruthy();
  });
});
