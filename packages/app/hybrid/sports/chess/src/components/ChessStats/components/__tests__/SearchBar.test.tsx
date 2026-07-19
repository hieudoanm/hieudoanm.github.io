import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(
      <SearchBar
        username=""
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={false}
        dbError={null}
        searchError={null}
      />
    );
    expect(screen.getByPlaceholderText('chess.com username')).toBeTruthy();
    expect(screen.getByText('Compare')).toBeTruthy();
  });

  it('calls onUsernameChange when typing', async () => {
    const onChange = jest.fn();
    render(
      <SearchBar
        username=""
        onUsernameChange={onChange}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={false}
        dbError={null}
        searchError={null}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText('chess.com username'),
      'alice'
    );
    expect(onChange).toHaveBeenCalled();
  });

  it('calls onSearch on Enter key', async () => {
    const onSearch = jest.fn();
    render(
      <SearchBar
        username="alice"
        onUsernameChange={jest.fn()}
        onSearch={onSearch}
        searching={false}
        dbLoading={false}
        dbError={null}
        searchError={null}
      />
    );
    await userEvent.type(
      screen.getByPlaceholderText('chess.com username'),
      '{Enter}'
    );
    expect(onSearch).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    render(
      <SearchBar
        username="alice"
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={true}
        dbLoading={false}
        dbError={null}
        searchError={null}
      />
    );
    expect(screen.queryByText('Compare')).toBeNull();
  });

  it('shows dbLoading message', () => {
    render(
      <SearchBar
        username=""
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={true}
        dbError={null}
        searchError={null}
      />
    );
    expect(screen.getByText(/Loading database/)).toBeTruthy();
  });

  it('shows dbError', () => {
    render(
      <SearchBar
        username=""
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={false}
        dbError={new Error('connection failed')}
        searchError={null}
      />
    );
    expect(screen.getByText(/DB error: connection failed/)).toBeTruthy();
  });

  it('shows searchError', () => {
    render(
      <SearchBar
        username=""
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={false}
        dbError={null}
        searchError="User not found"
      />
    );
    expect(screen.getByText('User not found')).toBeTruthy();
  });

  it('disables button when username is empty', () => {
    render(
      <SearchBar
        username="  "
        onUsernameChange={jest.fn()}
        onSearch={jest.fn()}
        searching={false}
        dbLoading={false}
        dbError={null}
        searchError={null}
      />
    );
    expect(screen.getByText('Compare')).toBeDisabled();
  });
});
