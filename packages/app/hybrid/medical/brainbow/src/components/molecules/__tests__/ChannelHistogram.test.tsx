import { render, screen } from '@testing-library/react';
import { ChannelHistogram } from '@/components/molecules/ChannelHistogram';

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
