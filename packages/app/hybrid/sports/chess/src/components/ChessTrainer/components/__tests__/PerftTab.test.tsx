import { fireEvent, render, screen } from '@testing-library/react';
import { PerftTab } from '../PerftTab';

describe('PerftTab', () => {
  it('runs perft and shows the node count', () => {
    render(<PerftTab />);
    fireEvent.click(screen.getByText('Run perft'));
    expect(screen.getByText(/20/)).toBeInTheDocument();
    expect(screen.getByText('a2a3')).toBeInTheDocument();
    expect(screen.getByText('a2a4')).toBeInTheDocument();
  });
});
