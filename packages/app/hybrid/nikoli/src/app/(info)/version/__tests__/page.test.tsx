import { render, screen, fireEvent, act } from '@testing-library/react';
import VersionPage from '../page';

beforeEach(() => {
  jest.useFakeTimers();
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('VersionPage', () => {
  it('renders version heading', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    expect(screen.getByText('Nikoli Version')).toBeInTheDocument();
  });

  it('sets version from current date', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(year)).toBeInTheDocument();
  });

  it('renders copy button', async () => {
    await act(async () => {
      render(<VersionPage />);
    });
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });
});
