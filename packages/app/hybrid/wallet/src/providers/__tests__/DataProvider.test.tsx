import { render, screen } from '@testing-library/react';
import { DataProvider } from '../DataProvider';
import { useData } from '../DataProvider';

function TestComponent() {
  const { isAuthenticated, login, logout } = useData();
  return (
    <div>
      <span data-testid="auth">{String(isAuthenticated)}</span>
      <button onClick={() => login('test@example.com', 'pass')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('DataProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides initial state', () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
  });

  it('login sets isAuthenticated and persists to localStorage', async () => {
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    const loginBtn = screen.getByText('Login');
    await loginBtn.click();
    expect(screen.getByTestId('auth')).toHaveTextContent('true');
    expect(localStorage.getItem('wallet-auth')).toBe('true');
  });

  it('login returns false for empty email', async () => {
    function LoginTest() {
      const { login } = useData();
      const handleLogin = async () => {
        const result = await login('', 'pass');
        (window as any).__loginResult = result;
      };
      return <button onClick={handleLogin}>Login</button>;
    }

    render(
      <DataProvider>
        <LoginTest />
      </DataProvider>
    );
    await screen.getByText('Login').click();
    expect((window as any).__loginResult).toBe(false);
  });

  it('logout clears isAuthenticated and removes localStorage', async () => {
    localStorage.setItem('wallet-auth', 'true');
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(screen.getByTestId('auth')).toHaveTextContent('true');

    await screen.getByText('Logout').click();
    expect(screen.getByTestId('auth')).toHaveTextContent('false');
    expect(localStorage.getItem('wallet-auth')).toBeNull();
  });

  it('restores auth from localStorage on mount', () => {
    localStorage.setItem('wallet-auth', 'true');
    render(
      <DataProvider>
        <TestComponent />
      </DataProvider>
    );
    expect(screen.getByTestId('auth')).toHaveTextContent('true');
  });

  it('provides user data', () => {
    function UserTest() {
      const { user } = useData();
      return <span data-testid="user">{user?.name ?? 'none'}</span>;
    }

    render(
      <DataProvider>
        <UserTest />
      </DataProvider>
    );
    expect(screen.getByTestId('user')).toHaveTextContent('Alex Johnson');
  });

  it('updateUser updates user state', async () => {
    function UpdateTest() {
      const { user, updateUser } = useData();
      const handleUpdate = async () => {
        if (user) {
          await updateUser({ ...user, name: 'Jane Doe' });
        }
      };
      return (
        <div>
          <span data-testid="name">{user?.name}</span>
          <button onClick={handleUpdate}>Update</button>
        </div>
      );
    }

    render(
      <DataProvider>
        <UpdateTest />
      </DataProvider>
    );
    expect(screen.getByTestId('name')).toHaveTextContent('Alex Johnson');
    await screen.getByText('Update').click();
    expect(screen.getByTestId('name')).toHaveTextContent('Jane Doe');
  });
});
