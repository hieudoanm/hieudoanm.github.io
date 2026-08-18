import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CuisineSelect } from '../../components/CuisineSelect';
import {
  FIXTURE_CUISINES,
  FIXTURE_FOODS,
  FIXTURE_FOODS_MAP,
} from '../../testing/fixtures';

const setup = (value = 'all', onChange = jest.fn()) => {
  render(
    <CuisineSelect
      cuisines={FIXTURE_CUISINES}
      foods={FIXTURE_FOODS}
      value={value}
      onChange={onChange}
    />
  );
  return { onChange };
};

describe('CuisineSelect', () => {
  it('shows All Cuisines when nothing is selected', () => {
    setup();
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      'All Cuisines'
    );
    expect(screen.queryByTestId('cuisine-select-menu')).not.toBeInTheDocument();
  });

  it('shows the active food and its cuisine emoji', () => {
    setup('sushi');
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      'Sushi'
    );
    expect(screen.getByTestId('cuisine-select-trigger')).toHaveTextContent(
      '🇯🇵'
    );
  });

  it('opens a menu listing all foods grouped by cuisine', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    expect(screen.getByTestId('cuisine-select-menu')).toBeInTheDocument();
    expect(screen.getAllByText(/Italy|Japan/).length).toBeGreaterThan(0);
    expect(screen.getByTitle('Italy')).toBeInTheDocument();
    expect(screen.getByTitle('Japan')).toBeInTheDocument();
  });

  it('selecting the all option reports "all" and closes', async () => {
    const user = userEvent.setup();
    const { onChange } = setup('sushi');
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByRole('button', { name: /All Cuisines/ }));
    expect(onChange).toHaveBeenCalledWith('all');
    expect(screen.queryByTestId('cuisine-select-menu')).not.toBeInTheDocument();
  });

  it('expands a cuisine group and selects a food', async () => {
    const user = userEvent.setup();
    const { onChange } = setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByText('Japan'));
    await user.click(screen.getByRole('button', { name: /Sushi/ }));
    expect(onChange).toHaveBeenCalledWith('sushi');
    expect(screen.queryByTestId('cuisine-select-menu')).not.toBeInTheDocument();
  });

  it('filters by search text across labels and cuisines', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.type(screen.getByLabelText('Search foods'), 'piz');
    expect(screen.getByRole('button', { name: /Pizza/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Sushi/ })
    ).not.toBeInTheDocument();
  });

  it('searching expands collapsed groups automatically', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.type(screen.getByLabelText('Search foods'), 'sushi');
    expect(screen.getByRole('button', { name: /Sushi/ })).toBeInTheDocument();
  });

  it('filters with cuisine chips and toggles them off', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.click(screen.getByTitle('Italy'));
    await user.click(screen.getByText('Italy'));
    expect(screen.getByRole('button', { name: /Pizza/ })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Sushi/ })
    ).not.toBeInTheDocument();
    await user.click(screen.getByTitle('Italy'));
    await user.click(screen.getByTitle('Japan'));
    await user.click(screen.getByText('Japan'));
    expect(screen.getByRole('button', { name: /Sushi/ })).toBeInTheDocument();
  });

  it('closes on outside click and resets search state', async () => {
    const user = userEvent.setup();
    setup();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    await user.type(screen.getByLabelText('Search foods'), 'pizza');
    await user.click(document.body);
    expect(screen.queryByTestId('cuisine-select-menu')).not.toBeInTheDocument();
    await user.click(screen.getByTestId('cuisine-select-trigger'));
    expect(screen.getByLabelText('Search foods')).toHaveValue('');
  });

  it('maps fixture data consistently', () => {
    expect(FIXTURE_FOODS_MAP.italian).toEqual(['Pizza', 'Pasta']);
    expect(FIXTURE_FOODS_MAP.all).toEqual(['Pizza', 'Pasta', 'Sushi']);
  });
});
