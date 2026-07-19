import { render, screen, fireEvent } from '@testing-library/react';
import { RequestTabBar } from '../RequestTabBar';
import { emptyRequest, newTab } from '@/lib/http';

describe('RequestTabBar', () => {
  const onActivate = jest.fn();
  const onClose = jest.fn();
  const onAdd = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders tabs with method and path label', () => {
    const tabs = [
      newTab({ ...emptyRequest(), url: 'https://api.example.com/users' }),
      newTab(),
    ];
    render(
      <RequestTabBar
        tabs={tabs}
        activeId={tabs[0].id}
        onActivate={onActivate}
        onClose={onClose}
        onAdd={onAdd}
      />
    );
    expect(screen.getByText('/users')).toBeInTheDocument();
    expect(screen.getByText('New Request')).toBeInTheDocument();
  });

  it('activates a tab on click', () => {
    const tabs = [newTab(), newTab()];
    render(
      <RequestTabBar
        tabs={tabs}
        activeId={tabs[0].id}
        onActivate={onActivate}
        onClose={onClose}
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getAllByText('New Request')[1]);
    expect(onActivate).toHaveBeenCalledWith(tabs[1].id);
  });

  it('closes a tab when more than one exists', () => {
    const tabs = [
      newTab({ ...emptyRequest(), url: 'https://a.com/one' }),
      newTab({ ...emptyRequest(), url: 'https://b.com/two' }),
    ];
    render(
      <RequestTabBar
        tabs={tabs}
        activeId={tabs[0].id}
        onActivate={onActivate}
        onClose={onClose}
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getByLabelText('Close tab /one'));
    expect(onClose).toHaveBeenCalledWith(tabs[0].id);
  });

  it('does not render close buttons for a single tab', () => {
    const tabs = [newTab()];
    render(
      <RequestTabBar
        tabs={tabs}
        activeId={tabs[0].id}
        onActivate={onActivate}
        onClose={onClose}
        onAdd={onAdd}
      />
    );
    expect(
      screen.queryByLabelText('Close tab New Request')
    ).not.toBeInTheDocument();
  });

  it('adds a tab', () => {
    render(
      <RequestTabBar
        tabs={[newTab()]}
        activeId=""
        onActivate={onActivate}
        onClose={onClose}
        onAdd={onAdd}
      />
    );
    fireEvent.click(screen.getByLabelText('New tab'));
    expect(onAdd).toHaveBeenCalled();
  });
});
