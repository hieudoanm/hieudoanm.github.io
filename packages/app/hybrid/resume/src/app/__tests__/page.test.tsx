import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '../page';

jest.mock('next/link', () => {
  const Link = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  return Link;
});

describe('HomePage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the builder header and preview', () => {
    render(<HomePage />);
    expect(screen.getByText('Free Resume Builder')).toBeInTheDocument();
    expect(screen.getByLabelText('Paper size')).toBeInTheDocument();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<HomePage />);
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /version/i })).toBeInTheDocument();
  });

  it('resets the data after confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    render(<HomePage />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Someone Else' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.getByText('John Smith')).toBeInTheDocument();
  });

  it('keeps the data when reset is cancelled', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(false);
    render(<HomePage />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Someone Else' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^reset$/i }));
    expect(confirmSpy).toHaveBeenCalled();
    expect(screen.getByText('Someone Else')).toBeInTheDocument();
  });

  it('starts on the editor tab', () => {
    render(<HomePage />);
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(
      'Editor'
    );
  });

  it('shows the template picker on the templates tab', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: /templates/i }));
    const templateButtons = screen
      .getAllByRole('button')
      .filter((button) => button.getAttribute('aria-pressed') !== null);
    expect(templateButtons).toHaveLength(32);
    expect(screen.getAllByRole('button', { pressed: true })).toHaveLength(1);
  });

  it('selects a template from the templates tab', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: /templates/i }));
    fireEvent.click(screen.getByRole('button', { name: /modern/i }));
    expect(screen.getByRole('button', { name: /modern/i })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getAllByText('John Smith').length).toBeGreaterThan(0);
  });

  it('undoes an edit after the history debounce', async () => {
    render(<HomePage />);
    expect(screen.getByLabelText('Undo')).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Someone Else' },
    });

    await waitFor(() => expect(screen.getByLabelText('Undo')).toBeEnabled(), {
      timeout: 2000,
    });
    fireEvent.click(screen.getByLabelText('Undo'));

    expect(screen.getByLabelText('Full name')).toHaveValue('John Smith');
    expect(screen.getByLabelText('Redo')).toBeEnabled();
  });

  it('redoes an undone edit', async () => {
    render(<HomePage />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Someone Else' },
    });

    await waitFor(() => expect(screen.getByLabelText('Undo')).toBeEnabled(), {
      timeout: 2000,
    });
    fireEvent.click(screen.getByLabelText('Undo'));
    fireEvent.click(screen.getByLabelText('Redo'));

    expect(screen.getByLabelText('Full name')).toHaveValue('Someone Else');
  });

  it('creates, renames, and switches between profiles', () => {
    jest.spyOn(window, 'prompt').mockReturnValue('Second');
    render(<HomePage />);

    fireEvent.click(screen.getByRole('button', { name: 'New profile' }));
    fireEvent.click(screen.getByRole('button', { name: 'Rename profile' }));

    const select = screen.getByLabelText('Resume profile') as HTMLSelectElement;
    const firstId = select.options[0].value;
    const secondId = select.options[1].value;
    expect(secondId).toBe(select.value);

    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Someone Else' },
    });
    fireEvent.change(select, { target: { value: firstId } });
    expect(screen.getByLabelText('Full name')).toHaveValue('John Smith');

    fireEvent.change(select, { target: { value: secondId } });
    expect(screen.getByLabelText('Full name')).toHaveValue('Someone Else');
  });

  it('shows the data panel on the data tab', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: /^data$/i }));
    expect(
      screen.getByRole('button', { name: /^export json$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^import$/i })
    ).toBeInTheDocument();
  });

  it('loads an example from the data tab into the editor', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByRole('tab', { name: /^data$/i }));
    fireEvent.click(
      screen.getByRole('button', { name: /Maya Chen — Fresh Graduate/i })
    );
    fireEvent.click(screen.getByRole('tab', { name: /^editor$/i }));

    expect(screen.getByLabelText('Full name')).toHaveValue('Maya Chen');
  });
});
