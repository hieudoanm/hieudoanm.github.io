import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UUID } from '../UUIDModal';

let callCount = 0;
const mockV1 = jest.fn(() => {
  callCount++;
  return `v1-${callCount}`;
});
const mockV4 = jest.fn(() => {
  callCount++;
  return `v4-${callCount}`;
});
const mockV7 = jest.fn(() => {
  callCount++;
  return `v7-${callCount}`;
});

jest.mock('uuid', () => ({
  v1: () => mockV1(),
  v4: () => mockV4(),
  v7: () => mockV7(),
}));

describe('UUID', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    callCount = 0;
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render with three UUID inputs', () => {
    const { container } = render(<UUID onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
    expect(screen.getAllByRole('textbox')).toHaveLength(3);
  });

  it('should regenerate all UUIDs when "↺ All" is clicked', () => {
    render(<UUID onClose={jest.fn()} />);
    const prevCalls = callCount;
    fireEvent.click(screen.getByText('↺ All'));
    expect(callCount).toBeGreaterThan(prevCalls);
  });

  it('should regenerate a single UUID', () => {
    render(<UUID onClose={jest.fn()} />);
    const prevCalls = callCount;
    const regenButtons = screen.getAllByTitle('Regenerate');
    fireEvent.click(regenButtons[0]);
    expect(callCount).toBeGreaterThan(prevCalls);
  });

  it('should copy UUID to clipboard and show check mark', async () => {
    render(<UUID onClose={jest.fn()} />);
    const copyButtons = screen.getAllByText('Copy');
    fireEvent.click(copyButtons[0]);
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(screen.getByText('✓')).toBeInTheDocument();
    });
  });

  it('should have correct descriptions for each UUID version', () => {
    render(<UUID onClose={jest.fn()} />);
    expect(screen.getByText('UUID v1')).toBeInTheDocument();
    expect(screen.getByText('UUID v4')).toBeInTheDocument();
    expect(screen.getByText('UUID v7')).toBeInTheDocument();
    expect(screen.getByText('Timestamp + MAC address')).toBeInTheDocument();
    expect(screen.getByText('Cryptographically random')).toBeInTheDocument();
    expect(screen.getByText('Unix timestamp + random')).toBeInTheDocument();
  });
});
