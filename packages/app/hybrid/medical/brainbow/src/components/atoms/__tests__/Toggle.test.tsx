import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toggle } from '@/components/atoms/Toggle';

describe('Toggle', () => {
  it('reflects checked state and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle checked={false} label="Red" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Red' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
