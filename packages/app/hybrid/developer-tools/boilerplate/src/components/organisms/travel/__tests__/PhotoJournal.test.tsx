import { render, screen } from '@testing-library/react';
import { PhotoJournal } from '../PhotoJournal';

const entries = [
  {
    id: 'e1',
    title: 'Golden temple',
    date: 'Aug 05',
    location: 'Bangkok',
    caption: 'Early morning visit',
    likes: 32,
  },
];

describe('PhotoJournal', () => {
  it('renders entries with title, date and location', () => {
    render(<PhotoJournal entries={entries} />);
    expect(screen.getByText('Golden temple')).toBeInTheDocument();
    expect(screen.getByText('Aug 05')).toBeInTheDocument();
    expect(screen.getByText('Bangkok')).toBeInTheDocument();
  });

  it('renders captions and entry count', () => {
    render(<PhotoJournal entries={entries} />);
    expect(screen.getByText('Early morning visit')).toBeInTheDocument();
    expect(screen.getByText('1 entries')).toBeInTheDocument();
  });
});
