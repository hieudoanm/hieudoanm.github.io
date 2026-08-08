import { fireEvent, render, screen } from '@testing-library/react';
import { DataTableTemplate } from '../../hr/DataTableTemplate';
import { FormsShowcaseTemplate } from '../../hr/FormsShowcaseTemplate';
import { ChartsGalleryTemplate } from '../../hr/ChartsGalleryTemplate';
import { ModalsTemplate } from '../../hr/ModalsTemplate';
import { ForbiddenTemplate } from '../../auth/ForbiddenTemplate';
import DataTablePage from '@/app/(templates)/hr/data-table/page';
import FormsShowcasePage from '@/app/(templates)/hr/forms/page';
import ChartsGalleryPage from '@/app/(templates)/hr/charts/page';
import ModalsPage from '@/app/(templates)/hr/modals/page';
import ForbiddenPage from '@/app/(templates)/auth/forbidden/page';

describe('DataTableTemplate', () => {
  it('renders the table with default sorting and pagination', () => {
    render(<DataTableTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Data table' })
    ).toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Cara Lee')).toBeInTheDocument();
    expect(screen.queryByText('Dan Kim')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous page' })
    ).toBeDisabled();
  });

  it('filters rows by search query', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'Grace' },
    });
    expect(screen.getByText('Grace Tan')).toBeInTheDocument();
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('searches by category', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'finance' },
    });
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Frank Wu')).toBeInTheDocument();
  });

  it('shows empty state when nothing matches', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No rows match')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 1')).toBeInTheDocument();
  });

  it('toggles name sorting', () => {
    render(<DataTableTemplate />);
    const nameButton = screen.getByRole('button', { name: 'Sort by name' });
    fireEvent.click(nameButton);
    expect(screen.getByText('Hank Vu')).toBeInTheDocument();
    fireEvent.click(nameButton);
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('sorts by amount', () => {
    render(<DataTableTemplate />);
    const amountButton = screen.getByRole('button', { name: 'Sort by amount' });
    fireEvent.click(amountButton);
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    fireEvent.click(amountButton);
    expect(screen.getByText('Grace Tan')).toBeInTheDocument();
  });

  it('paginates through rows', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
    expect(screen.getByText('Dan Kim')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
  });

  it('changes rows per page', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Rows per page'), {
      target: { value: '5' },
    });
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    expect(screen.queryByText('Grace Tan')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('filters by status', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Filter by status'), {
      target: { value: 'Active' },
    });
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
    expect(screen.getByText('Eve Chen')).toBeInTheDocument();
    expect(screen.queryByText('Grace Tan')).not.toBeInTheDocument();
    expect(screen.queryByText('Hank Vu')).not.toBeInTheDocument();
    expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
  });

  it('combines search and status filter', () => {
    render(<DataTableTemplate />);
    fireEvent.change(screen.getByLabelText('Filter by status'), {
      target: { value: 'Active' },
    });
    fireEvent.change(screen.getByLabelText('Search rows'), {
      target: { value: 'Bob' },
    });
    expect(screen.getByText('No rows match')).toBeInTheDocument();
  });

  it('edits a row inline', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Alice Smith' }));
    const input = screen.getByLabelText('Edit name');
    expect(input).toHaveValue('Alice Smith');
    fireEvent.change(input, { target: { value: 'Alice Kim' } });
    fireEvent.click(screen.getByRole('button', { name: 'Save Alice Smith' }));
    expect(screen.getByText('Alice Kim')).toBeInTheDocument();
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
  });

  it('cancels an inline edit', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit Alice Smith' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel edit' }));
    expect(screen.queryByLabelText('Edit name')).not.toBeInTheDocument();
    expect(screen.getByText('Alice Smith')).toBeInTheDocument();
  });

  it('deletes a row', () => {
    render(<DataTableTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete Alice Smith' }));
    expect(screen.queryByText('Alice Smith')).not.toBeInTheDocument();
    expect(screen.getByText('Dan Kim')).toBeInTheDocument();
  });
});

describe('FormsShowcaseTemplate', () => {
  it('renders all form controls', () => {
    render(<FormsShowcaseTemplate />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Plan')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Add notes...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
  });

  it('submits a summary of all values', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Alice Kim' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'alice@test.com' },
    });
    fireEvent.change(screen.getByLabelText('Plan'), {
      target: { value: 'Pro' },
    });
    fireEvent.click(screen.getByLabelText('Design'));
    fireEvent.click(screen.getByLabelText('Business'));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '750' } });
    fireEvent.click(screen.getByLabelText('Notifications'));
    fireEvent.change(screen.getByPlaceholderText('Add notes...'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('name: Alice Kim');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'email: alice@test.com'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('plan: Pro');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'interests: Design'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('budget: 750');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'notifications: off'
    );
    expect(screen.getByText('Budget: $750')).toBeInTheDocument();
  });

  it('shows default values when nothing is changed', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('interests: none');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent(
      'notifications: on'
    );
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('plan: Free');
    expect(screen.getByText(/Submitted:/)).toHaveTextContent('budget: 500');
  });

  it('resets the summary', () => {
    render(<FormsShowcaseTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
    expect(screen.getByText(/Submitted:/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryByText(/Submitted:/)).not.toBeInTheDocument();
  });

  it('toggles interest checkboxes', () => {
    render(<FormsShowcaseTemplate />);
    const design = screen.getByLabelText('Design');
    fireEvent.click(design);
    expect(design).toBeChecked();
    fireEvent.click(design);
    expect(design).not.toBeChecked();
  });
});

