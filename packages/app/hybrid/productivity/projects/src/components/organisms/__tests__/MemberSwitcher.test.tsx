import { render, screen, fireEvent } from '@testing-library/react';
import { MemberSwitcher } from '@/components/organisms/MemberSwitcher';

const mockUseAuth = jest.fn();
const mockUseData = jest.fn();

jest.mock('@/providers/AuthProvider', () => ({
  useAuth: () => mockUseAuth(),
}));

jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

const members = [
  { id: 'mem-1', name: 'Alice Chen', email: 'a@x.com', avatar: 'AC' },
  { id: 'mem-2', name: 'Bob Smith', email: 'b@x.com', avatar: 'BS' },
];

beforeEach(() => {
  jest.clearAllMocks();
  mockUseData.mockReturnValue({ members });
  mockUseAuth.mockReturnValue({
    currentUser: null,
    switchMember: jest.fn(),
    signOut: jest.fn(),
  });
});

describe('MemberSwitcher', () => {
  it('shows a sign-in prompt when signed out', () => {
    render(<MemberSwitcher />);
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('shows the current user and lists every member to switch to', () => {
    mockUseAuth.mockReturnValue({
      currentUser: members[0],
      switchMember: jest.fn(),
      signOut: jest.fn(),
    });
    render(<MemberSwitcher />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(
      screen.getByRole('menuitem', { name: /Bob Smith/ })
    ).toBeInTheDocument();
  });

  it('switches to the selected member', () => {
    const switchMember = jest.fn();
    mockUseAuth.mockReturnValue({
      currentUser: null,
      switchMember,
      signOut: jest.fn(),
    });
    render(<MemberSwitcher />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: /Bob Smith/ }));
    expect(switchMember).toHaveBeenCalledWith('mem-2');
  });

  it('hides sign out when no user is signed in', () => {
    render(<MemberSwitcher />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(screen.queryByRole('menuitem', { name: 'Sign out' })).toBeNull();
  });

  it('shows sign out when signed in', () => {
    mockUseAuth.mockReturnValue({
      currentUser: members[0],
      switchMember: jest.fn(),
      signOut: jest.fn(),
    });
    render(<MemberSwitcher />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    expect(
      screen.getByRole('menuitem', { name: 'Sign out' })
    ).toBeInTheDocument();
  });

  it('signs out the current user', () => {
    const signOut = jest.fn();
    mockUseAuth.mockReturnValue({
      currentUser: members[0],
      switchMember: jest.fn(),
      signOut,
    });
    render(<MemberSwitcher />);
    fireEvent.click(screen.getByLabelText('Account menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));
    expect(signOut).toHaveBeenCalled();
  });
});
