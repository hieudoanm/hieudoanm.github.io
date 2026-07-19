import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChannelControl } from '@/components/molecules/ChannelControl';
import { ChannelHistogram } from '@/components/molecules/ChannelHistogram';
import { ImageToolbar } from '@/components/molecules/ImageToolbar';
import { EmptyState } from '@/components/molecules/EmptyState';
import { CalibrationInput } from '@/components/molecules/CalibrationInput';

describe('CalibrationInput', () => {
  it('emits the parsed pixels-per-micron value', () => {
    const onChange = jest.fn();
    render(<CalibrationInput value={null} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '4.5' },
    });
    expect(onChange).toHaveBeenCalledWith(4.5);
  });

  it('emits null when cleared or invalid', () => {
    const onChange = jest.fn();
    render(<CalibrationInput value={4.5} onChange={onChange} />);
    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledWith(null);
  });
});

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

describe('ImageToolbar', () => {
  it('shows the current zoom percentage', () => {
    render(
      <ImageToolbar
        zoom={1.5}
        onZoomIn={jest.fn()}
        onZoomOut={jest.fn()}
        onFit={jest.fn()}
        onRotateCW={jest.fn()}
        onRotateCCW={jest.fn()}
        onFlipX={jest.fn()}
        onFlipY={jest.fn()}
      />
    );
    expect(screen.getByText('150%')).toBeInTheDocument();
  });

  it('wires zoom and fit actions', async () => {
    const user = userEvent.setup();
    const onZoomIn = jest.fn();
    const onZoomOut = jest.fn();
    const onFit = jest.fn();
    render(
      <ImageToolbar
        zoom={1}
        onZoomIn={onZoomIn}
        onZoomOut={onZoomOut}
        onFit={onFit}
        onRotateCW={jest.fn()}
        onRotateCCW={jest.fn()}
        onFlipX={jest.fn()}
        onFlipY={jest.fn()}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Zoom in' }));
    await user.click(screen.getByRole('button', { name: 'Zoom out' }));
    await user.click(screen.getByRole('button', { name: 'Fit' }));
    expect(onZoomIn).toHaveBeenCalledTimes(1);
    expect(onZoomOut).toHaveBeenCalledTimes(1);
    expect(onFit).toHaveBeenCalledTimes(1);
  });
});

describe('ChannelHistogram', () => {
  it('renders one bar per histogram bin', () => {
    const { container } = render(
      <ChannelHistogram color="#ff0030" histogram={[0, 2, 0, 1]} />
    );
    const chart = container.querySelector(
      '[aria-label="Channel intensity histogram"]'
    );
    expect(chart?.children).toHaveLength(4);
  });

  it('shows the min, max, and mean readout', () => {
    render(
      <ChannelHistogram
        color="#ff0030"
        histogram={[0, 2, 0, 1]}
        stats={{ min: 1, max: 4, mean: 2.25, count: 4 }}
      />
    );
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('2.3')).toBeInTheDocument();
  });

  it('renders zero-height bars for an empty histogram', () => {
    const { container } = render(
      <ChannelHistogram color="#ff0030" histogram={[0, 0, 0]} />
    );
    const chart = container.querySelector(
      '[aria-label="Channel intensity histogram"]'
    );
    expect(chart?.children).toHaveLength(3);
  });
});

describe('EmptyState', () => {
  it('renders title, description, and action', () => {
    render(
      <EmptyState
        icon={<span>icon</span>}
        title="Nothing here"
        description="Load an image to begin."
        action={<button type="button">Go</button>}
      />
    );
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Load an image to begin.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});
