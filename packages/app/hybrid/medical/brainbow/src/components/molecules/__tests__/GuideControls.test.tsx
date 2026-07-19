import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GuideControls } from '@/components/molecules/GuideControls';

describe('GuideControls', () => {
  it('toggles snapping and the guide grid', async () => {
    const user = userEvent.setup();
    const onToggleSnap = jest.fn();
    const onToggleGrid = jest.fn();
    render(
      <GuideControls
        snapEnabled={false}
        gridVisible={false}
        onToggleSnap={onToggleSnap}
        onToggleGrid={onToggleGrid}
      />
    );
    await user.click(screen.getByRole('button', { name: 'Snap to vertices' }));
    expect(onToggleSnap).toHaveBeenCalledWith(true);
    await user.click(screen.getByRole('button', { name: 'Guide grid' }));
    expect(onToggleGrid).toHaveBeenCalledWith(true);
  });
});
