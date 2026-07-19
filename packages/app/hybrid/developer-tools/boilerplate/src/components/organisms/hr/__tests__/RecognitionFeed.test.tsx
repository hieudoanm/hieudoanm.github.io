import { render, screen } from '@testing-library/react';
import { RecognitionFeed } from '../RecognitionFeed';

describe('RecognitionFeed', () => {
  const items = [
    {
      id: '1',
      from: 'Ada Lovelace',
      to: 'Grace Hopper',
      message: 'Great code review!',
      time: '2h ago',
      badge: '🏆',
    },
  ];

  it('renders recognition items with sender and receiver', () => {
    render(<RecognitionFeed items={items} />);
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
    expect(screen.getByText('recognized')).toBeInTheDocument();
  });

  it('renders the message and time', () => {
    render(<RecognitionFeed items={items} />);
    expect(screen.getByText('Great code review!')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('shows an empty state when no recognitions exist', () => {
    render(<RecognitionFeed items={[]} />);
    expect(screen.getByText('No recognitions yet')).toBeInTheDocument();
  });
});
