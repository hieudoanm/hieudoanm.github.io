import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SatisfactionWithLifeScale } from '@/components/scales/SatisfactionWithLifeScale';

const answerAll = async (
  user: ReturnType<typeof userEvent.setup>,
  value: string
) => {
  const buttons = screen.getAllByRole('button', { name: value });
  for (const button of buttons) {
    await user.click(button);
  }
};

describe('SatisfactionWithLifeScale', () => {
  it('renders all five items', () => {
    render(<SatisfactionWithLifeScale onClose={jest.fn()} />);
    expect(
      screen.getByText('I am satisfied with my life.')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '7' })).toHaveLength(5);
  });

  it('completes the flow from answers to results and back', async () => {
    const user = userEvent.setup();
    render(<SatisfactionWithLifeScale onClose={jest.fn()} />);

    await answerAll(user, '6');

    await user.click(screen.getByRole('button', { name: /See Results/i }));
    expect(screen.getByText('Life Satisfaction Score')).toBeInTheDocument();
    expect(screen.getByText('30 / 35')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '← Edit Answers' }));
    expect(screen.getByRole('button', { name: /See Results/i })).toBeEnabled();
  });

  it('keeps See Results disabled until every item is answered', async () => {
    const user = userEvent.setup();
    render(<SatisfactionWithLifeScale onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: /See Results/i })).toBeDisabled();

    const buttons = screen.getAllByRole('button', { name: '4' });
    for (let i = 0; i < buttons.length - 1; i += 1) {
      await user.click(buttons[i]);
    }
    expect(screen.getByRole('button', { name: /See Results/i })).toBeDisabled();

    await user.click(buttons[buttons.length - 1]);
    expect(screen.getByRole('button', { name: /See Results/i })).toBeEnabled();
  });
});
