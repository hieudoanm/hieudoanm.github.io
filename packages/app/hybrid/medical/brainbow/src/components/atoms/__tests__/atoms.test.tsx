import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/Button';
import { Toggle } from '@/components/atoms/Toggle';
import { Slider } from '@/components/atoms/Slider';
import { Badge } from '@/components/atoms/Badge';

describe('Button', () => {
  it('renders children and handles clicks', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Open</Button>);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant class names', () => {
    render(<Button variant="secondary">Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveClass(
      'btn-secondary'
    );
  });
});

describe('Toggle', () => {
  it('reflects checked state and reports changes', async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<Toggle checked={false} label="Red" onChange={onChange} />);
    await user.click(screen.getByRole('checkbox', { name: 'Red' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });
});

describe('Slider', () => {
  it('emits numeric values on change', () => {
    const onChange = jest.fn();
    render(
      <Slider
        value={50}
        min={0}
        max={100}
        ariaLabel="opacity"
        onChange={onChange}
      />
    );
    const slider = screen.getByRole('slider', { name: 'opacity' });
    fireEvent.change(slider, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });
});

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge variant="success">PNG</Badge>);
    expect(screen.getByText('PNG')).toHaveClass('badge-success');
  });
});
