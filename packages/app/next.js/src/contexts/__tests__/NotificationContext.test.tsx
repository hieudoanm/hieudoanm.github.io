import { render, screen, fireEvent, act } from '@testing-library/react';
import {
  NotificationProvider,
  useNotification,
  NotificationType,
} from '../NotificationContext';

const mockUUID = '550e8400-e29b-41d4-a716-446655440000';
let uuidCounter = 0;

beforeEach(() => {
  uuidCounter = 0;
  jest.spyOn(crypto, 'randomUUID').mockImplementation(() => {
    uuidCounter++;
    return `${mockUUID}-${uuidCounter}`;
  });
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('NotificationContext', () => {
  it('renders children', () => {
    render(
      <NotificationProvider>
        <div data-testid="child">Hello</div>
      </NotificationProvider>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('throws when useNotification is used outside provider', () => {
    expect(() => render(<ThrowsOnMount />)).toThrow(
      'useNotification must be used within a NotificationProvider'
    );
  });

  it('starts with no notifications', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('adds a notification', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-info-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('removes a notification', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-info-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    fireEvent.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('does not add duplicate notifications with same message and type', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-info-btn'));
    fireEvent.click(screen.getByTestId('add-info-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
  });

  it('adds different notification types', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-success-btn'));
    fireEvent.click(screen.getByTestId('add-error-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('2');
    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('auto-removes notification after default timeout (3000ms)', () => {
    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-info-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.getByTestId('count')).toHaveTextContent('0');
  });

  it('clears timeout on manual remove', () => {
    const clearSpy = jest.spyOn(global, 'clearTimeout');

    render(
      <NotificationProvider>
        <Consumer />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-info-btn'));
    fireEvent.click(screen.getByTestId('remove-btn'));
    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(clearSpy).toHaveBeenCalled();
  });

  it('accepts custom timeout option', () => {
    render(
      <NotificationProvider>
        <CustomAdder />
      </NotificationProvider>
    );
    fireEvent.click(screen.getByTestId('add-custom-btn'));
    expect(screen.getByText('Custom timeout')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('Custom timeout')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(screen.queryByText('Custom timeout')).not.toBeInTheDocument();
  });
});

function ThrowsOnMount() {
  useNotification();
  return null;
}

function Consumer() {
  const { notifications, addNotification, removeNotification } =
    useNotification();
  return (
    <div>
      <span data-testid="count">{notifications.length}</span>
      {notifications.map((n) => (
        <div key={n.id} data-testid={`notif-${n.id}`}>
          <span>{n.message}</span>
        </div>
      ))}
      <button
        data-testid="add-info-btn"
        onClick={() => addNotification(NotificationType.Info, 'Info message')}>
        Add Info
      </button>
      <button
        data-testid="add-success-btn"
        onClick={() =>
          addNotification(NotificationType.Success, 'Success message')
        }>
        Add Success
      </button>
      <button
        data-testid="add-error-btn"
        onClick={() =>
          addNotification(NotificationType.Error, 'Error message')
        }>
        Add Error
      </button>
      {notifications.length > 0 && (
        <button
          data-testid="remove-btn"
          onClick={() => removeNotification(notifications[0].id)}>
          Remove
        </button>
      )}
    </div>
  );
}

function CustomAdder() {
  const { addNotification, notifications } = useNotification();
  return (
    <div>
      {notifications.map((n) => (
        <div key={n.id}>{n.message}</div>
      ))}
      <button
        data-testid="add-custom-btn"
        onClick={() =>
          addNotification(NotificationType.Warning, 'Custom timeout', {
            timeout: 5000,
          })
        }>
        Add Custom
      </button>
    </div>
  );
}