describe('ChartsGalleryTemplate', () => {
  it('renders all chart sections with weekly data', () => {
    render(<ChartsGalleryTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Charts gallery' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Bar chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Line chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Donut chart' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Progress bars' })
    ).toBeInTheDocument();
    expect(screen.getByText('Dataset: Weekly — 7 values')).toBeInTheDocument();
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Weekly' })).toHaveClass(
      'btn-primary'
    );
  });

  it('switches to monthly dataset', () => {
    render(<ChartsGalleryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    expect(screen.getByText('Dataset: Monthly — 9 values')).toBeInTheDocument();
    expect(screen.getAllByText('120').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Monthly' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('button', { name: 'Weekly' })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('switches back to weekly dataset', () => {
    render(<ChartsGalleryTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Monthly' }));
    fireEvent.click(screen.getByRole('button', { name: 'Weekly' }));
    expect(screen.getByText('Dataset: Weekly — 7 values')).toBeInTheDocument();
    expect(screen.getAllByText('30').length).toBeGreaterThan(0);
  });
});

describe('ModalsTemplate', () => {
  it('renders trigger buttons and empty saved list', () => {
    render(<ModalsTemplate />);
    expect(
      screen.getByRole('button', { name: 'Basic modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirm modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Form modal' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Full-screen modal' })
    ).toBeInTheDocument();
    expect(screen.getByText('No saved items yet.')).toBeInTheDocument();
  });

  it('opens and closes the basic modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Basic modal' }));
    expect(
      screen.getByText('This is a simple modal with a message.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText('This is a simple modal with a message.')
    ).not.toBeInTheDocument();
  });

  it('cancels the confirm modal without a toast', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm modal' }));
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    expect(screen.queryByText('Item deleted')).not.toBeInTheDocument();
  });

  it('deletes from the confirm modal and shows a toast', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Confirm modal' }));
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    expect(screen.getByText('Item deleted')).toBeInTheDocument();
  });

  it('saves an item from the form modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Apple' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Item name')).toHaveValue('');
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(screen.queryByPlaceholderText('Item name')).not.toBeInTheDocument();
  });

  it('ignores blank saves', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('No saved items yet.')).toBeInTheDocument();
  });

  it('removes a saved item', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Form modal' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Apple' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.change(screen.getByPlaceholderText('Item name'), {
      target: { value: 'Pear' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Remove Apple' }));
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.getByText('Pear')).toBeInTheDocument();
  });

  it('opens and closes the full-screen modal', () => {
    render(<ModalsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Full-screen modal' }));
    expect(
      screen.getByText(
        'This modal fills the entire screen for immersive content.'
      )
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText(
        'This modal fills the entire screen for immersive content.'
      )
    ).not.toBeInTheDocument();
  });
});

describe('ForbiddenTemplate', () => {
  it('renders the 403 error page', () => {
    render(<ForbiddenTemplate />);
    expect(screen.getByText('Error 403')).toBeInTheDocument();
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
    expect(screen.getByText('Access denied')).toBeInTheDocument();
  });

  it('links to home and support', () => {
    render(<ForbiddenTemplate />);
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(
      screen.getByRole('link', { name: 'Contact support' })
    ).toHaveAttribute('href', '/shared/about');
  });
});

describe('DataTablePage', () => {
  it('renders the data table page', () => {
    render(<DataTablePage />);
    expect(
      screen.getByRole('heading', { name: 'Data table' })
    ).toBeInTheDocument();
  });
});

describe('FormsShowcasePage', () => {
  it('renders the forms showcase page', () => {
    render(<FormsShowcasePage />);
    expect(
      screen.getByRole('heading', { name: 'Forms showcase' })
    ).toBeInTheDocument();
  });
});

describe('ChartsGalleryPage', () => {
  it('renders the charts gallery page', () => {
    render(<ChartsGalleryPage />);
    expect(
      screen.getByRole('heading', { name: 'Charts gallery' })
    ).toBeInTheDocument();
  });
});

describe('ModalsPage', () => {
  it('renders the modals showcase page', () => {
    render(<ModalsPage />);
    expect(
      screen.getByRole('heading', { name: 'Modals showcase' })
    ).toBeInTheDocument();
  });
});

describe('ForbiddenPage', () => {
  it('renders the 403 page', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('Error 403')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go home' })).toHaveAttribute(
      'href',
      '/'
    );
  });
});
