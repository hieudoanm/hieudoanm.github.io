import { render, screen } from '@testing-library/react';
import LabelsPage from '@/app/(templates)/mail/labels/page';

describe('LabelsPage', () => {
  it('renders the LabelsPage', () => {
    render(<LabelsPage />);
    expect(screen.getByText('4 labels')).toBeInTheDocument();
  });
});
