import RctExperimentPage from '@/app/(games)/development-rcts/experiment/page';
import { render, screen } from '@testing-library/react';

describe('RctExperimentPage', () => {
  it('renders the RCT simulator', () => {
    render(<RctExperimentPage />);
    expect(
      screen.getByRole('heading', { name: /RCT Simulator/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Deworming & School Attendance/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Study A/ })).toBeInTheDocument();
  });
});
