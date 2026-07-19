import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChannelControl } from '@/components/molecules/ChannelControl';

describe('ChannelControl', () => {
  const planes = [
    { id: 'r', name: 'Red', data: new Uint8ClampedArray(0) },
    { id: 'g', name: 'Green', data: new Uint8ClampedArray(0) },
    { id: 'fr', name: 'Far-red', data: new Uint8ClampedArray(0) },
  ];

  it('renders the channel name and toggles visibility', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();
    render(
      <ChannelControl
        name="Red"
        color="#ff0030"
        sourcePlane="r"
        planes={planes}
        visible
        opacity={1}
        onToggle={onToggle}
        onSourcePlaneChange={jest.fn()}
        onOpacityChange={jest.fn()}
      />
    );
    await user.click(screen.getByRole('checkbox', { name: 'Red channel' }));
    expect(onToggle).toHaveBeenCalledWith(false);
  });

  it('reports opacity changes as a 0-1 value', () => {
    const onOpacityChange = jest.fn();
    render(
      <ChannelControl
        name="Green"
        color="#00c853"
        sourcePlane="g"
        planes={planes}
        visible
        opacity={1}
        onToggle={jest.fn()}
        onSourcePlaneChange={jest.fn()}
        onOpacityChange={onOpacityChange}
      />
    );
    const slider = screen.getByRole('slider', { name: 'Green opacity' });
    fireEvent.change(slider, { target: { value: '25' } });
    expect(onOpacityChange).toHaveBeenCalledWith(0.25);
  });

  it('reports plane selections', () => {
    const onSourcePlaneChange = jest.fn();
    render(
      <ChannelControl
        name="Red"
        color="#ff0030"
        sourcePlane="r"
        planes={planes}
        visible
        opacity={1}
        onToggle={jest.fn()}
        onSourcePlaneChange={onSourcePlaneChange}
        onOpacityChange={jest.fn()}
      />
    );
    fireEvent.change(screen.getByRole('combobox', { name: 'Red plane' }), {
      target: { value: 'fr' },
    });
    expect(onSourcePlaneChange).toHaveBeenCalledWith('fr');
  });
});
