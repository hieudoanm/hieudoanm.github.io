import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyRow } from '../CopyRow';

describe('CopyRow', () => {
  it('renders label and value', () => {
    render(
      <CopyRow label="HEX" value="#ff0000" copied={null} onCopy={() => {}} />
    );
    expect(screen.getByText('HEX')).toBeInTheDocument();
    expect(screen.getByText('#ff0000')).toBeInTheDocument();
  });

  it('renders a swatch when provided', () => {
    const { container } = render(
      <CopyRow
        label="HEX"
        value="#ff0000"
        swatch="#ff0000"
        copied={null}
        onCopy={() => {}}
      />
    );
    const swatch = container.querySelector('[style*="background-color"]');
    expect(swatch).toBeInTheDocument();
  });

  it('calls onCopy with the value when the copy button is clicked', async () => {
    const onCopy = jest.fn();
    const user = userEvent.setup();
    render(
      <CopyRow label="HEX" value="#ff0000" copied={null} onCopy={onCopy} />
    );
    await user.click(screen.getByRole('button', { name: 'Copy HEX' }));
    expect(onCopy).toHaveBeenCalledWith('#ff0000');
  });

  it('shows a check icon when the value was copied', () => {
    render(
      <CopyRow label="HEX" value="#ff0000" copied="#ff0000" onCopy={() => {}} />
    );
    expect(
      screen.getByRole('button', { name: 'Copy HEX' })
    ).toBeInTheDocument();
  });
});
