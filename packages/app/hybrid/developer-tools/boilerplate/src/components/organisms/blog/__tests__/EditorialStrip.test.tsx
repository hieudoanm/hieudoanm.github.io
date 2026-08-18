import { render, screen } from '@testing-library/react';
import { EditorialStrip } from '../EditorialStrip';

describe('EditorialStrip', () => {
  it('renders items with category and description', () => {
    render(
      <EditorialStrip
        items={[
          {
            id: '1',
            title: 'Deep dive',
            description: 'Long read.',
            category: 'Analysis',
          },
        ]}
      />
    );
    expect(screen.getByText('Editorial picks')).toBeInTheDocument();
    expect(screen.getByText('Deep dive')).toBeInTheDocument();
    expect(screen.getByText('Long read.')).toBeInTheDocument();
    expect(screen.getByText('Analysis')).toBeInTheDocument();
  });

  it('renders sequential numbering', () => {
    render(
      <EditorialStrip
        items={[
          { id: '1', title: 'One' },
          { id: '2', title: 'Two' },
        ]}
      />
    );
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });
});
