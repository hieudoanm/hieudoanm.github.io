import { fireEvent, render, screen } from '@testing-library/react';
import { seedResumeData } from '../../../../data/seed';
import type { ResumeProfile } from '../../../../hooks/useResumeProfiles';
import { ProfileSwitcher } from '../ProfileSwitcher';

const profiles: ResumeProfile[] = [
  { id: 'p1', name: 'John', data: seedResumeData },
  { id: 'p2', name: 'Maya', data: seedResumeData },
];

const renderSwitcher = (
  overrides: Partial<Parameters<typeof ProfileSwitcher>[0]> = {}
) => {
  const props = {
    profiles,
    activeId: 'p1',
    onSelect: jest.fn(),
    onCreate: jest.fn(),
    onRename: jest.fn(),
    onDelete: jest.fn(),
    ...overrides,
  };
  render(<ProfileSwitcher {...props} />);
  return props;
};

describe('ProfileSwitcher', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders every profile name as an option', () => {
    renderSwitcher();
    const select = screen.getByLabelText('Resume profile') as HTMLSelectElement;
    expect(select.value).toBe('p1');
    expect(screen.getByRole('option', { name: 'John' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Maya' })).toBeInTheDocument();
  });

  it('fires onSelect when the active profile changes', () => {
    const props = renderSwitcher();
    fireEvent.change(screen.getByLabelText('Resume profile'), {
      target: { value: 'p2' },
    });
    expect(props.onSelect).toHaveBeenCalledWith('p2');
  });

  it('creates a new profile', () => {
    const props = renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'New profile' }));
    expect(props.onCreate).toHaveBeenCalled();
  });

  it('renames the active profile', () => {
    const promptSpy = jest.spyOn(window, 'prompt').mockReturnValue('New Name');
    const props = renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Rename profile' }));
    expect(promptSpy).toHaveBeenCalledWith('Profile name', 'John');
    expect(props.onRename).toHaveBeenCalledWith('p1', 'New Name');
  });

  it('skips renaming on cancel, blank input, or an unchanged name', () => {
    const promptSpy = jest.spyOn(window, 'prompt');
    const props = renderSwitcher();

    promptSpy.mockReturnValue(null);
    fireEvent.click(screen.getByRole('button', { name: 'Rename profile' }));
    promptSpy.mockReturnValue('   ');
    fireEvent.click(screen.getByRole('button', { name: 'Rename profile' }));
    promptSpy.mockReturnValue('John');
    fireEvent.click(screen.getByRole('button', { name: 'Rename profile' }));

    expect(props.onRename).not.toHaveBeenCalled();
  });

  it('deletes the active profile after confirmation', () => {
    const confirmSpy = jest.spyOn(window, 'confirm').mockReturnValue(true);
    const props = renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Delete profile' }));
    expect(confirmSpy).toHaveBeenCalledWith('Delete the "John" profile?');
    expect(props.onDelete).toHaveBeenCalledWith('p1');
  });

  it('keeps the profile when deletion is cancelled', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(false);
    const props = renderSwitcher();
    fireEvent.click(screen.getByRole('button', { name: 'Delete profile' }));
    expect(props.onDelete).not.toHaveBeenCalled();
  });
});
