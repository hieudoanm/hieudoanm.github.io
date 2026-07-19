import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/business/submission/new'),
}));

const mockShowToast = jest.fn();
const mockAddSubmission = jest.fn().mockResolvedValue(undefined);

jest.mock('@/providers/DataProvider', () => ({
  useData: () => ({
    user: { id: '1', name: 'Hieu' },
    companies: [{ id: 'c1', name: 'TechViet Solutions' }],
    addSubmission: mockAddSubmission,
    loading: false,
  }),
}));

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

jest.mock('@/components/templates/DashboardTemplate', () => ({
  DashboardTemplate: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

import NewSubmissionPage from '../business/submission/new/page';

describe('NewSubmissionPage', () => {
  beforeEach(() => {
    mockShowToast.mockClear();
    mockAddSubmission.mockClear();
    mockAddSubmission.mockResolvedValue(undefined);
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('renders form elements', () => {
    render(<NewSubmissionPage />);
    expect(screen.getByText('Tao Khai Bao Moi')).toBeTruthy();
    expect(screen.getByText('Doanh nghiep')).toBeTruthy();
    expect(screen.getByText('Loai thue')).toBeTruthy();
    expect(screen.getByText('Ky ke khai')).toBeTruthy();
    expect(screen.getByText('Han nop')).toBeTruthy();
    expect(screen.getByText('Ghi chu')).toBeTruthy();
  });

  it('shows error toast when submitting empty form', async () => {
    render(<NewSubmissionPage />);
    fireEvent.click(screen.getByText('Tao khai bao'));
    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        'Vui long dien day du thong tin',
        'error'
      );
    });
  });

  it('submits valid form successfully', async () => {
    const { useRouter } = require('next/navigation');
    render(<NewSubmissionPage />);

    // Select company
    const selects = screen.getAllByRole('combobox');
    fireEvent.change(selects[0], { target: { value: 'c1' } });

    // Fill period
    fireEvent.change(screen.getByPlaceholderText(/VD:/), {
      target: { value: '2025-12' },
    });

    // Fill deadline via querySelector
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
      fireEvent.change(dateInput, { target: { value: '2026-01-30' } });
    }

    fireEvent.click(screen.getByText('Tao khai bao'));

    await waitFor(() => {
      expect(mockAddSubmission).toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledWith(
        'Da tao khai bao moi',
        'success'
      );
      expect(useRouter().push).toHaveBeenCalled();
    });
  });
});
