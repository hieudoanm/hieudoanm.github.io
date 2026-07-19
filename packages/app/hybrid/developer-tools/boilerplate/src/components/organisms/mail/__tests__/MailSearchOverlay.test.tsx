import { fireEvent, render, screen } from '@testing-library/react';
import { MailSearchOverlay } from '../MailSearchOverlay';

describe('MailSearchOverlay', () => {
  const results = [
    { id: '1', title: 'Invoice', snippet: 'Invoice from Acme…' },
  ];

  it('renders the search input', () => {
    render(<MailSearchOverlay />);
    expect(screen.getByLabelText('Search mail')).toBeInTheDocument();
    expect(screen.getByText('Type to search your mail')).toBeInTheDocument();
  });

  it('fires onSearch with the query', () => {
    const onSearch = jest.fn();
    render(<MailSearchOverlay onSearch={onSearch} />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'invoice' },
    });
    fireEvent.click(screen.getByText('Search'));
    expect(onSearch).toHaveBeenCalledWith('invoice');
  });

  it('fires onSearch on Enter key', () => {
    const onSearch = jest.fn();
    render(<MailSearchOverlay onSearch={onSearch} />);
    fireEvent.change(screen.getByLabelText('Search mail'), {
      target: { value: 'tax' },
    });
    fireEvent.keyDown(screen.getByLabelText('Search mail'), {
      key: 'Enter',
    });
    expect(onSearch).toHaveBeenCalledWith('tax');
  });

  it('renders search results and selects them', () => {
    const onSelect = jest.fn();
    render(<MailSearchOverlay results={results} onSelect={onSelect} />);
    fireEvent.click(screen.getByText('Invoice'));
    expect(onSelect).toHaveBeenCalledWith(results[0]);
  });
});
