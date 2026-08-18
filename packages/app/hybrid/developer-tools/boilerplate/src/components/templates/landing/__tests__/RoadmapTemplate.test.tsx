import { fireEvent, render, screen } from '@testing-library/react';
import { RoadmapTemplate } from '../RoadmapTemplate';

describe('RoadmapTemplate', () => {
  it('renders three phases with item counts', () => {
    render(<RoadmapTemplate />);
    expect(screen.getByText('Now')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Later')).toBeInTheDocument();
    expect(screen.getAllByText('2 items')).toHaveLength(3);
  });

  it('moves roadmap items between phases', () => {
    render(<RoadmapTemplate />);
    fireEvent.click(
      screen.getByRole('button', { name: /Move Launch billing v2 right/ })
    );
    expect(screen.getByText('3 items')).toBeInTheDocument();
    expect(screen.getAllByText('1 item')).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('button', { name: /Move AI assistant left/ })
    );
    expect(screen.getAllByText('1 item')).toHaveLength(2);
    expect(screen.getByText('4 items')).toBeInTheDocument();
  });
});
