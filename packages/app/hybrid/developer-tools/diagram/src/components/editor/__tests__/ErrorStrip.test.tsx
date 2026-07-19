import { render, screen } from '@testing-library/react';
import ErrorStrip from '@/components/editor/ErrorStrip';

describe('ErrorStrip', () => {
  it('lists parse errors with their lines', () => {
    render(<ErrorStrip errors={[{ line: 3, message: 'bad line' }]} />);
    expect(screen.getByText('Parse errors')).toBeInTheDocument();
    expect(screen.getByText('line 3: bad line')).toBeInTheDocument();
  });
});
