import { render, screen } from '@testing-library/react';
import { BlogFooter } from '../BlogFooter';

describe('BlogFooter', () => {
  it('to match snapshot', () => {
    const { container } = render(<BlogFooter />);
    expect(container).toMatchSnapshot();
  });

  it('renders default name', () => {
    render(<BlogFooter />);
    expect(screen.getByText('Blog')).toBeInTheDocument();
  });

  it('renders custom name', () => {
    render(<BlogFooter name="Dev Blog" />);
    expect(screen.getByText('Dev Blog')).toBeInTheDocument();
  });

  it('renders current year by default', () => {
    render(<BlogFooter />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
  });

  it('renders custom year', () => {
    render(<BlogFooter year={2024} />);
    expect(screen.getByText(/2024/)).toBeInTheDocument();
  });
});
