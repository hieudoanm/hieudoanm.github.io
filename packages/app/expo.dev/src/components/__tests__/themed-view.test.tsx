import { render, screen } from '@testing-library/react-native';
import { ThemedView } from '../themed-view';

it('renders with background color from theme', async () => {
  await render(<ThemedView testID="view" />);

  const view = screen.getByTestId('view');
  expect(view).toBeDefined();
  expect(view).toHaveStyle({ backgroundColor: '#ffffff' });
});

it('renders with the given type color', async () => {
  await render(<ThemedView testID="view" type="backgroundElement" />);

  const view = screen.getByTestId('view');
  expect(view).toHaveStyle({ backgroundColor: '#F0F0F3' });
});

it('merges custom styles', async () => {
  await render(<ThemedView testID="view" style={{ padding: 10 }} />);

  const view = screen.getByTestId('view');
  expect(view).toHaveStyle({ backgroundColor: '#ffffff', padding: 10 });
});
