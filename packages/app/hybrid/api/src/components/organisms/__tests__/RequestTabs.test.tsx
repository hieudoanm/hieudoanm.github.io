import { render, screen, fireEvent } from '@testing-library/react';
import { emptyRequest } from '@/lib/http';
import { RequestTabs } from '../RequestTabs';

describe('RequestTabs', () => {
  const onChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all tabs', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    expect(screen.getByText('Params')).toBeInTheDocument();
    expect(screen.getByText('Headers')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Auth')).toBeInTheDocument();
  });

  it('shows params editor by default', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    expect(screen.getByLabelText('Query parameter key')).toBeInTheDocument();
  });

  it('switches to headers', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Headers'));
    expect(screen.getByLabelText('Header key')).toBeInTheDocument();
  });

  it('switches to body editor', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Body'));
    expect(screen.getByLabelText('Request body')).toBeInTheDocument();
  });

  it('switches to auth editor', () => {
    render(<RequestTabs request={emptyRequest()} onChange={onChange} />);
    fireEvent.click(screen.getByText('Auth'));
    expect(screen.getByLabelText('Auth type')).toHaveValue('none');
  });
});
