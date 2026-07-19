import { render, screen } from '@testing-library/react';
import CalculatorPage from '../personal/calculator/page';

const mockShowToast = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
  usePathname: jest.fn().mockReturnValue('/personal/calculator'),
}));

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

jest.mock('@/providers/ToastProvider', () => ({
  useToast: () => ({ showToast: mockShowToast }),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: jest.fn().mockReturnValue({
    user: { id: '1', name: 'Hieu' },
    loading: false,
  }),
}));

describe('CalculatorPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_MOCK_DELAY = '0';
  });

  it('renders calculator form', () => {
    render(<CalculatorPage />);
    expect(screen.getByText('Input')).toBeTruthy();
    expect(screen.getByText('Results')).toBeTruthy();
  });

  it('handleSave triggers toast', () => {
    render(<CalculatorPage />);
    const saveBtn = screen.getByText('Luu ket qua');
    saveBtn.click();
    expect(mockShowToast).toHaveBeenCalledWith(
      'Da luu ket qua tinh thue',
      'success'
    );
  });
});
