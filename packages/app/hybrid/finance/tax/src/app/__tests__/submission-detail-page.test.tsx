import { render, screen } from '@testing-library/react';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn(), back: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business/submission'),
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams('id=sub-1')),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    submissions: [
      {
        id: 'sub-1',
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
    ],
    loading: false,
  }),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: jest.fn() }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import SubmissionsPage from '../business/submission/page';

describe('SubmissionsPage (detail view)', () => {
  it('renders submission detail', () => {
    render(<SubmissionsPage />);
    expect(screen.getByText(/PIT/)).toBeTruthy();
  });

  it('shows not found when submission missing', () => {
    const { useData } = require('@/providers/DataProvider');
    const { useSearchParams } = require('next/navigation');
    useData.mockReturnValue({
      user: { id: '1', name: 'Hieu' },
      submissions: [],
      loading: false,
    });
    useSearchParams.mockReturnValue(new URLSearchParams('id=nonexistent'));
    render(<SubmissionsPage />);
    expect(screen.getByText('Khong tim thay khai bao')).toBeTruthy();
    expect(screen.getByText('Quay lai')).toBeTruthy();
  });
});
