import { render, screen, fireEvent, act } from '@testing-library/react';
import { CodegenPanel } from '../CodegenPanel';
import { emptyRequest } from '@/lib/http';

describe('CodegenPanel', () => {
  beforeEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  it('renders the curl snippet by default', () => {
    render(
      <CodegenPanel
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
      />
    );
    expect(
      screen.getByText(/curl -X GET 'https:\/\/api.example.com\/users'/)
    ).toBeInTheDocument();
  });

  it('switches to the fetch format', () => {
    render(
      <CodegenPanel
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
      />
    );
    fireEvent.change(screen.getByLabelText('Code generation format'), {
      target: { value: 'fetch' },
    });
    expect(
      screen.getByText(
        /const response = await fetch\("https:\/\/api.example.com\/users"/
      )
    ).toBeInTheDocument();
  });

  it('copies the generated code', () => {
    render(
      <CodegenPanel
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
      />
    );
    fireEvent.click(screen.getByLabelText('Copy generated code'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      expect.stringContaining('curl')
    );
  });

  it('substitutes environment variables', () => {
    render(
      <CodegenPanel
        request={{ ...emptyRequest(), url: 'https://{{host}}/users' }}
        env={[
          { id: '1', key: 'host', value: 'api.example.com', enabled: true },
        ]}
      />
    );
    expect(
      screen.getByText(/curl -X GET 'https:\/\/api.example.com\/users'/)
    ).toBeInTheDocument();
  });

  it('shows a transient Copied state after copying', async () => {
    jest.useFakeTimers();
    render(
      <CodegenPanel
        request={{ ...emptyRequest(), url: 'https://api.example.com/users' }}
      />
    );
    fireEvent.click(screen.getByLabelText('Copy generated code'));
    await act(async () => {
      jest.advanceTimersByTime(0);
    });
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(1600);
    });
    expect(screen.getByText('Copy')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
