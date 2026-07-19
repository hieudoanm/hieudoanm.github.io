import { render, screen } from '@testing-library/react';
import UploadPage from '@/app/(templates)/support/upload/page';

describe('UploadPage', () => {
  it('renders the upload page', () => {
    render(<UploadPage />);
    expect(screen.getByRole('heading', { name: 'Upload' })).toBeInTheDocument();
  });
});
